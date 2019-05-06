const express = require('express');

// Set Middleware/Router
const router = express.Router();

// Stock Model
const Stock = require('../../models/Stock');

// @route GET api/stocks 
// @desc Get all stocks or a stock by query ?symbol or body
// @access Public
router.get('/', (req, res) => {
    let symbol = req.query.symbol || req.body.symbol;
    if (symbol) {
        Stock
        .findOne({ symbol: symbol }) 
        .then(stock => res.json(stock))
        .catch(err => res.status(404).json({success: false}));
    }
    else {
        Stock
        .find()
        .sort({ date: -1 })
        .then(stocks => res.json(stocks));
    }
});

// @route GET api/stocks/:id 
// @desc Get stock by Id
// @access Public
router.get('/:id', (req, res) => {
    Stock
        .findById(req.params.id)
        .then(stock => res.json(stock));
});

// @route POST api/stocks 
// @desc Add new stock or Buy more
// @access Public
router.post('/', (req, res) => {
    
    var newStock = new Stock({
        symbol: String(req.body.symbol),
        quantity: parseInt(req.body.quantity)
    });
    
    Stock
        .findOne({ symbol: newStock.symbol }) 
        .then(stock => {
            if (stock) {
                newStock.quantity += stock.quantity;
            }
            Stock
                .findOneAndUpdate({ symbol: newStock.symbol }, newStock, { new: true , upsert: true })
                .then(() => {
                    Stock
                        .find()
                        .sort({ date: -1 })
                        .then(stocks => res.json(stocks))
                })
        });  
});

// @route PUT api/stocks/ 
// @desc Sell a stock
// @access Public
router.put('/', (req, res) => {

    var newStock = new Stock({
        symbol: String(req.body.symbol),
        quantity: parseInt(req.body.quantity)
    });
    
    Stock
        .findOne({ symbol: newStock.symbol }) 
        .then(stock => {
            if (stock) {
                if (stock.quantity > newStock.quantity)
                    newStock.quantity = stock.quantity - newStock.quantity;
                else 
                    newStock.quantity = 0;
            }
            Stock
                .findOneAndUpdate({ symbol: newStock.symbol }, newStock, { new: true , upsert: true })
                .then(() => {
                    Stock
                        .find()
                        .sort({ date: -1 })
                        .then(stocks => res.json(stocks))
                })
        });
});

// @route DELETE api/stocks
// @desc Delete a stock by query ?symbol or body
// @access Public
router.delete('/', (req, res) => {
    let symbol = req.query.symbol || req.body.symbol;
    Stock
        .findOne({ symbol: symbol}) 
        .then(stock => stock.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

// @route DELETE api/stocks/:id 
// @desc Delete a stock
// @access Public
router.delete('/:id', (req, res) => {
    Stock
        .findById(req.params.id)
        .then(stock => stock.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
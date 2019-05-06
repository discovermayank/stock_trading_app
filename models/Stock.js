const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StockSchema = new Schema ({
    symbol: { type: String, required: true},
    quantity: {type: Number, default: 0},
    date: {type: Date, default: Date.now}
    }, {_id: false});

module.exports = Stock = mongoose.model('Stock', StockSchema);
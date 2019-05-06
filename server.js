const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const stocks = require('./routes/api/stocks');

const app = express();

// Middleware for body parser
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo DB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Mongo DB successfully connected"))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/stocks', stocks);

// Define Server Port
const port = process.env.PORT || 5000;

// Server static assets in production
if (process.env.NODE_ENV === 'production') {

    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start server to listen
app.listen(port, () => console.log(`Server started on port ${port}`));
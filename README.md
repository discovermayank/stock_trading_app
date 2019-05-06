# Stock Trading App

Well this is my first attempt on MERN, basically REACT and its complimentary frameworks.

This single page app performs following tasks :

1. Searching of Stock current price - by making a GET request to third party alphavantage rest api.

2. Buying of Stocks - POST request to backend server.
    a. Stock will be added if it is new.
    b. In case same stock is bought again, result will be addition in quantity of stocks.

3. Selling of Stocks - PUT request to backend server.
    a. Subtract the requested quantity from stock.
    b. TODO - Delete stock if quantity of stocks become zero.
    c. TODO - Throw error if request is made for quantity more than user have or for stock he doens't own.
    
4. Listing of Stocks (Portfolio) - GET request to backend server.
    a. Show list of all stocks currently being held by user along with their quantites. 

5. Database - All data is maintained in NoSQL MongoDb and queried using mongoose apis.

Tech Stack :

Frontend : React and its complimentary frameworks.
Backend : Node and Express
Other Frameworks : Axios, Lodash, Concurrently and Bootstrap.
Database : MongoDB and Mongoose.

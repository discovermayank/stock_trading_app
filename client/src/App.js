import React, { Component } from 'react'
import AppNavBar from './components/AppNavBar'
import StockPortfolio from './components/StockPortfolio'
import BuySellStock from './components/BuySellStock'
import SearchStock from './components/SearchStock'
import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
export class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
          <SearchStock />
          <BuySellStock />
          <StockPortfolio />
        </Container>
      </div>
      </Provider>
    )
  }
}

export default App


import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getStock } from '../actions/stockActions';
import PropTypes from 'prop-types'
import {
    Container, InputGroup, InputGroupAddon, Button, Input, Label,
    Form, FormGroup, Toast, ToastBody, ToastHeader
} from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import _ from 'lodash';
import uuid from 'uuid';

export class SearchStock extends Component {
  
  state = {
    symbol: '',
    stock: [],
    show: false,
    isLoading: false
  };

  componentDidUpdate() {
    if (!_.isEmpty(this.props.stocks.queriedStock) && this.state.isLoading) {

      var stockInfo = _.flattenDeep(Array.of(this.props.stocks.queriedStock['Stock Quotes'])).map((stock) => [{symbol: stock['1. symbol'], price: stock['2. price'], volume: stock['3. volume'], timestamp: stock['4. timestamp']}]);

      this.setState({
        stock: _.flattenDeep(stockInfo),
        show: true,
        isLoading: false
      });
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name] : [e.target.value]});
  };

  toggle = () => {
    this.setState({
      show: !this.state.show
    });
  }

  onGetQuoteClick = (e) => {
      e.preventDefault();
      this.props.getStock(this.state.symbol);
      this.setState({symbol: '', isLoading : true});
  }

  render() {
    const {
      stock
    } = this.state;

    return (
      <Container>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <Form>
            <FormGroup style={{display: 'flex', flexWrap: 'wrap'}}>
              <Label for="getSymbol">Get Quote</Label>
              <InputGroup>
                <Input
                    type="text"
                    name="symbol"
                    id="getSymbol"
                    placeholder="Symbol"
                    onChange={this.onChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" onClick={this.onGetQuoteClick}>Get Quote</Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <TransitionGroup className="stocks-list">
              {stock.map(({ symbol, price, volume, timestamp }) => (
                <CSSTransition key={uuid()} timeout={500} classNames='fade'>
                  <Toast isOpen={this.state.show} style={{marging: '1rem'}}>
                    <ToastHeader toggle={this.toggle}><strong>{symbol}</strong></ToastHeader>
                    <ToastBody>
                      <p>Price : {price}</p>
                      <p>Volume : {volume}</p>
                      <p>Timestamp : {timestamp}</p>
                    </ToastBody>
                  </Toast>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </Form>
        </div>
      </Container>
    );
  }
}

SearchStock.propTypes = {
  getStock: PropTypes.func.isRequired,
  stocks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    stocks: state.stocks
  }
}

export default connect(mapStateToProps, {getStock})(SearchStock);

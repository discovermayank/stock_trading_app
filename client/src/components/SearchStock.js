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

    metaDataTag: 'Meta Data',
    timeSeriesTag: 'Time Series (Daily)',
    symbolTag: '2. Symbol',
    lastRefreshedTag: '3. Last Refreshed',
    highTag: '2. high',
    lowTag: '3. low',
    closeTag: '4. close'
  };

  componentWillReceiveProps() {

    console.log(this.props.stocks.queriedStock);
    if (! _.isEmpty(this.props.stocks.queriedStock)) {
      this.setState({
        stock: [{
          symbol: _.get(this.props.stocks.queriedStock, [this.state.metaDataTag, this.state.symbolTag]),
          lastRefreshed: _.get(this.props.stocks.queriedStock, [this.state.timeSeriesTag, this.state.lastRefreshedTag]),
          high: _.get(this.props.stocks.queriedStock, [this.state.timeSeriesTag, this.state.lastRefreshed, this.state.highTag]),
          low: _.get(this.props.stocks.queriedStock, [this.state.timeSeriesTag, this.state.lastRefreshed, this.state.lowTag]),
          price: _.get(this.props.stocks.queriedStock, [this.state.timeSeriesTag, this.state.lastRefreshed, this.state.closeTag])
        }],
        show: true
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
      this.setState({symbol: ''});
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
                <TransitionGroup className="stocks-list">
                  {stock.map(({ symbol, price, high, low }) => (
                    <CSSTransition key={uuid()} timeout={500} classNames='fade'>
                      <Toast isOpen={this.state.show}>
                        <ToastHeader toggle={this.toggle}>{symbol}</ToastHeader>
                        <ToastBody>
                          <p>Price : {price}</p>
                          <p>High : {high}</p>
                          <p>Low : {low}</p>
                        </ToastBody>
                      </Toast>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </FormGroup>              
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

import React, { Component } from 'react';
import { Container, CardDeck, Card, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { listStocks } from '../actions/stockActions';
import PropTypes from 'prop-types';

export class StockPortflio extends Component {

  componentDidMount() {
      this.props.listStocks();
  }

  render() {
    const {
      holdingStocks
    } = this.props.stocks;

    return (
      <Container style={{marginTop: '2rem'}}>
        <h2>Portforlio</h2>
        <CardDeck>
          <TransitionGroup className="stocks-list" style={{display: 'flex', flexWrap: 'wrap'}}>
            {holdingStocks.map(({_id, symbol, quantity}) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <Card>
                    <CardHeader>{symbol}</CardHeader>
                    <CardBody>
                    <CardTitle>Price : TBC</CardTitle>
                    </CardBody>
                    <CardFooter>Quantity : {quantity}</CardFooter>
                </Card>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </CardDeck>
      </Container>
    )
  }
}

StockPortflio.propTypes = {
    listStocks : PropTypes.func.isRequired,
    stocks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    stocks: state.stocks
  }
}

export default connect(mapStateToProps, {listStocks})(StockPortflio);

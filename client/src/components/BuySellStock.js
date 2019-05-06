import React, { Component } from 'react'
import {
    Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import { buyStock, sellStock } from '../actions/stockActions'
import PropTypes from 'prop-types';

export class BuySellStock extends Component {
  
    state = {
        modal: false,
        symbol: '',
        quantity: 0,
        action: ''
    };

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    };

    onBuyClick = () => {
        this.setState({
            modal: !this.state.modal,
            action: 'Buy'
        });
    }

    onSellClick = () => {
        this.setState({
            modal: !this.state.modal,
            action: 'Sell'
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name] : [e.target.value]});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newStock = {
            symbol: this.state.symbol,
            quantity: this.state.quantity
        }

        if (this.state.action === 'Buy')
            this.props.buyStock(newStock);
        else
            this.props.sellStock(newStock);
        
        this.toggle();
        this.setState({
            action: ''
        });
    };

    render() {
    return (
      <Container style={{marginTop: '2rem'}}>
        <div>
            <Button 
                color="primary"
                onClick={this.onBuyClick}
            >Buy Stock</Button>
            {'  '}
            <Button 
                color="warning"
                onClick={this.onSellClick}
            >Sell Stock</Button>
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                action={this.state.action}
            >
            <ModalHeader toggle={this.toggle}>{this.state.action} Stock </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="inputSymbol">Symbol</Label>
                        <Input
                            type="text"
                            name="symbol"
                            id="inputSymbol"
                            placeholder="Symbol"
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputQuantity">Quantity</Label>
                        <Input
                            type="number"
                            name="quantity"
                            id="inputQuantity"
                            placeholder="Quantity"
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={this.onSubmit}>{this.state.action}</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>    
        </div>    
      </Container>
    );
  }
}

BuySellStock.propTypes = {
    buyStock : PropTypes.func.isRequired,
    sellStock : PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
      stocks: state.stocks
    }
}

export default connect(mapStateToProps, {buyStock, sellStock})(BuySellStock);

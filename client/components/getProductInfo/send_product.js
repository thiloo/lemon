import React, { Component } from 'react';

class SendProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sendTo: '',
            quantity: ''
        };
    }

    onAddressChange(event) {
        this.setState({ sendTo: event.target.value });
    }

    onQuantityChange(event) {
        this.setState({ quantity: event.target.value });
    }

    inputValueOnChange() {
        if(this.props.product.transaction) {
            return this.props.product.transaction.toAddress;
        } else {
            return '';
        }
    }

    transferOwnership() {
        const abi = this.props.product.abi;
        const address= this.props.product.address;
        const contract = web3.eth.contract(abi);
        const instance = contract.at(address);
        console.log(instance);
        web3.eth.getAccounts((error, accounts) => {
            instance.sendCoin(this.state.sendTo, this.state.quantity, {from: accounts[0], gas: 4000000}, (err, transfer) => console.log(err, transfer));
        });

    }

    render() {
        if(this.props.product) {
            return (
                <div className="col-md-5 sendWrapper">
                    <h3><small>Transfer {this.props.product.template.units} to somebody else.</small></h3>
                    <div className="form-horizontal">
                        <div className="form-group">
                            <div className="col-md-8">
                                <input
                                    onChange={this.onAddressChange.bind(this)}
                                    value={this.state.sendTo}
                                    className="form-control"
                                    placeholder="send to address" />

                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-5">
                                <input
                                    onChange={this.onQuantityChange.bind(this)}
                                    value={this.state.quantity}
                                    className="form-control"
                                    placeholder="quantity" />
                            </div>
                            <div className="col-md-4">
                                <button
                                    onClick={this.transferOwnership.bind(this)}
                                    className="btn btn-default">Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default SendProduct;

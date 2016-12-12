import React, { Component } from 'react';
import { Link } from 'react-router';

class SendProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sendTo: ''
        };
    }

    onAddressChange(event) {
        this.setState({ sendTo: event.target.value });
    }

    // onQuantityChange(event) {
    //
    // }

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
        web3.eth.getAccounts((error, accounts) => {
            console.log(error, accounts, this.state.sendTo);
            instance.changeOwner.sendTransaction(this.state.sendTo, {from: accounts[0], gas: 4000000}, (err, transfer) => console.log(err, transfer));
        });

    }

    render() {
        const url = '/';
        return (
            <div>
                <div>
                    <input
                        onChange={this.onAddressChange.bind(this)}
                        value={this.state.sendTo}
                        className="form-control"
                        placeholder="send to address" />
                    {/* <input
                        onChange={this.onQuantityChange.bind(this)}
                        value={this.props.product.transaction.quantity}
                        className="form-control"
                        placeholder="quantity" /> */}

                </div>
                <div>
                    {/* <Link to={url}> */}
                        <button
                            onClick={this.transferOwnership.bind(this)}
                            className="btn btn-primary">Transfer Ownership
                        </button>
                    {/* </Link> */}
                </div>
            </div>
        );
    }
}

export default SendProduct;

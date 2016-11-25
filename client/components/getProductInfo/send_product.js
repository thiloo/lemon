import React, { Component } from 'react';
import { Link } from 'react-router';

class SendProduct extends Component {
    onAddressChange(event) {
        Meteor.call('products.update.transaction.toAddress', this.props.product, event.target.value);
    }

    onQuantityChange(event) {
        Meteor.call('products.update.transaction.quantity', this.props.product, event.target.value);
    }

    inputValueOnChange() {
        if(this.props.product.transaction) {
            return this.props.product.transaction.toAddress;
        } else {
            return '';
        }
    }

    onClickSend() {
        Meteor.call('products.update.ownerId', this.props.product);
    }

    transferOwnership() {

        Meteor.call('products.update.ownerId', this.props.product);
    }

    render() {
        const url = '/';
        return (
            <div>
                <div>
                    <input
                        onChange={this.onAddressChange.bind(this)}
                        value={this.props.product.transaction.toAddress}
                        className="form-control"
                        placeholder="send to address" />
                    <input
                        onChange={this.onQuantityChange.bind(this)}
                        value={this.props.product.transaction.quantity}
                        className="form-control"
                        placeholder="quantity" />

                </div>
                <div>
                    <Link to={url}>
                        <button
                            onClick={this.transferOwnership.bind(this)}
                            className="btn btn-primary">Transfer Ownership
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SendProduct;

import React, { Component } from 'react';

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
        return (
            <div>
                <div>
                    <input
                        onChange={this.onAddressChange.bind(this)}
                        value={this.inputValueOnChange()}
                        className="form-control"
                        placeholder="send to address" />
                    <input
                        onChange={this.onQuantityChange.bind(this)}
                        value={this.props.product.transaction.quantity}
                        className="form-control"
                        placeholder="quantity" />

                </div>
                <div>
                    <button
                        onClick={this.transferOwnership.bind(this)}
                        className="btn btn-primary">Transfer Ownership</button>
                </div>
            </div>
        );
    }
}

export default SendProduct;

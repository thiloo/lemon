import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import ProductInfo from  '../getProductInfo/product_main_info';

class ChainDetails extends Component {
    render() {
        if(!web3.currentProvider) {
            web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
        }

        if(this.props.product) {
            return (
                <div className="container">
                    <ProductInfo product={this.props.product} />
                </div>
            );
        } else {
            return (
                <div className="container">
                    Sorry the product you are looking for doesn't exist.
                </div>
            );
        }

    }
}

export default createContainer((props) => {
    Meteor.subscribe('products');
    return({ product: Products.findOne({ address: props.params.address })});
}, ChainDetails);

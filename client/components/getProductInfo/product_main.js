import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import ProductInfo from  './product_main_info';

class ProductsMain extends Component {
    render() {
        return (
            <div className="container">
                <ProductInfo product={this.props.product} />
            </div>
        );
    }
}

export default createContainer((props) => {
    const { productId } = props.params;
    Meteor.subscribe('products');
    return { product: Products.findOne(productId) };
}, ProductsMain);

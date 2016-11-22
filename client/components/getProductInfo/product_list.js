import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import ProductDetail from './product_detail_list_item';

const PER_PAGE = 20;

class ProductList extends Component {
    render() {
        return (
            <div>
                <div className="product-list">
                    {this.props.products.map(product =>
                        <ProductDetail
                            key={product._id}
                            product={product}
                        />)}
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    // set up subscription
    Meteor.subscribe('products', PER_PAGE);

    //return as an object sent to ProductList as props
    return { products: Products.find({}).fetch() };

}, ProductList);

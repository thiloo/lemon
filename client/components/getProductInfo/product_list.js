import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import { Templates } from '../../../imports/collections/templates';
import SearchBox from '../chainStuff/search_box';
import ProductDetail from './product_detail_list_item';

const PER_PAGE = 20;

class ProductList extends Component {
    getProductsFromBlockchain() {

    }

    render() {
        this.getProductsFromBlockchain();
        return (
            <div className="container">
                <div className="col-sm-10">
                    <SearchBox />
                </div>
                <div className="product-list col-sm-10">
                    {this.props.products.map(product => {
                        if(product.active) {
                            return (
                                <ProductDetail
                                    key={product._id}
                                    product={product} />
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    // set up subscription
    Meteor.subscribe('products', PER_PAGE);
    Meteor.subscribe('templates');
    //return as an object sent to ProductList as props
    return { products: Products.find({ ownerId: Meteor.userId() }).fetch() };
    // return { templates: Templates.find({}).fetch() }

}, ProductList);

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';


class SendProduct extends Component {
    render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}

export default createContainer((props) => {
    const { productId } = props.params;
    Meteor.subscribe('products');
    return { product: Products.findOne(productId)};
}, SendProduct);

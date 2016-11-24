import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import ProductInfo from  './product_main_info';
import SendProduct from './send_product';

class ProductsMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clickedSendProduct: false
        };
    }

    renderSendProduct(event) {
        if(this.state.clickedSendProduct == false) {
            this.setState({ clickedSendProduct: true });
        } else {
            this.setState({ clickedSendProduct: false });
        }
    }

    render() {
        return (
            <div className="container">
                <ProductInfo product={this.props.product} />
                <div className="col-md-10">
                    <button
                        onClick={this.renderSendProduct.bind(this)}
                        className="btn btn-primary">Send Product</button>
                </div>
                <div>
                    { this.state.clickedSendProduct ? <SendProduct product={this.props.product} /> : null }
                </div>
            </div>
        );
    }
}

export default createContainer((props) => {
    const { productId } = props.params;
    Meteor.subscribe('products');
    return { product: Products.findOne(productId) };
}, ProductsMain);

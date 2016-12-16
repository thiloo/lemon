import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import ProductInfo from  './product_main_info';
import SendProduct from './send_product';
import CoinMain from './coin_main';

class ProductsMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clickedSendProduct: false,
            fields: '',
            producer: '',
            instance: ''
        };
    }

    renderSendProduct() {
        if(this.state.clickedSendProduct == false) {
            this.setState({ clickedSendProduct: true });
        } else {
            this.setState({ clickedSendProduct: false });
        }
    }

    blockchainInteraction() {
        if(this.props.product != undefined && this.state.instance == '') {
            const abi = this.props.product.abi;
            const address= this.props.product.address;
            const contract = web3.eth.contract(abi);
            const instance = contract.at(address);

            // retrieve the ipfs hash
            const ipfsHash = instance.get();
            const producer = instance.getProducer();
            console.log(ipfsHash);
            Meteor.call('ipfs.getJson', ipfsHash, (err, fields) => {
                return this.setState({ fields, producer, instance });
            });
        }

    }

    render() {
        this.blockchainInteraction();
        return (
            <div className="container">
                <div className="row">
                    <ProductInfo
                        fields={this.state.fields}
                        producer={this.state.producer}
                        instance={this.state.instance}
                        product={this.props.product} />

                    <SendProduct product={this.props.product} owner={this.state.owner} />
                    <CoinMain instance={this.state.instance} product={this.props.product}/>
                </div>
            </div>
        );
    }
}

export default createContainer((props) => {
    const { address } = props.params;
    Meteor.subscribe('products');
    return { product: Products.findOne({address: address}) };
}, ProductsMain);

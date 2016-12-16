import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import ProductInfo from  '../getProductInfo/product_main_info';

class ChainDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clickedSendProduct: false,
            fields: '',
            producer: '',
            instance: ''
        };
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
            
            Meteor.call('ipfs.getJson', ipfsHash, (err, fields) => {
                return this.setState({ fields, producer, instance });
            });
        }

    }


    render() {
        if(!web3.currentProvider) {
            web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
        }

        if(this.props.product) {
            this.blockchainInteraction();

            return (
                <div className="container">
                    <ProductInfo
                        fields={this.state.fields}
                        producer={this.state.producer}
                        instance={this.state.instance}
                        product={this.props.product} />
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

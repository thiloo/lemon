import React, { Component } from 'react';
import ProductTemplateField from './product_template_field';
import { Link, browserHistory } from 'react-router';

class ProductTemplate extends Component {
    renderFields() {
        const fields = this.props.product.template.additionalFields.filter(field => field != null);
        return fields.map((field) => {
            return (
                <ProductTemplateField
                product={this.props.product}
                field={field}
                key={field._id} />
            );
        });
    }

    saveToBlockchain(e) {
        e.preventDefault();

        const compiled = this.props.product.template.compiled;
        const abi = compiled.info.abiDefinition;
        const contract = web3.eth.contract(abi);

        Meteor.call('ipfs.saveJson', this.props.product._id, this.props.product.template, (error, ipfsValue) => {
            // get pararameters from input fields
            web3.eth.getAccounts((error, accounts) => {
                if(error) throw error;
                // publish contract and then store information in about published contract in db
                contract.new(ipfsValue.hash, this.props.product.template.quantity, {from: accounts[0], data: compiled.code, gas: 4000000}, (error, value) => {
                    if(!error && value.address) {
                        Meteor.call('products.update.blockchainDetails', this.props.product, value.abi, value.address, this.props.keyStore._id);
                        Meteor.call('products.update.active', this.props.product);

                        browserHistory.push(`/products/${value.address}`);
                    }
                });
            });
        });


    }

    deleteProduct() {
        Meteor.call('products.delete.product', this.props.product);
    }

    render() {
        if(this.props.product && this.props.product.template) {
            return (
                <div className="">
                    <div className="col-sm-4 col-sm-offset-4 text-center">
                        <h3>{this.props.product.template.title}</h3>
                    </div>
                    {this.renderFields()}
                    <div className="col-sm-offset-2 col-sm-6">
                        <button
                            onClick={this.saveToBlockchain.bind(this)}
                            className="btn btn-success col-sm-3">Save to Blockchain</button>
                        <Link to={'/'}><button
                            onClick={this.deleteProduct.bind(this)}
                            className="btn btn-danger col-sm-3">Delete</button></Link>
                    </div>
                </div>
            );
        } else {
            return <div>Please select a template</div>;
        }
    }
}

export default ProductTemplate;

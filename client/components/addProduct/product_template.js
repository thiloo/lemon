import React, { Component } from 'react';
import ProductTemplateField from './product_template_field';
import { Link } from 'react-router';


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

    saveToBlockchain() {
        const fields = this.props.product.template.additionalFields.filter(field => field != null);
        const compiled = this.props.product.template.compiled.info;
        const abi = compiled.abiDefinition;
        const contract = web3.eth.contract(abi);
        // get pararameters from input fields
        const parameters = fields.map(field => field.content);
        const contractInstance = contract.new(... parameters, {from: '0x96f909f35f91e3cdca071c7c0b4ba79ab22150a0', data: compiled.code, gas: 4000000}, (error, value) => console.log(error, value));
        console.log();
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
                        {/* <Link to={`/products/${this.props.product._id}`}> */}
                        <button
                            onClick={this.saveToBlockchain.bind(this)}
                            className="btn btn-success col-sm-3">Save to Blockchain</button>
                        {/* </Link> */}
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

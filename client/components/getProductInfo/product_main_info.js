import React, { Component } from 'react';

class ProductInfo extends Component {
    renderAdditionalFields(fields) {
        return fields.map((field) => {
            return (
                <div key={field.title}>
                    {field.title}, and the content: {field.value}
                </div>
            );
        });
    }

    blockchainInteraction() {
        if(this.props.product) {
            const abi = this.props.product.abi;
            const address= this.props.product.address;
            const contract = web3.eth.contract(abi);

            const instance = contract.at(address);
            const constants = instance.abi.map(constant => {
                if (constant.constant) {
                    return constant.name;
                } else {
                    return null;
                }
            });

            const fields = constants.filter(constant => constant != null);
            const values = fields.map(field => {
                return {
                    title: field,
                    value: instance[field].call()
                };
            });
            console.log(values);

            return this.renderAdditionalFields(values);
        }

    }

    render() {
        if(this.props.product) {
            console.log(this.props.product);
            const { title, description } = this.props.product.template;
            return (
                <div className="row col-md-offest-1 col-md-10 productInfoWrapper">
                    <div className="">
                        <h1>{title}</h1>
                        <p>{description}</p>
                        {this.blockchainInteraction()}
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}

export default ProductInfo;

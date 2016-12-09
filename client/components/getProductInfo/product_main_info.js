import React, { Component } from 'react';

class ProductInfo extends Component {
    renderFields(fields) {
        let reqInfo = {};
        // get the main info like title to render it
        fields.forEach(field => {
            if (typeof field.value == 'object') {
                reqInfo[field.title] = field.value.c[0];
            } else {
                reqInfo[field.title]= field.value;
            }
        });

        // additional Infofields

        const additionalFields = fields.map(field => {
            if(field.title != "title" && field.title != "quantity" && field.title != "description" && field.title != "units") {
                return field;
            } else {
                return null;
            }
        });

        return (
            <div>
                <div>
                    <h1>{reqInfo.title}</h1>
                    <p>{reqInfo.description}</p>
                    <p>{reqInfo.quantity} {reqInfo.units}</p>
                    <p>{this.props.product.address}</p>
                </div>
                <div>
                    Additional Information:
                    {this.renderAdditionalFields(additionalFields)}
                </div>
            </div>
        );
    }

    renderAdditionalFields(fields) {
        const cleaned = fields.filter(field => field != null);
        return cleaned.map(field => {
            return (
                <div key={field.title}>
                    {field.value}
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

            return this.renderFields(values);
        }

    }

    render() {

        if(this.props.product) {
            return (
                <div className="row col-md-offest-1 col-md-10 productInfoWrapper">
                    <div className="">
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

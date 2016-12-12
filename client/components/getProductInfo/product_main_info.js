import React, { Component } from 'react';

class ProductInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: ''
        };
    }
    
    renderAdditionalFields() {
        if(this.state.fields != '') {
            const fields = this.state.fields;
            const fieldsArray = Object.entries(fields);
            const allFields = fieldsArray.map(field => {
                if(field[0] != "title" && field[0]!= "quantity" && field[0] != "description" && field[0] != "units") {
                    return field;
                } else {
                    return null;
                }
            });
            const cleaned = allFields.filter(field => field != null);
            return cleaned.map(field => {
                return (
                    <div key={field[0]}>
                        {field[0]} : {field[1]}
                    </div>
                );
            });
        }
    }

    blockchainInteraction() {
        const abi = this.props.product.abi;
        const address= this.props.product.address;
        const contract = web3.eth.contract(abi);
        const instance = contract.at(address);
        // retrieve the ipfs hash
        const ipfsHash = instance.get();

        Meteor.call('ipfs.getJson', ipfsHash, (err, fields) => {
            return this.setState({fields: fields});
        });
    }

    render() {
        const { title, description, quantity, units } = this.state.fields;
        if(this.props.product) {
            return (
                <div className="row col-md-offest-1 col-md-10 productInfoWrapper">
                    <div className="">
                        {this.blockchainInteraction()}
                        <div>
                            <div>
                                <h1>{title}</h1>
                                <p>{description}</p>
                                <p>{quantity} {units}</p>
                                <p>{this.props.product.address}</p>
                            </div>
                            <div>
                                Additional Information:
                                {this.renderAdditionalFields()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}

export default ProductInfo;

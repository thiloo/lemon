import React, { Component } from 'react';
import CoinBalance from './coin_balance';

class ProductInfo extends Component {
    renderAdditionalFields() {
        if(this.props.fields != '') {
            const fields = this.props.fields;
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
                    <dl key={field[0]}>
                        {field[0]} : {field[1]}
                    </dl>
                );
            });
        }
    }

    render() {
        const { title, description, quantity, units } = this.props.fields;
        if(this.props.product) {
            return (
                <div className="row col-md-offest-2 col-md-5">
                    <div className="">
                        <div>
                            <div>
                                <h1 className="">{title}</h1>
                                <h3 className=""><small>{description}</small></h3>
                                <div>
                                    <dl>
                                        <dt>Amount</dt>
                                        <dl>{quantity} {units}</dl>
                                        <dt>Contract Address</dt>
                                        <dl>{this.props.product.address}</dl>
                                        <dt>Producer Address</dt>
                                        <dl>{this.props.producer}</dl>
                                        <dt>Additional Information</dt>
                                        {this.renderAdditionalFields()}
                                    </dl>
                                </div>
                            <div>
                            </div>
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

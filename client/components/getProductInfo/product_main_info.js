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
                    <div key={field[0]}>
                        {field[0]} : {field[1]}
                    </div>
                );
            });
        }
    }

    render() {
        const { title, description, quantity, units } = this.props.fields;
        if(this.props.product) {
            return (
                <div className="row col-md-offest-1 col-md-10 productInfoWrapper">
                    <div className="">
                        <div>
                            <div>
                                <h1>{title}</h1>
                                <p>{description}</p>
                                <p>{quantity} {units}</p>
                                <p>Address: {this.props.product.address}</p>
                                <p>Producer: {this.props.producer}</p>
                            </div>
                            <div>
                                Additional Information:
                                {this.renderAdditionalFields()}
                            </div>
                            <div>
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

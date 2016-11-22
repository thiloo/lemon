import React, { Component } from 'react';

class ProductInfo extends Component {
    render() {
        return (
            <div className="row col-md-offest-1 col-md-10 productInfoWrapper">
                <div className="jumbotron">
                    <h1>{this.title}</h1>
                    <p>{this.description}</p>
                </div>
            </div>
        );
    }
}

export default ProductInfo;

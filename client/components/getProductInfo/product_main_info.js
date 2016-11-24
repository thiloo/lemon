import React, { Component } from 'react';

class ProductInfo extends Component {
    renderAdditionalFields() {
        return this.props.product.template.additionalFields.map((field) => {
            return (
                <div key={field._id}>
                    {field.title}, and the content: {field.content}
                </div>
            );
        });
    }

    render() {
        if(this.props.product) {
            const { title, description } = this.props.product.template;
            return (
                <div className="row col-md-offest-1 col-md-10 productInfoWrapper">
                    <div className="">
                        <h1>{title}</h1>
                        <p>{description}</p>
                        {this.renderAdditionalFields()}
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}

export default ProductInfo;

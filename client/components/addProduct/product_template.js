import React, { Component } from 'react';
import ProductTemplateField from './product_template_field';
import { Fields } from '../../../imports/collections/fields';

class ProductTemplate extends Component {
    renderFields() {
        return this.props.product.template.additionalFields.map((field) => {
            return (
                <ProductTemplateField
                product={this.props.product}
                field={field}
                key={field._id} />
            );
        });
    }

    render() {
        if(this.props.product && this.props.product.template) {
            return (
                <div className="">
                    <div className="col-sm-4 col-sm-offset-4 text-center">
                        <h3>{this.props.product.template.title}</h3>
                    </div>
                    {this.renderFields()}
                </div>
            );
        } else {
            return <div>Please select a template</div>;
        }
    }
}

export default ProductTemplate;

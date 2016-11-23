import React, { Component } from 'react';

class ProductTemplateField extends Component {
    onInputChange(event) {
        const { product, field } = this.props;
        Meteor.call('products.update.field.content', product, field, event.target.value);
    }

    render() {
        return (
            <div>
                <div className="form-group col-md-6">
                    <span className="input-group-addon">{this.props.field.title}</span>
                    <input
                        value={this.props.field.content}
                        onChange={this.onInputChange.bind(this)}
                        className="form-control"
                        type="text" placeholder="{}" />
                </div>
            </div>
        );
    }
}

export default ProductTemplateField;

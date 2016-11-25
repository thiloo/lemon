import React, { Component } from 'react';

class ProductTemplateField extends Component {
    onInputChange(event) {
        const { product, field } = this.props;
        Meteor.call('products.update.field.content', product, field, event.target.value);
    }

    render() {
        return (
            <div className="row">
                <div className="form-group col-md-8 col-sm-offset-2">
                    <label className="form-group-addon">{this.props.field.title}</label>
                    <input
                        value={this.props.field.content}
                        onChange={this.onInputChange.bind(this)}
                        className="form-control"
                        type="text" placeholder={`Please add ${this.props.field.title}`} />
                </div>
            </div>
        );
    }
}

export default ProductTemplateField;

import React, { Component } from 'react';

class ProductTemplateField extends Component {
    render() {
        return (
            <div>
                <div className="form-group col-md-6">
                    <span className="input-group-addon">{this.props.field.title}</span>
                    <input

                        className="form-control"
                        type="text" placeholder="{}" />
                </div>
            </div>
        );
    }
}

export default ProductTemplateField;

import React, { Component } from 'react';
import ProductTemplateField from './product_template_field';
import { createContainer } from 'meteor/react-meteor-data';
import { Fields } from '../../../imports/collections/fields';

class ProductTemplate extends Component {
    renderFields() {
        console.log('working');
        return this.props.fields.map((field) => {
            return <ProductTemplateField field={field} key={field._id} />;
        });
    }

    render() {
        if(this.props.template) {
            return (
                <div>
                    <h3>{this.props.template.title}</h3>
                    {this.renderFields()}
                </div>
            );
        } else {
            return <div>Please select a template</div>;
        }
    }
}

export default createContainer((props) => {
    if(props.template) {
        Meteor.subscribe('fields');
        let templateId = props.template._id;
        return { fields: Fields.find({ templateId }).fetch()};
    } else {
        return { fields: [] };
    }
}, ProductTemplate);

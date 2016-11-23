import React, { Component } from 'react';
import TemplateDropdown from './template_dropdown';
import ProductTemplate from './product_template';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import { Templates } from '../../../imports/collections/templates';
import { Fields } from '../../../imports/collections/fields';



class NewProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTemplateId: null,
            selectedTemplate: null
        };
    }

    renderSelectedTemplate() {
        if(this.state.selectedTemplateId) {
            return this.props.templates.find((template) => {
                return template._id == this.state.selectedTemplateId; });
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <TemplateDropdown
                    onTemplateSelect={selectedTemplateId => {
                        this.setState({
                            selectedTemplateId
                        }, () => {
                            let selectedTemplate = this.renderSelectedTemplate();
                            this.setState({
                                selectedTemplate
                            });
                        });
                    }}
                    templates={this.props.templates} />
                <ProductTemplate
                    template={this.state.selectedTemplate}
                    fields={this.props.fields} />
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('templates');
    Meteor.subscribe('fields');
    return {
        templates: Templates.find({}).fetch(),
        fields: Fields.find({}).fetch()
    };
}, NewProduct);

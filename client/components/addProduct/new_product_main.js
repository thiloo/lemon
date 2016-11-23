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

    setProductTemplate() {
        if(this.state.selectedTemplate) {
            Meteor.call('products.update.template', this.props.params.productId, this.state.selectedTemplate);
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
                    onClick={this.setProductTemplate()}
                    templates={this.props.templates} />

                <ProductTemplate
                    template={this.state.selectedTemplate} />
            </div>
        );
    }
}

export default createContainer((props) => {
    Meteor.subscribe('templates');
    Meteor.subscribe('products');
    return {
        templates: Templates.find({}).fetch(),
        product: Products.find({ _id: props.params.productId }).fetch()
    };
}, NewProduct);

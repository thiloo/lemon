import React, { Component } from 'react';
import TemplateDropdown from './template_dropdown';
import ProductTemplate from './product_template';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../../../imports/collections/products';
import { Templates } from '../../../imports/collections/templates';
import { Fields } from '../../../imports/collections/fields';

let previousSelected = '';

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
        const { selectedTemplate } = this.state;
        if(selectedTemplate && selectedTemplate != previousSelected) {
            previousSelected = selectedTemplate;
            Meteor.call('products.update.template', this.props.params.productId, selectedTemplate);
        }
    }

    setTemplate() {
        if(this.props.product && this.props.product.template && !this.state.selectedTemplate) {
            return this.props.product.template;
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
                    product = {this.props.product}
                    onClick={this.setProductTemplate()}
                    templates={this.props.templates} />

                <ProductTemplate
                    product={this.props.product}
                 />
            </div>
        );
    }
}

export default createContainer((props) => {
    Meteor.subscribe('templates');
    Meteor.subscribe('products');
    return {
        templates: Templates.find({}).fetch(),
        product: Products.findOne({ _id: props.params.productId })
    };
}, NewProduct);

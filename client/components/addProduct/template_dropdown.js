import React, { Component } from 'react';
import TemplateDropdownItem from './template_dropdown_item';

class TemplateDropdown extends Component {
    renderTemplateFields() {
        const templates = this.props.templates.filter(template => template.additionalFields != null);
        return templates.map((template) => {
            return (
                <TemplateDropdownItem
                product={this.props.product}
                onTemplateSelect={this.props.onTemplateSelect}
                template={template}
                key={template._id} />
            );
        });
    }

    render() {
        return (
            <div className="dropdown-container template-dropdown col-sm-8 col-sm-offset-2">
                <div className="dropdown-display">
                    <h4 className="text-center"> Please choose your template </h4>
                </div>
                <div className="dropdown-list">
                    <ul className="list-group">
                        {this.renderTemplateFields()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default TemplateDropdown;

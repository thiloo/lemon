import React, { Component } from 'react';
import TemplateDropdownItem from './template_dropdown_item';

class TemplateDropdown extends Component {
    render() {
        return (
            <div className="dropdown-container template-dropdown">
                <div className="dropdown-display">
                    <span> hello </span>
                </div>
                <div className="dropdown-list">
                    <ul className="list-group">
                        {this.props.templates.map((template) => {
                            return (
                                <TemplateDropdownItem
                                onTemplateSelect={this.props.onTemplateSelect}
                                template={template}
                                key={template._id} />
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default TemplateDropdown;

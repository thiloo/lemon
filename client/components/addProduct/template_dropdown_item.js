import React, { Component } from 'react';

class TemplateDropdownItem extends Component {
    render() {
        return (
            <div>
                <li className='list-group-item'
                    onClick={() => this.props.onTemplateSelect(this.props.template._id)}>

                    <div className="bring-one-line">{this.props.template.title}</div>
                    <div className="bring-one-line">{this.props.template.description}</div>
                </li>
            </div>
        );
    }
}

export default TemplateDropdownItem;

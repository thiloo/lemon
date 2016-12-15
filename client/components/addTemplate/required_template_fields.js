import React, { Component } from 'react';

class RequiredTemplateFields extends Component {
    onTitleChange(event) {
        Meteor.call('templates.update.title', this.props.template, event.target.value);
    }

    onDescriptionChange(event) {
        Meteor.call('templates.update.description', this.props.template, event.target.value);
    }

    onQuantityChange(event) {
        Meteor.call('templates.update.quantity', this.props.template, event.target.value);
    }

    onUnitChange(event) {
        Meteor.call('templates.update.units', this.props.template, event.target.value);
    }

    render() {
        if (!this.props.template) {return <div>Loading...</div>;}

        return (
            <div className="col-sm-8 col-sm-offset-2">
                <div className="row input-group input-spacing-y">
                    <span className="input-group-addon">Template Title</span>
                    <input
                        onChange={this.onTitleChange.bind(this)}
                        value={this.props.template.title}
                        className="form-control" type="text" placeholder="A title describing the product later tracked e.g. bike" />
                </div>
                <div className="row input-group input-spacing-y">
                    <span className="input-group-addon">Description</span>
                    <input
                        onChange={this.onDescriptionChange.bind(this)}
                        value={this.props.template.description}
                        className="form-control" type="text" placeholder="Description a description of the product e.g. Green bike produced by Bike Factory" />
                </div>
                <div className="row input-group input-spacing-y">
                    <span className="input-group-addon">Quantity</span>
                    <input
                        onChange={this.onQuantityChange.bind(this)}
                        value={this.props.template.quantity}
                        className="form-control" type="number" placeholder="Quantity, 1 or many products" />
                    <span className="input-group-addon">Units</span>
                    <input
                        onChange={this.onUnitChange.bind(this)}
                        value={this.props.template.units}
                        className="form-control" type="text" placeholder="Units of measurement e.g. bottle" />
                </div>
            </div>
        );
    }
}

export default RequiredTemplateFields;

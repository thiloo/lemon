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
            <div>
                <div className="form-group col-md-6">
                    <span className="input-group-addon">Title</span>
                    <input
                        onChange={this.onTitleChange.bind(this)}
                        value={this.props.template.title}
                        className="form-control" type="text" placeholder="Title" />
                </div>
                <div className="form-group col-md-6">
                    <span className="input-group-addon">Description</span>
                    <input
                        onChange={this.onDescriptionChange.bind(this)}
                        value={this.props.template.description}
                        className="form-control" type="text" placeholder="Description" />
                </div>
                <div className="form-group col-md-6">
                    <span className="input-group-addon">Quantity</span>
                    <input
                        onChange={this.onQuantityChange.bind(this)}
                        value={this.props.template.quantity}
                        className="form-control" type="text" placeholder="Quantity" />
                    <span className="input-group-addon">Units</span>
                    <input
                        onChange={this.onUnitChange.bind(this)}
                        value={this.props.template.units}
                        className="form-control" type="text" placeholder="Units" />
                </div>
            </div>
        );
    }
}

export default RequiredTemplateFields;

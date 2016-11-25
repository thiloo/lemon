import React, { Component } from 'react';

class NewField extends Component {
    onTitleChange(event) {
        const { template, field } = this.props;
        Meteor.call('templates.update.field.title', template, field, event.target.value);
    }

    onTypeChange(event) {
        const { template, field } = this.props;
        Meteor.call('templates.update.field.type', template, field, event.target.value);
    }

    onMandatoryChange(event) {
        const { template, field } = this.props;
        Meteor.call('templates.update.field.mandatory', template, field, event.target.checked);
    }

    render() {
        return (
            <div className="row">
                <div className="form-group col-sm-5">
                    <input
                        onChange={this.onTitleChange.bind(this)}
                        value={this.props.field.title}
                        className="form-control" placeholder="Field Title" />
                </div>
                <div className="form-group col-sm-5">
                    <input
                        onChange={this.onTypeChange.bind(this)}
                        value={this.props.field.type}
                        className="form-control" placeholder="Field Type (Dropdown later)" />
                </div>
                <div className="form-group col-sm-2">
                    <label><input
                        onChange={this.onMandatoryChange.bind(this)}
                        type="checkbox" /> Mandatory</label>
                </div>
            </div>
        );
    }
}

export default NewField;

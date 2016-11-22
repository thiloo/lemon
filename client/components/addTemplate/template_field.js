import React, { Component } from 'react';

class NewField extends Component {
    onTitleChange(event) {
        Meteor.call('fields.update.title', this.props.field, event.target.value);
    }

    onTypeChange(event) {
        Meteor.call('fields.update.type', this.props.field, event.target.value);
    }

    render() {
        return (
            <div className="form-group row">
                <div className="col-md-5">
                    <input
                        onChange={this.onTitleChange.bind(this)}
                        value={this.props.field.title}
                        className="form-control col-md-2" placeholder="Field Title" />
                </div>
                <div className="col-md-5">
                    <input
                        onChange={this.onTypeChange.bind(this)}
                        value={this.props.field.type}
                        className="form-control col-md-2" placeholder="Field Type (Dropdown later)" />
                </div>
                <div className="checkbox enabled cold-md-2">
                    <label><input type="checkbox" /> Mandatory</label>
                </div>
            </div>
        );
    }
};
export default NewField;

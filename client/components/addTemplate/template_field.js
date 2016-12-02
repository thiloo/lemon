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

    removeField() {
        const{ template, field } = this.props;
        Meteor.call('templates.remove.field', template, field);
    }

    render() {
        return (
            <div className="row"id={this.props.field._id}>
                <div className="form-group col-sm-8 ">
                    <input
                        onChange={this.onTitleChange.bind(this)}
                        value={this.props.field.title}
                        className="form-control" placeholder="Name of variable tracked, e.g. production date " />
                </div>
                <div className="form-group col-sm-3">
                    <select className="form-control" onChange={this.onTypeChange.bind(this)}>
                        <option default disabled>Variable type</option>
                        <option>string</option>
                        <option>uint</option>
                        <option>boolean</option>
                    </select>
                </div>
                <div className="form-group col-sm-1">
                    <button
                        onClick={this.removeField.bind(this)}
                        type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-remove removeField"></span>
                    </button>
                </div>


                {/* Should some fields be mandator, while others not?
                <div className="form-group col-sm-2">
                    <label><input
                        onChange={this.onMandatoryChange.bind(this)}
                        type="checkbox" /> Mandatory</label>
                </div> */}
            </div>
        );
    }
}

export default NewField;

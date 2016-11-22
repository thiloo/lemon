import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Fields } from '../../../imports/collections/templates';
import NewField from './template_field';

export default class AdditionalFields extends Component {
    addField(event) {
        event.preventDefault();
        return (
            Meteor.call('fields.insert', this.props.template, (error) => {
                if(error) {
                    console.log(error);
                }
            })
        );
    }

    render() {
        return (
            <div>
                <div className="col-md-8">
                    <button className="btn btn-secondary" onClick={ this.addField.bind(this) }>Add New Field</button>
                </div>
                <div className="form-group col-md-8">
                    <NewField />
                </div>
            </div>

        );
    }
}

// export default createContainer((props)=> {
//     // let templateId = props.template._id;
//     Meteor.subscribe('fields');
//     // console.log(templateId);
//     // console.log(Fields.find({}).fetch());
//     // return { fields: Fields.find({ }).fetch()};
// }, AdditionalFields);

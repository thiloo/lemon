import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Fields } from '../../../imports/collections/templates';
import NewField from './template_field';

class AdditionalFields extends Component {
    render() {
        console.log(this.props.fields);
        return (
            <div>
                <div className="form-group col-md-8">
                    {this.props.fields.map((field) => {
                        return <NewField field={field} key={field._id}/>;
                    })}
                </div>
            </div>
        );
    }
}

export default createContainer((props)=> {
    if(props) {
        let templateId = props.template;
        Meteor.subscribe('fields');
        return { fields: Fields.find({ templateId }).fetch()};
    }
}, AdditionalFields);

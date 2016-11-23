import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Fields } from '../../../imports/collections/fields';
import NewField from './template_field';

class AdditionalFields extends Component {
    renderAdditionalField() {
        if(this.props.template) {
            return this.props.template.additionalFields.map((field) => {
                return (
                    <NewField
                        template={this.props.template}
                        field={field}
                        key={field._id} />
                );
            });
        }
    }

    render() {
        return (
            <div>
                <div className="form-group col-md-8">
                    { this.renderAdditionalField() }
                </div>
            </div>
        );
    }
}

export default createContainer((props)=> {
    if(props.template) {
        let templateId = props.template._id;
        Meteor.subscribe('fields');
        return { fields: Fields.find({ templateId }).fetch()};
    } else {
        return { fields: [] };
    }
}, AdditionalFields);

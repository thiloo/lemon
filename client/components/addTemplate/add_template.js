import React, { Component } from 'react';
import RequiredTemplateFields from './required_template_fields';
import { createContainer } from 'meteor/react-meteor-data';

import AdditionalFields from './additional_template_fields';
import { Templates } from '../../../imports/collections/templates';

class AddTemplate extends Component {
    addField(event) {
        event.preventDefault();
        return (
            Meteor.call('fields.insert', this.props.template, (error, field) => {
                if(error) {
                    console.log(error);
                }
            })
        );
    }

    render() {
        return (
            <div className="container">
                <form className="form-horizontal" role="form">
                    <RequiredTemplateFields template={this.props.template}/>
                    <div className="col-md-8">
                        <button className="btn btn-secondary" onClick={ this.addField.bind(this) }>Add New Field</button>
                    </div>
                    <AdditionalFields template={this.props.template} />
                </form>
            </div>
        );
    }
}

export default createContainer((props) => {
    const { templateId } = props.params;
    Meteor.subscribe('templates');
    return { template: Templates.findOne(templateId) };
}, AddTemplate);

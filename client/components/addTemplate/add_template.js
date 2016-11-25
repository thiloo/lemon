import React, { Component } from 'react';
import RequiredTemplateFields from './required_template_fields';
import { createContainer } from 'meteor/react-meteor-data';

import AdditionalFields from './additional_template_fields';
import { Templates } from '../../../imports/collections/templates';

class AddTemplate extends Component {
    addField(event) {
        event.preventDefault();

        function guidGenerator() {
            var S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+S4()+S4());
        }

        const field = {
            _id: guidGenerator(),
            title: '',
            type: '',
            mandatory: false,
            content: ''
        };

        Meteor.call('templates.push.additionalFields', this.props.template, field);
    }

    render() {
        return (
            <div className="container">
                <form className="form-horizontal" role="form">
                    <RequiredTemplateFields template={this.props.template} />
                    <AdditionalFields template={this.props.template} />
                    <div className="col-sm-4 col-sm-offset-4">
                        <button className="btn btn-primary" onClick={ this.addField.bind(this) }>Add New Field</button>
                    </div>
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

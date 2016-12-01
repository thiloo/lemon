import React, { Component } from 'react';
import RequiredTemplateFields from './required_template_fields';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

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

    deleteTemplate() {
        Meteor.call('templates.delete.template', this.props.template);
    }

    render() {
        const url = '/';
        return (
            <div className="container">
                <form className="form-horizontal" role="form">
                    <RequiredTemplateFields template={this.props.template} />
                    <AdditionalFields template={this.props.template} />
                    <div className="col-sm-10 col-sm-offset-3">
                        <button className="btn btn-primary col-sm-2" onClick={ this.addField.bind(this) }>Add New Field</button>
                        <button className="btn btn-success col-sm-2" onClick={ this.addField.bind(this) }>Save Template</button>
                        <Link to={url}>
                            <button className="btn btn-danger col-sm-2" onClick={ this.deleteTemplate.bind(this) }>Delete Template</button>
                        </Link>
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

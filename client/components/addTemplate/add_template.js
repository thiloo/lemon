import React, { Component } from 'react';
import RequiredTemplateFields from './required_template_fields';
import { createContainer } from 'meteor/react-meteor-data';

import AdditionalFields from './additional_template_fields';
import { Templates } from '../../../imports/collections/templates';

class AddTemplate extends Component {
    addField(event) {
        event.preventDefault();

        Meteor.call('fields.insert', this.props.template);
    }

    render() {
        return (
            <div className="container">
                <form className="form-horizontal" role="form">
                    <RequiredTemplateFields template={this.props.template}/>
                    <AdditionalFields template={this.props.template} />
                    <div className="col-md-8">
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

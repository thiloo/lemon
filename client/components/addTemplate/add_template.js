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
            type: 'string',
            mandatory: false,
            content: ''
        };

        Meteor.call('templates.push.additionalFields', this.props.template, field);
    }

    deleteTemplate() {
        Meteor.call('templates.delete.template', this.props.template);
    }

    generateSourceCode(event) {
        // event.preventDefault();
        // here dynamically generated source code should appear, based on template
        const fields = this.props.template.additionalFields;
        let variables = '';
        let identifiers = '';
        let input = '';
        let counter = 0;
        // generate the solidity code based on the input
        fields.map(field => {
            counter += 1;
            // per input field one variable, identifiers = for function input. Input = in function
            if(counter < fields.length) {
                variables += `${field.type} public ${field.title}; `;
                identifiers += `${field.type} p${field.title}, `;
                input += `${field.title} = p${field.title}; `;
            }
            // for the last variables no commas should be at the end.
            if(counter == fields.length) {
                variables += `${field.type} public ${field.title};`;
                identifiers += `${field.type} p${field.title}`;
                input += `${field.title} = p${field.title};`;
            }
        });
        const sourceCode = `pragma solidity ^0.4.4; contract SimpleProduct { ${variables} function SimpleProduct( ${identifiers} ) { ${input} } } `;

        web3.eth.compile.solidity(sourceCode, (error, compiled) => {
            console.log(error, compiled);
            if(!error) {
                Meteor.call('templates.update.abi', this.props.template, compiled);
            }
        });
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
                        <Link to={url}>
                            <button className="btn btn-success col-sm-2" onClick={ this.generateSourceCode.bind(this) }>Save Template</button>
                        </Link>
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

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Accounts from './accounts';

class Header extends Component {
    onAddProductClick(event) {
        event.preventDefault();

        Meteor.call('templates.insert', (error, templateId) => {
            browserHistory.push(`/templates/${templateId}`);
        });
    }

    render() {
        return (
            <nav className="nav navbar-default">
                <div className="navbar-header">
                    <a className="navbar-brand">Lemon</a>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <Accounts />
                    </li>
                    <li>
                        <a href="#" onClick={this.onAddProductClick.bind(this)}>Add Template</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Accounts from './accounts';
import UnlockWallet from './wallet/unlock_wallet';

class Header extends Component {
    onAddTemplateClick(event) {
        event.preventDefault();

        Meteor.call('templates.insert', (error, templateId) => {
            browserHistory.push(`/templates/${templateId}`);
        });
    }

    onAddProductClick(event) {
        event.preventDefault();

        Meteor.call('products.insert', (error, productId) => {
            browserHistory.push(`/products/add/${productId}`);
        });
    }

    render() {
        return (
            <nav className="nav navbar-default">
                <div className="navbar-header">
                    <Link to='/' className="navbar-brand">Lemon</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <Accounts />
                    </li>
                    <li>
                        <a href="#" onClick={this.onAddTemplateClick.bind(this)}>Add Template</a>
                    </li>
                    <li>
                        <a href="#" onClick={this.onAddProductClick.bind(this)}>Add Product</a>
                    </li>
                    <li>
                        <UnlockWallet
                            onKeyStoreUnlock={this.props.onKeyStoreUnlock}
                            wallet={this.props.keyStore} />
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Header;

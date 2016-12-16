import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Accounts from './accounts';
import UnlockWallet from './wallet/unlock_wallet';
import Login from './login';
import Signup from './signup';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state={
            showLoginModal: false,
            showSignupModal: false
        };
    }

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

    logOut(e) {
        e.preventDefault();
        console.log('click');
        this.setState({showModal: true});
        // Meteor.logout();
        // browserHistory.push('/login');
    }

    openSignupModal() {
        this.setState({ showSignupModal: true });
    }

    closeSignupModal() {
        this.setState({ showSignupModal: false });
    }

    openLoginModal() {
        this.setState({ showLoginModal: true });
    }

    closeLoginModal() {
        this.setState({ showLoginModal: false });
    }

    signUpButton() {
        if(Meteor.userId() == null) {
            return (
                <li>
                    <Signup
                        onKeyStoreUnlock={this.props.onKeyStoreUnlock}
                        onKeyStoreDeserialize={this.props.onKeyStoreDeserialize}
                        closeModal={this.closeSignupModal.bind(this)}
                        showModal={this.state.showSignupModal}/>
                    <a href="#" onClick={this.openSignupModal.bind(this)}><span className="glyphicon glyphicon-user"></span> Sign Up</a>
                </li>
            );
        }
    }

    loginButton() {
        if(Meteor.userId() == null) {
            return (
                <li>
                    <Login
                        keyStore={this.props.keyStore}
                        pwDerivedKey={this.props.pwDerivedKey}
                        onKeyStoreUnlock={this.props.onKeyStoreUnlock}
                        onKeyStoreDeserialize={this.props.onKeyStoreDeserialize}
                        setKeyStore={this.props.setKeyStore}
                        closeModal={this.closeLoginModal.bind(this)}
                        showModal={this.state.showLoginModal}/>
                    <a href="#" onClick={this.openLoginModal.bind(this)}><span className="glyphicon glyphicon-log-in"></span> Login</a>
                </li>
            );
        }
    }

    logOutButton() {
        if(Meteor.userId() != null) {
            return (
                <li>
                    <a href="#" onClick={this.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a>
                </li>
            );
        }
    }

    logout(e){
        e.preventDefault();
        Meteor.logout();
        browserHistory.push('/');
    }

    render() {
        return (
            <nav className="nav navbar-default">
                <div className="navbar-header">
                    <Link to='/' className="navbar-brand">lemon</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <a href="#" onClick={this.onAddTemplateClick.bind(this)}>Add Template</a>
                    </li>
                    <li>
                        <a href="#" onClick={this.onAddProductClick.bind(this)}>Add Product</a>
                    </li>

                    {this.logOutButton()}
                    {this.loginButton()}
                    {this.signUpButton()}
                </ul>
            </nav>
        );
    }
}

export default Header;

import React, {Component, PropTypes} from 'react';
import {browserHistory, Link} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import lightwallet from 'eth-lightwallet';

let email;
let password;

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        email = document.getElementById('login-email').value;
        password = document.getElementById('login-password').value;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.onClose();
                // browserHistory.push('/');
            }
        });
    }

    onClose() {
        this.props.closeModal();
    }

    deserializeKeyStore() {
        if(this.props.keyStore && password && this.props.pwDerivedKey == '') {
            const ks = this.props.keyStore.keyStore;
            const deserialized = lightwallet.keystore.deserialize(ks);
            this.props.onKeyStoreDeserialize(deserialized);
            deserialized.keyFromPassword(password, (err, key) => this.props.onKeyStoreUnlock(key));
        }
    }

    render() {
        {this.deserializeKeyStore();}
        if(this.props.showModal) {
            const error = this.state.error;
            return (
                <div className="modal show">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onClose.bind(this)}><span aria-hidden="true">&times;</span></button>
                                <h3 className="text-center">Login</h3>
                            </div>
                            <div className="modal-body">
                                {error.length > 0
                                    ? <div className="alert alert-danger fade in">{error}</div>
                                    : ''}
                                <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="email" id="login-email" className="form-control input-lg" placeholder="email"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="login-password" className="form-control input-lg" placeholder="password"/>
                                    </div>
                                    <div className="form-group text-center">
                                        <input type="submit" id="login-button" className="btn btn-primary btn-lg btn-block" value="Login"/>
                                    </div>
                                    <div className="form-group text-center">
                                        <p className="text-center">
                                            Don't have an account? Register
                                            <Link to="/signup">here</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer" style={{
                                borderTop: 0
                            }}></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

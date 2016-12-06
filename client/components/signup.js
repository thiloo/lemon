import React, {Component, PropTypes} from 'react';
import {browserHistory, Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import lightwallet from 'eth-lightwallet';

let password;

export default class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let name = document.getElementById("signup-name").value;
        let email = document.getElementById("signup-email").value;
        password = document.getElementById("signup-password").value;

        Accounts.createUser({
            email: email,
            username: name,
            password: password
        }, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                lightwallet.keystore.createVault({ password: password },
                    (err, ks) => {
                        if (err) {
                            this.setState({error: err.reason});
                        } else {
                            this.onClose();
                            const serialize = ks.serialize();
                            this.onKeyStoreDeserialize(ks);
                            ks.keyFromPassword(password, (err, key) => this.props.onKeyStoreUnlock(key));
                            Meteor.call('keys.save.newWallet', serialize);
                        }
                    });
                // browserHistory.push('/');
            }
        });
    }

    onClose() {
        this.props.closeModal();
    }

    setKeyStore(ks) {
        this.props.setKeyStore(ks);
    }

    render() {
        if(this.props.showModal) {
            const error = this.state.error;
            return (
                <div className="modal show">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onClose.bind(this)}><span aria-hidden="true">&times;</span></button>
                                <h3 className="text-center">Sign up</h3>
                            </div>
                            <div className="modal-body">
                                {error.length > 0
                                    ? <div className="alert alert-danger fade in">{error}</div>
                                    : ''}
                                <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" id="signup-name" className="form-control input-lg" placeholder="name"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" id="signup-email" className="form-control input-lg" placeholder="email"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="signup-password" className="form-control input-lg" placeholder="password"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" id="login-button" className="btn btn-lg btn-primary btn-block" value="Sign Up"/>
                                    </div>
                                    <div className="form-group">
                                        <p className="text-center">
                                            Already have an account? Login
                                            <Link to="/login">here</Link>
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

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Keys } from '../../../imports/collections/keys';
import lightwallet from 'eth-lightwallet';

class UnlockWallet extends Component {
    constructor(props) {
        super(props);

        this.state= {
            password: '',
            key: ''
        };
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    unlockWallet(event) {
        const id = event.target.parentElement.id;
        const { keyStore } = this.props.wallets.find((wallet) => wallet._id == id);
        const ks = lightwallet.keystore.deserialize(keyStore);

        ks.keyFromPassword(this.state.password, (err, key) => this.setState({ key }));
    }

    renderWallets() {
        return this.props.wallets.map((wallet) => {
            return (
                <div
                    id={wallet._id}
                    key={wallet._id}>
                    {wallet.walletName}
                    <input
                        onChange={this.setPassword.bind(this)}
                        value={this.state.password}
                        type="password"
                        placeholder="Please insert your password for this wallet" />
                    <button
                        onClick={this.unlockWallet.bind(this)}>Unlock</button>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderWallets()}
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('keys');
    return { wallets: Keys.find({}).fetch() };
}, UnlockWallet);

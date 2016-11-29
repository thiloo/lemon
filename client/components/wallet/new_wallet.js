import React, { Component } from 'react';
import lightwallet from 'eth-lightwallet';

class NewWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            walletName: ''
        };
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    setWalletName(event) {
        this.setState({ walletName: event.target.value });
    }

    createNewWallet() {
        lightwallet.keystore.createVault({ password: this.state.password },
            (err, ks) => {
                const serialize = ks.serialize();
                Meteor.call('keys.save.newWallet', serialize, this.state.walletName);
            });
    }

    render() {
        return (
            <div>
                <input
                    onChange={this.setWalletName.bind(this)}
                    value={this.state.walletName}
                    placeholder="Please add a name for your wallet" />
                <input
                    onChange={this.setPassword.bind(this)}
                    value={this.state.password}
                    type="password"
                    placeholder="Please enter a password" />

                <button onClick={this.createNewWallet.bind(this)}>Generate a new Wallet</button>
            </div>
        );
    }
}

export default NewWallet;

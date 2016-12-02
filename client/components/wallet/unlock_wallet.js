import React, { Component } from 'react';
import { Keys } from '../../../imports/collections/keys';
import lightwallet from 'eth-lightwallet';
import SingleWallet from './single_wallet';

class UnlockWallet extends Component {
    constructor(props) {
        super(props);

        this.state= {
            password: '',
        };
    }

    unlockWallet(event) {
        // const id = event.target.parentElement.id;
        const { keyStore, _id } = this.props.wallet;
        const ks = lightwallet.keystore.deserialize(keyStore);

        // this.props.changeKeyStoreState(ks);
        // this.props.changeWalletId(_id);
        ks.keyFromPassword(this.state.password, (err, key) => this.props.onKeyStoreUnlock(key));
    }

    onPasswordInput(password) {
        if(password) {
            this.setState({ password });
        }
    }

    renderWallets() {
        if(this.props.wallet != undefined) {
            const wallet = this.props.wallet;
            // return this.props.wallets.map((wallet) => {
            return (
                <SingleWallet
                    onPasswordInput={this.onPasswordInput.bind(this)}
                    unlockWallet={this.unlockWallet.bind(this)}
                    key={wallet._id}
                    state={this.state}
                    wallet={wallet} />
            );
            // });
        }

    }

    render() {
        return (
            <div>
                {this.renderWallets()}
            </div>
        );
    }
}

export default UnlockWallet;

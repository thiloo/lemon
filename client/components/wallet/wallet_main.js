import React, { Component } from 'react';
import UnlockWallet from './unlock_wallet';
import NewWallet from './new_wallet';
import NewAddress from './new_address';
import NewTransaction from './new_transaction';
import { createContainer } from 'meteor/react-meteor-data';
import { Keys } from '../../../imports/collections/keys';


class WalletMain extends Component {
    constructor(props) {
        super(props);

        this.state= {
            pwDerivedKey: '',
            keyStore: '',
            walletId: ''
        };
    }

    changePwDerivedKeyState(pwDerivedKey) {
        this.setState({ pwDerivedKey });
    }

    changeKeyStoreState(keyStore) {
        this.setState({ keyStore });
    }

    changeWalletId(walletId) {
        this.setState({ walletId });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <UnlockWallet
                    mainState={this.state}
                    changePwDerivedKeyState={this.changePwDerivedKeyState.bind(this)}
                    changeKeyStoreState={this.changeKeyStoreState.bind(this)}
                    changeWalletId={this.changeWalletId.bind(this)}
                    wallets={this.props.wallets} />
                <NewAddress
                    keys={this.state} />
                <NewTransaction
                    keys={this.state} />
                {/* <NewWallet /> */}
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('keys');
    return { wallets: Keys.find({}).fetch() };
}, WalletMain);

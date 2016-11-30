import React, {Component} from 'react';
import UnlockWallet from './unlock_wallet';
import NewWallet from './new_wallet';
import NewAddress from './new_address';
import NewTransaction from './new_transaction';
import NewChain from './new_chain';
import NewContract from './new_contract';
import {createContainer} from 'meteor/react-meteor-data';
import {Keys} from '../../../imports/collections/keys';
import HookedWeb3Provider from 'hooked-web3-provider';


class WalletMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pwDerivedKey: '',
            keyStore: '',
            walletId: '',
            selectedAddress: ''
        };
    }

    changePwDerivedKeyState(pwDerivedKey) {
        this.setState({pwDerivedKey});
    }

    changeKeyStoreState(keyStore) {
        this.setState({keyStore});
        this.setWeb3KeyStore(keyStore);
    }

    changeWalletId(walletId) {
        this.setState({walletId});
    }

    setWeb3KeyStore(keyStore) {
        // enable when using external node and lightwallet client

        const web3Provider = new HookedWeb3Provider({
            host: "http://localhost:8545",
            transaction_signer: keyStore
        });
        web3.setProvider(web3Provider);
    }

    onAddressSelect(address) {
        this.setState({ selectedAddress: address });
    }

    render() {
        return (
            <div>
                <UnlockWallet
                    mainState={this.state} changePwDerivedKeyState={this.changePwDerivedKeyState.bind(this)} changeKeyStoreState={this.changeKeyStoreState.bind(this)} changeWalletId={this.changeWalletId.bind(this)} wallets={this.props.wallets}/>
                <NewAddress
                    onAddressSelect={this.onAddressSelect.bind(this)}
                    keys={this.state}/>
                <NewTransaction keys={this.state}/>
                <NewContract selectedAddress={this.state.selectedAddress}/>
                <NewChain
                    ks={this.state.keyStore}
                    pw={this.state.pwDerivedKey} />
                {/* <NewWallet /> */}
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('keys');
    return {wallets: Keys.find({}).fetch()};
}, WalletMain);

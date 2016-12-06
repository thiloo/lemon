import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Keys} from '../../imports/collections/keys';
import HookedWeb3Provider from 'hooked-web3-provider';
import { browserHistory } from 'react-router';
import lightwallet from 'eth-lightwallet';

import Header from './header';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pwDerivedKey: '',
        };

    }

    // componentWillMount(){
    //     if (!this.state.isAuthenticated) {
    //         browserHistory.push('/login');
    //     }
    // }
    //
    // componentDidUpdate(prevProps, prevState){
    //     if (!this.state.isAuthenticated) {
    //         browserHistory.push('/login');
    //     }
    // }

    onKeyStoreUnlock(pwDerivedKey) {
        this.setState({ pwDerivedKey });
    }

    setWeb3Provider() {
        if(!web3.currentProvider && this.props.keyStore) {
            const ks = this.props.keyStore.keyStore;
            const deserialized = lightwallet.keystore.deserialize(ks);
            const web3Provider = new HookedWeb3Provider({
                host: "http://localhost:8545",
                transaction_signer: deserialized
            });
            web3.setProvider(web3Provider);
        }

    }

    render() {
        {this.setWeb3Provider();}
        const children = React.cloneElement(this.props.children, {
            keyStore: this.props.keyStore,
            pwDerivedKey: this.state.pwDerivedKey
        });
        return (
            <div>
                <Header
                    setKeyStore={this.onKeyStoreUnlock.bind(this)}
                    onKeyStoreUnlock={this.onKeyStoreUnlock.bind(this)}
                    onKeyStoreDeserialize={this.setWeb3Provider.bind(this)}
                    pwDerivedKey={this.state.pwDerivedKey}
                    keyStore={this.props.keyStore} />
                {children}
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('keys');
    Meteor.subscribe('contracts');
    return {
        keyStore: Keys.findOne({}),
    };
}, App);

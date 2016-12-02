import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Keys} from '../../imports/collections/keys';
import HookedWeb3Provider from 'hooked-web3-provider';

import Header from './header';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pwDerivedKey: '',
            keyStore: '',
        };
    }

    onKeyStoreUnlock(pwDerivedKey) {
        this.setState({ pwDerivedKey });
    }

    setWeb3Provider() {
        if(this.props.keyStore) {
            const web3Provider = new HookedWeb3Provider({
                host: "http://localhost:8545",
                transaction_signer: this.props.keyStore
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
                    onKeyStoreUnlock={this.onKeyStoreUnlock.bind(this)}
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

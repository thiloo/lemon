import React, { Component } from 'react';
import lightwallet from 'eth-lightwallet';


class NewAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressCount: ''
        };
    }

    onCountChange(event) {
        this.setState({ addressCount: event.target.value });
    }

    generateAddress() {
        let ks = this.props.keys.keyStore;
        ks.generateNewAddress(this.props.keys.pwDerivedKey, this.state.addressCount);
        const serialize = ks.serialize();
        Meteor.call('keys.update.wallet', this.props.keys.walletId, serialize);
    }

    checkAddressBalance(event) {
        const address = event.target.parentElement.id;
        web3.eth.getBalance(address, (error, value) => console.log(error, value));
        // Meteor.call('eth.get.addressBalance', address, (error, balance) => console.log(error, balance));
    }

    topupAddress(event) {
        const address = event.target.parentElement.id;
        Meteor.call('eth.get.testCoins', address, (error, balance) => console.log(error, balance));
    }

    selectAddress(event) {
        this.props.onAddressSelect(event.target.parentElement.id);
    }

    renderAdressess() {
        if(this.props.keys.keyStore != '') {
            const ks = this.props.keys.keyStore;
            const addresses = ks.getAddresses();
            return addresses.map(address => (
                <div id={address} key={address}>
                    {address}
                    <button onClick={this.checkAddressBalance.bind(this)}>Check Balance</button>
                    <button onClick={this.topupAddress.bind(this)}>Topup Balance</button>
                    <button onClick={this.selectAddress.bind(this)}>Select Addresss</button>
                </div>
            ));
        }
    }

    render() {
        return (
            <div>
                <div>
                    You currently have the following addresses:
                    <ul>
                        {this.renderAdressess()}
                    </ul>
                </div>
                <div>
                    How many new addresses should be generated?
                    <input onChange={this.onCountChange.bind(this)} />
                    <button onClick={this.generateAddress.bind(this)}>Generate Address</button>
                </div>
            </div>
        );
    }
}

export default NewAddress;

import React, { Component } from 'react';
import lightwallet from 'eth-lightwallet';

class NewTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromAddress: '',
            toAddress: '',
            amount: 0
        };
    }

    prepareTransaction() {
        const { fromAddress, toAddress, amount } = this.state;
        let txObject = {
            to: toAddress,
            gasLimit: 21000,
            gasPrice: 41000000000,
            value: amount,
            nonce: '0x00'
        };

        const tx = lightwallet.txutils.valueTx(txObject);
        this.sendTransaction(tx);
        // Meteor.call('eth.prepare.newTransaction', fromAddress, toAddress, amount, (error, value) => {
        //     if(error) console.log(11, error);
        //
        //     if(value) {
        //         this.sendTransaction(value);
        //     }
        // });
    }

    sendTransaction(tx) {
        const { pwDerivedKey, keyStore } = this.props.keys;
        const signed = lightwallet.signing.signTx(keyStore, pwDerivedKey, tx, this.state.fromAddress);
        Meteor.call('eth.decode.newTransaction', signed, (error, value) => console.log(error, value));
    }

    render() {
        return (
            <div>
                Send a new Transaction! <br />
                From: <input
                    onChange={event => this.setState({ fromAddress: event.target.value })}
                    placeholder="from Address" />
                To: <input
                    onChange={event => this.setState({ toAddress: event.target.value })}
                    placeholder="to Address" />
                Amount: <input
                    onChange={event => this.setState({ amount: event.target.value })}
                    placeholder="Amount" />
                <button onClick={this.prepareTransaction.bind(this)}>Send Transaction</button>
            </div>
        );
    }
}

export default NewTransaction;

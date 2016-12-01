import React, { Component } from 'react';

class NewTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromAddress: '',
            toAddress: '',
            amount: 0
        };
    }

    sendTransaction() {
        const { fromAddress, toAddress, amount } = this.state;
        let txObject = {
            from: fromAddress,
            to: toAddress,
            gasLimit: 21000,
            gasPrice: 41000000000,
            value: parseFloat(amount)
        };
        web3.eth.sendTransaction(txObject, (error, value) => console.log(error, value));
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
                <button onClick={this.sendTransaction.bind(this)}>Send Transaction</button>
            </div>
        );
    }
}

export default NewTransaction;

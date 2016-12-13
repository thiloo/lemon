import React, { Component } from 'react';

class CoinBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balanceOf: '',
        };
    }

    onBalanceOfInputChange(event) {
        this.setState({ balanceOf: event.target.value });
    }

    checkBalance() {
        const balance = this.props.instance.coinBalanceOf(this.state.balanceOf);
        this.props.setBalance(balance.c[0]);
    }

    render() {
        if(this.props.instance != '') {
            return (
                <div>
                    <div>
                        <input
                            value={this.state.balanceOf}
                            onChange={this.onBalanceOfInputChange.bind(this)}
                            placeholder="get balance of" />
                        <button onClick={this.checkBalance.bind(this)}>Check Balance</button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default CoinBalance;

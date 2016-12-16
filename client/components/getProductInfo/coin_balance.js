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
                <div className="form-horizontal col-md-10">
                    <div className="form-group">
                        <div className="col-md-7">
                            <input
                                className="form-control"
                                value={this.state.balanceOf}
                                onChange={this.onBalanceOfInputChange.bind(this)}
                                placeholder="get balance of - address" />
                        </div>
                        <div className="col-md-4">
                            <button onClick={this.checkBalance.bind(this)} className="btn btn-default">Check</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default CoinBalance;

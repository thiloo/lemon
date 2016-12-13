import React, { Component } from 'react';
import CoinBalance from './coin_balance';

class CoinMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: -1
        };
    }
    
    setBalance(balance) {
        this.setState({ balance });
    }

    showBalance() {
        if(this.state.balance >= 0) {
            return (
                <div>
                    The Balance is: {this.state.balance}
                </div>
            );
        }
    }

    render() {
        return(
            <div className="row col-md-offest-1 col-md-10 coinInfoWrapper">
                <CoinBalance
                    setBalance={this.setBalance.bind(this)}
                    instance={this.props.instance} />
                {this.showBalance()}
            </div>
        );
    }
}

export default CoinMain;

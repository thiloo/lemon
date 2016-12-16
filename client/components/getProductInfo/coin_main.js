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
                <div className="col-md-8">
                    The balance of the addres is: {this.state.balance} {this.props.product.template.units}
                </div>
            );
        }
    }

    render() {
        if(this.props.product) {
            return(
                <div className="row col-md-5 coinWrapper">
                    <div>
                        <h3><small>See how many {this.props.product.template.units} somebody owns.</small></h3>
                    </div>
                    <CoinBalance
                        setBalance={this.setBalance.bind(this)}
                        instance={this.props.instance} />
                    {this.showBalance()}
                </div>
            );
        } else {
            return null;
        }

    }
}

export default CoinMain;

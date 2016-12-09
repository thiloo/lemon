import React, { Component } from 'react';

class ChainDetails extends Component {
    render() {
        const address = this.props.params.address;
        const stor = web3.eth.getCode(address, 0);
        console.log(stor)
        return (
            <div>

            </div>
        );
    }
}

export default ChainDetails;

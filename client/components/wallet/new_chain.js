import React, { Component } from 'react';


class NewChain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            command: ''
        };
    }

    getAddresses() {
        const ks = this.props.ks;
        const pw = this.props.pw;
        const addresses = ks.getAddresses();

        const keys = addresses.map(address => ks.exportPrivateKey(address, pw));
        this.generateCommand(keys);
    }

    generateCommand(keys) {
        const accounts = keys.map(key => ` --account="0x${key}, 50000000000000000000"`);
        this.setState({ command: `testrpc ${accounts}`});
    }

    render() {
        return (
            <div>
                <textarea value={this.state.command} />
                <button onClick={this.getAddresses.bind(this)} >Generate Command</button>
            </div>
        );
    }
}

export default NewChain;

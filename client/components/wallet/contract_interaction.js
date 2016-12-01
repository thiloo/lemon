import React, { Component } from 'react';

class ContractInteraction extends Component {
    seeContractDetails(event) {
        const contracts = this.props.contracts;
        const adr = event.target.parentElement.id;
        const contract = contracts.find(contract => contract.address === adr);
        const abi = contract.abi;
        const structure = web3.eth.contract(abi);

        const instance = structure.at(adr);
        console.log(instance);
    }

    renderContractAddresses() {
        if(this.props.contracts) {
            const contracts = this.props.contracts;
            return contracts.map(contract => {
                if(contract.address) {
                    return (
                        <li
                            id={contract.address}
                            key={contract._id}>
                            {contract.address} <button onClick={this.seeContractDetails.bind(this)}>See Details</button>
                        </li>
                    );
                }
            });
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.renderContractAddresses()}
                </ul>
            </div>
        );
    }
}

export default ContractInteraction;

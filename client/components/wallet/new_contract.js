import React, { Component } from 'react';

class NewContract extends Component {
    compileContract() {
        // here dynamically generated source code should appear, based on template
        const sourceCode = 'pragma solidity ^0.4.4; contract SimpleProduct { struct Infos { address author; string infos; } struct Editors { address editor; } address public producer; address public owner; string public name; string public description; uint public date; uint public count; string public unit; Infos[] public infos; Editors[] public editors; function SimpleProduct( string pName, string pDescription, uint pDate, uint pCount, string pUnit ) { producer = msg.sender; owner = msg.sender; name = pName; description = pDescription; date = pDate; count = pCount; unit = pUnit; } } ';

        // var compiled =
        web3.eth.compile.solidity(sourceCode, (error, compiled) => {
            if(!error) {
                this.setUpContract(compiled);
            }
        });
    }

    setUpContract(compiled) {
        // all variables have to be hard coded upon initializing contract.
        // needs to be dynamic, variables should be based on product input by user
        const contract = web3.eth.contract(compiled.info.abiDefinition);
        const pName = 'Beer';
        const pDescription = 'Test Beer description';
        const pDate = 222;
        const pCount = 44;
        const pUnit = 'bottles';
        contract.new(pName, pDescription, pDate, pCount, pUnit, {from: this.props.selectedAddress, data: compiled.code, gas: 4000000}, (error, value) => console.log(error, value));
    }

    render() {
        return (
            <div>
                <button onClick={this.compileContract.bind(this)}>Compile Contract</button>
            </div>
        );
    }
}

export default NewContract;

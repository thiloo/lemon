Meteor.methods({
    'solidity.generate.contract': function(template) {
        //const { title, description, quantity, units } = template;
        const title = { title: 'title', type: 'string' };
        const description = { title: 'description', type: 'string' };
        const quantity = { title: 'quantity', type: 'uint' };
        const units = { title: 'units', type: 'string' };
        const mandatoryFields = [ title, description, quantity, units ];
        const additionalFields = template.additionalFields;
        const fields = mandatoryFields.concat(additionalFields);


        let variables = '';
        let identifiers = '';
        let input = '';
        let counter = 0;
        // generate the solidity code based on the input
        fields.map(field => {
            counter += 1;
            // per input field one variable, identifiers = for function input. Input = in function
            if(counter < fields.length) {
                variables += `${field.type} public ${field.title}; `;
                identifiers += `${field.type} p${field.title}, `;
                input += `${field.title} = p${field.title}; `;
            }
            // for the last variables no commas should be at the end.
            if(counter == fields.length) {
                variables += `${field.type} public ${field.title};`;
                identifiers += `${field.type} p${field.title}`;
                input += `${field.title} = p${field.title};`;
            }
        });

        // const sourceCode = `pragma solidity ^0.4.4; contract SimpleStorage { string storedData; function SimpleStorage(string x) { storedData = x; } function get() constant returns (string x) { return storedData; } }`;

        // const sourceCode2 = `pragma solidity ^0.4.4; contract SimpleStorage { string storedData; address owner; function SimpleStorage(string x) { storedData = x; owner = msg.sender; } function get() constant returns (string x) { return storedData; } function getOwner() constant returns (address y) { return owner; } function changeOwner(address adr) { if(msg.sender != owner) throw; owner = adr; } }`;

        const sourceCode3 = `pragma solidity ^0.4.4; contract SimpleStorage { string storedData; address owner; mapping (address => uint) public coinBalanceOf; event CoinTransfer(address sender, address receiver, uint amount); function SimpleStorage(string x, uint supply) { storedData = x; owner = msg.sender; coinBalanceOf[msg.sender] = supply; } function get() constant returns (string x) { return storedData; } function getOwner() constant returns (address y) { return owner; } function changeOwner(address adr) { if(msg.sender != owner) throw; owner = adr; } function sendCoin(address receiver, uint amount) returns(bool sufficient) { if (coinBalanceOf[msg.sender] < amount) return false; coinBalanceOf[msg.sender] -= amount; coinBalanceOf[receiver] += amount; CoinTransfer(msg.sender, receiver, amount); return true; } }`;

        return sourceCode3;
    }
});

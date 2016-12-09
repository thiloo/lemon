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
        const sourceCode = `pragma solidity ^0.4.4; contract SimpleProduct { ${variables} function SimpleProduct( ${identifiers} ) { ${input} } } `;
        return sourceCode;
    }
});

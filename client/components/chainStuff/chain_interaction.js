import React, {Component} from 'react';
import lightwallet from 'eth-lightwallet';

class ChainInteraction extends Component {
    getInfo() {
        // Meteor.call('eth.send.newTransaction', 'e19dde9ff41c7ae1092b9b8822160c31d8523f44', 'a6851cd98f5b2bd2dfe66e6b558b7e9dfb3addd3', 3000000000, '4ffa2048145440371889ed1c4f1c88ef26d0b3063bb15d46b1cfed5ff09ff0d7', (error, value) => {
        //     if(error) {
        //         console.log('error:', error);
        //     } else {
        //         console.log(value);
        //     }
        // });

        // the seed is stored encrypted by a user-defined password
        var password = prompt('Enter password for encryption', 'password');

        lightwallet.keystore.createVault({
            password: password,
            // seedPhrase: seedPhrase, // Optionally provide a 12-word seed phrase
            // salt: fixture.salt,     // Optionally provide a salt.
            // A unique salt will be generated otherwise.
            // hdPathString: hdPath    // Optional custom HD Path String
        }, function(err, ks) {
            // Some methods will require providing the `pwDerivedKey`,
            // Allowing you to only decrypt private keys on an as-needed basis.
            // You can generate that value with this convenient method:
            ks.keyFromPassword(password, function(err, pwDerivedKey) {
                if (err)
                    throw err;
                // generate five new address/private key pairs
                // the corresponding private keys are also encrypted
                ks.generateNewAddress(pwDerivedKey, 5);
                var addr = ks.getAddresses();
                ks.passwordProvider = function(callback) {
                    var pw = prompt("Please enter password", "Password");
                    callback(null, pw);
                };

                // Now set ks as transaction_signer in the hooked web3 provider
                // and you can start using web3 using the keys/addresses in ks!
            });
        });
    }

    render() {
        return (
            <div>Hello this is working!!! {this.getInfo()}</div>
        );
    }
}

export default ChainInteraction;

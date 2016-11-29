import {HTTP} from 'meteor/http';
import passwords from '../passwords.json';

const ROOT_URL = 'https://api.blockcypher.com/v1/beth/test';
const params = {
    params: {
        token: passwords.API_TOKEN
    }
};

Meteor.methods({
    'eth.get.currentHeight': function() {
        return HTTP.get(ROOT_URL);
    },

    'eth.get.newAddress': function() {
        return HTTP.post(`${ROOT_URL}/addrs`, params);
    },

    'eth.get.testCoins': function(address) {
        const data = {
            "address": address,
            "amount": 1000000000000000000
        };
        const options = {
            params,
            data
        };

        return HTTP.post(`${ROOT_URL}/faucet?token=${passwords.API_TOKEN}`, options);
    },

    'eth.get.addressBalance': function(address) {
        return HTTP.get(`${ROOT_URL}/addrs/${address}/balance`);
    },

    'eth.send.newTransaction': function(input, output, amount, privatKey) {
        const data = {
            "inputs": [
                {
                    "addresses": [input]
                }
            ],
            "outputs": [
                {
                    "addresses": [output],
                    "value": amount
                }
            ]
        };
        const options = {
            params,
            data
        };

        return HTTP.post(`${ROOT_URL}/txs/new?token=${passwords.API_TOKEN}`, options, (error, value) => {
            if (error) {
                console.log(error);
            } else {
                console.log(value);
            }
        });
    }
});

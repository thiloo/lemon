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

    'eth.get.addressDetails': function(address) {
        return HTTP.get(`${ROOT_URL}/addrs/${address}`);
    },

    'eth.prepare.newTransaction': function(input, output, amount) {
        const data = {
            "inputs": [
                {
                    "addresses": [input]
                }
            ],
            "outputs": [
                {
                    "addresses": [output],
                    "value": parseInt(amount)
                }
            ]
        };
        const options = {
            params,
            data
        };

        return HTTP.post(`${ROOT_URL}/txs/new?token=${passwords.API_TOKEN}`, options);
    },

    'eth.decode.newTransaction': function(tx) {
        return HTTP.post(`${ROOT_URL}/txs/decode?token=${passwords.API_TOKEN}`, tx, (error, value) => console.log(error, value));
    },

    'eth.send.newTransaction': function(tx) {
        var x = encodeURIComponent(tx);
        console.log(typeof tx);
        const options = {
            "tx":x
        };
        console.log(tx, options);
        return HTTP.post(`${ROOT_URL}/txs/push?token=${passwords.API_TOKEN}`, JSON.stringify(options));
    }
});

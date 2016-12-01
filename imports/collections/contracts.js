import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'contracts.save.newContract': function(walletId, name, abi, address) {
        return Contracts.insert({
            ownerId: this.userId,
            walletId: walletId,
            name: name,
            abi: abi,
            address: address
        });
    },
});

export const Contracts = new Mongo.Collection('contracts');

import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'contracts.save.newContract': function(walletId, productId, name, abi, address) {
        return Contracts.insert({
            ownerId: this.userId,
            walletId: walletId,
            productId: productId,
            name: name,
            abi: abi,
            address: address
        });
    },
});

export const Contracts = new Mongo.Collection('contracts');

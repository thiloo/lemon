import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'keys.save.newWallet': function(wallet, name) {
        return Keys.insert({
            ownerId: this.userId,
            keyStore: wallet,
            walletName: name,
            contracts: []
        });
    },

    'keys.update.wallet': function(_id, serialized) {
        return Keys.update(_id, { $set: { keyStore: serialized }});
    },

    'keys.push.newContract': function(_id, address) {
        return Keys.update(_id, { $push: { contracts: address }});
    }
});

export const Keys = new Mongo.Collection('keys');

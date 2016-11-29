import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'keys.save.newWallet': function(wallet, name) {
        return Keys.insert({
            ownerId: this.userId,
            keyStore: wallet,
            walletName: name
        });
    },


});

export const Keys = new Mongo.Collection('keys');

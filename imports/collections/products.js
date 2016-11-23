import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'products.insert': function() {
        return Products.insert({
            createdAt: new Date(),
            ownerId: this.userId,
            active: false
        });
    }
});

export const Products = new Mongo.Collection('products');

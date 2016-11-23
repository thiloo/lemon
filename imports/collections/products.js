import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'products.insert': function() {
        return Products.insert({
            createdAt: new Date(),
            ownerId: this.userId,
            active: false,
            template: ''
        });
    },

    'products.update.template': function(product, template) {
        return Products.update(product, { $set: { template }});
    }
});

export const Products = new Mongo.Collection('products');

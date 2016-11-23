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
    },

    'products.update.field.content': function(product, field, update) {
        return Products.update(
            {_id: product._id, 'template.additionalFields._id': field._id},
            {$set: {'template.additionalFields.$.content': update }});
    }

});

export const Products = new Mongo.Collection('products');

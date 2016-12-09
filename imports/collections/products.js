import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'products.insert': function() {
        return Products.insert({
            createdAt: new Date(),
            ownerId: this.userId,
            active: false,
            template: '',
            abi: '',
            address: '',
            keyStoreId: '',
            transaction: {
                toAddress: '',
                quantity: ''
            }
        });
    },

    'products.update.template': function(product, template) {
        return Products.update(product, { $set: { template }});
    },

    'products.update.ownerId': function(product) {
        return Products.update(product, { $set: { ownerId: product.transaction.toAddress }});
    },

    'products.update.transaction.toAddress': function(product, toAddress) {
        return Products.update(product._id, { $set: { 'transaction.toAddress': toAddress }});
    },

    'products.update.transaction.quantity': function(product, quantity) {
        return Products.update(product._id, { $set: { 'transaction.quantity': quantity }});
    },

    'products.update.field.content': function(product, field, update) {
        return Products.update(
            {_id: product._id, 'template.additionalFields._id': field._id},
            {$set: {'template.additionalFields.$.content': update }});
    },

    'products.delete.product': function(product) {
        return Products.remove({_id: product._id });
    },

    'products.update.blockchainDetails': function(product, abi, address, keyStoreId) {
        return Products.update(product._id, { $set: { abi, address, keyStoreId }});
    },

    'products.update.active': function(product) {
        return Products.update(product._id, { $set: { active: true }});
    }

});

export const Products = new Mongo.Collection('products');

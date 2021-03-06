import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'templates.insert': function() {
        return Templates.insert({
            createdAt: new Date(),
            title: '',
            description: '',
            ownerId: this.userId,
            quantity: '',
            units: '',
            additionalFields: [],
            compiled: ''
        });
    },

    'templates.update.title': function(template, update) {
        return Templates.update(template._id, { $set: { title: update }});
    },

    'templates.update.description': function(template, update) {
        return Templates.update(template._id, { $set: { description: update }});
    },

    'templates.update.quantity': function(template, update) {
        return Templates.update(template._id, { $set: { quantity: update }});
    },

    'templates.update.units': function(template, update) {
        return Templates.update(template._id, { $set: { units: update }});
    },

    'templates.push.additionalFields': function(template, update) {
        return Templates.update(template._id, { $push: { additionalFields: update }});
    },

    'templates.update.field.title': function(template, field, update) {
        return Templates.update({_id: template._id, "additionalFields._id": field._id },
            { $set: { "additionalFields.$.title": update }});
    },

    'templates.update.field.type': function(template, field, update) {
        return Templates.update({_id: template._id, "additionalFields._id": field._id },
            { $set: { "additionalFields.$.type": update }});
    },

    'templates.update.field.mandatory': function(template, field, update) {
        return Templates.update({_id: template._id, "additionalFields._id": field._id },
            { $set: { "additionalFields.$.mandatory": update }});
    },

    'templates.remove.field': function(template, field) {
        return Templates.update({_id: template._id, "additionalFields._id": field._id },
            { $unset: { "additionalFields.$": "" }});
    },

    'templates.delete.template': function(template) {
        return Templates.remove({_id: template._id});
    },

    'templates.update.abi': function(template, compiled) {
        return Templates.update(template._id, { $set: { compiled }});
    }

});

export const Templates = new Mongo.Collection('templates');

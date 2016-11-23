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
            additionalFields: []
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
    }

});

export const Templates = new Mongo.Collection('templates');

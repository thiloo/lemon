import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'fields.insert': function(templateId) {
        return Fields.insert({
            templateId: templateId,
            ownerId: this.userId,
            title: '',
            type: '',
            mandatory: false
        });
    },

    'fields.update.title': function(field, update) {
        return Fields.update(field._id, { $set: { title: update }});
    },

    'fields.update.type': function(field, update) {
        return Fields.update(field._id, { $set: { type: update }});
    }
});


export const Fields = new Mongo.Collection('fields');

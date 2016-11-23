import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'fields.insert': function(template) {
        console.log(template._id);
        return Fields.insert({
            templateId: template._id,
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

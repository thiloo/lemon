import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'templates.insert': function() {
        return Templates.insert({
            createdAt: new Date(),
            title: '',
            description: '',
            ownerId: this.userId,
            quantity: {},
            descriptionFields: []
        });
    },

    'templates.update': function(template, field, update) {
        let setModifier = { $set: {} };
        setModifier.$set[field] = update;
        return Templates.update(template._id, setModifier);
    },


    'templates.push': function(template, field, update) {
        let setModifier = { $push: {} };
        setModifier.$push[field] = update;
        return Templates.update(template._id, setModifier);
    },

    'fields.insert': function(templateId) {
        return Fields.insert({
            templateId: templateId,
            ownerId: this.userId,
            title: '',
            type: '',
            mandatory: false
        });
    }
});

export const Templates = new Mongo.Collection('templates');
export const Fields = new Mongo.Collection('fields');

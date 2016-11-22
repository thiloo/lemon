// Only runing on server
import { Meteor } from 'meteor/meteor';
import { Templates, Fields } from '../imports/collections/templates';

Meteor.startup(() => {
    Meteor.publish('templates', function() {
        return Templates.find({ ownerId: this.userId });
    });
    Meteor.publish('fields', function() {
        return Fields.find({ ownerId: this.userId });
    });
});

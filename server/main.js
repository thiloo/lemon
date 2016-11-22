// Only runing on server
import { Meteor } from 'meteor/meteor';
import { Templates } from '../imports/collections/templates';

Meteor.startup(() => {
    Meteor.publish('templates', function() {
        return Templates.find({ ownerId: this.userId });
    });
});

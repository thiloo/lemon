// Only runing on server
import { Meteor } from 'meteor/meteor';
import { Templates } from '../imports/collections/templates';
import { Fields } from '../imports/collections/fields';


Meteor.startup(() => {
    Meteor.publish('templates', function() {
        return Templates.find({ ownerId: this.userId });
    });
    Meteor.publish('fields', function() {
        return Fields.find({ ownerId: this.userId });
    });
});

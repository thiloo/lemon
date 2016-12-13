// Only runing on server
import { Meteor } from 'meteor/meteor';
import { Templates } from '../imports/collections/templates';
import { Fields } from '../imports/collections/fields';
import { Products } from '../imports/collections/products';
import { Keys } from '../imports/collections/keys';
import { Contracts } from '../imports/collections/contracts';


Meteor.startup(() => {
    Meteor.publish('templates', function() {
        return Templates.find({ ownerId: this.userId });
    });
    Meteor.publish('fields', function() {
        return Fields.find({ ownerId: this.userId });
    });
    Meteor.publish('products', function() {
        return Products.find({  });
    });
    Meteor.publish('keys', function() {
        return Keys.find({ ownerId: this.userId });
    });
    Meteor.publish('contracts', function() {
        return Contracts.find({ ownerId: this.userId });
    });
});

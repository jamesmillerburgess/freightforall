import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Jobs } from './jobs.js';

Meteor.methods({
  'jobs.addNew'(nextJobNumber) {
    check(nextJobNumber, Number);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Jobs.insert({creator: this.userId, number: nextJobNumber});
  },
  'jobs.archive'(id) {
    Jobs.update({_id: id}, {$set: {archived: true}});
  },
  'jobs.unarchive'(id) {
    Jobs.update({_id: id}, {$set: {archived: false}});
  },
  'jobs.updateShipper'(id, shipper) {
    Jobs.update({_id: id}, {$set: {shipper: shipper}})
  },
  'jobs.updateConsignee'(id, consignee) {
    Jobs.update({_id: id}, {$set: {consignee: consignee}})
  }
});
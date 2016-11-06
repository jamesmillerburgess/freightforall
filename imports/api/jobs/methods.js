import { Meteor } from 'meteor/meteor';

import { Jobs } from './jobs.js';

Meteor.methods({
  'jobs.addNew'(number) {
    Jobs.insert({number: number});
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
  },
});
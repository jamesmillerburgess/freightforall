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
    Jobs.update({_id: id}, {$set: {shipper: shipper}});
  },
  'jobs.updateConsignee'(id, consignee) {
    Jobs.update({_id: id}, {$set: {consignee: consignee}});
  },
  'jobs.updateOrigin'(id, origin) {
    Jobs.update({_id: id}, {$set: {origin: origin}});
  },
  'jobs.updatePortOfLoading'(id, portOfLoading) {
    Jobs.update({_id: id}, {$set: {portOfLoading: portOfLoading}});
  },
  'jobs.updatePortOfDischarge'(id, portOfDischarge) {
    Jobs.update({_id: id}, {$set: {portOfDischarge: portOfDischarge}});
  },
  'jobs.updateDestination'(id, destination) {
    Jobs.update({_id: id}, {$set: {destination: destination}});
  },
});
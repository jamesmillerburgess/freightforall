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
  'jobs.archive'(jobId) {
    Jobs.update({_id: jobId}, {$set: {archived: true}});
  },
  'jobs.unarchive'(jobId) {
    Jobs.update({_id: jobId}, {$set: {archived: false}});
  },
  'jobs.updateShipper'(jobId, shipper) {
    Jobs.update({_id: jobId}, {$set: {shipper: shipper}});
  },
  'jobs.updateConsignee'(jobId, consignee) {
    Jobs.update({_id: jobId}, {$set: {consignee: consignee}});
  },
  'jobs.updateOrigin'(jobId, origin) {
    Jobs.update({_id: jobId}, {$set: {origin: origin}});
  },
  'jobs.updatePortOfLoading'(jobId, portOfLoading) {
    Jobs.update({_id: jobId}, {$set: {portOfLoading: portOfLoading}});
  },
  'jobs.updatePortOfDischarge'(jobId, portOfDischarge) {
    Jobs.update({_id: jobId}, {$set: {portOfDischarge: portOfDischarge}});
  },
  'jobs.updateDestination'(jobId, destination) {
    Jobs.update({_id: jobId}, {$set: {destination: destination}});
  },
  'jobs.addContainer'(jobId) {
    const job = Jobs.findOne({_id: jobId});

    if (!job.cargo) {
      Jobs.update({_id: jobId}, {$set: {cargo: {containers: [{number: 'UNIT001'}]}}});
    } else if (!job.cargo.containers) {
      Jobs.update({_id: jobId}, {$set: {'cargo.containers': [{number: 'UNIT001'}]}});
    } else {
      const numContainers = job.cargo.containers.length + 1;
      let unitNumber = 'UNIT';
      if (numContainers < 100) {
        unitNumber += '0';
      }
      if (numContainers < 10) {
        unitNumber += '0';
      }
      unitNumber += numContainers;
      Jobs.update({_id: jobId}, {$push: {'cargo.containers': {number: unitNumber}}});
    }
  },
  'jobs.addPackage'(jobId, containerIndex) {
    const job = Jobs.findOne({_id: jobId});

    if (!job.cargo || !job.cargo.containers || job.cargo.containers.length < containerIndex) {
      return;
    }

    const containerField = 'cargo.containers.' + containerIndex + '.packages';

    if (!job.cargo.containers[containerIndex].packages) {
      Jobs.update({_id: jobId}, {$set: {[containerField]: [{description: 'PKG001'}]}});
    } else {

      // Build default package description
      const numPackages = job.cargo.containers[containerIndex].packages.length + 1;

      let packageNumber = 'PKG';
      if (numPackages < 100) {
        packageNumber += '0';
      }
      if (numPackages < 10) {
        packageNumber += '0';
      }
      packageNumber += numPackages;
      Jobs.update({_id: jobId}, {$push: {[containerField]: {description: packageNumber}}})
    }
  },
});
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
  'jobs.updateFields'(jobId, fields) {

    // Check the parameters
    check(jobId, String);
    check(fields, Object);

    // Build the query
    const query = {_id: jobId};

    // Build the update object
    let update = {$set: {}};
    if (fields.shipper) {
      update.$set.shipper = fields.shipper;
    }
    if (fields.consignee) {
      update.$set.consignee = fields.consignee;
    }
    if (fields.origin) {
      update.$set.origin = fields.origin;
    }
    if (fields.portOfLoading) {
      update.$set.portOfLoading = fields.portOfLoading;
    }
    if (fields.portOfDischarge) {
      update.$set.portOfDischarge = fields.portOfDischarge;
    }
    if (fields.destination) {
      update.$set.destination = fields.destination;
    }

    // Update the job
    Jobs.update(query, update);

    // Update search
    // TODO: Do this with only one database call
    const job = Jobs.findOne(query);
    update = {
      $set: {
        search: job.number + ' ' +
        job.shipper + ' ' +
        job.consignee + ' ' +
        job.origin + ' ' +
        job.destination + ' '
      }
    };

    Jobs.update(query, update);
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
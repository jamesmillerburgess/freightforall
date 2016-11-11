import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Jobs } from './jobs.js';

Meteor.methods({
  'jobs.addNew'(nextJobNumber) {

    // Check the parameters
    check(nextJobNumber, Number);

    // Make sure the user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Build the job
    const job = {creator: this.userId, number: nextJobNumber};

    Jobs.insert(job);
  },
  'jobs.archive'(jobId) {

    // Check the parameters
    check(jobId, String);

    // Build the query
    const query = {_id: jobId};

    // Build the update
    const update = {$set: {archived: true}};

    // Update the record
    Jobs.update(query, update);
  },
  'jobs.unarchive'(jobId) {

    // Check the parameters
    check(jobId, String);

    // Build the query
    const query = {_id: jobId};

    // Build the update
    const update = {$set: {archived: false}};

    // Update the record
    Jobs.update(query, update);
  },
  'jobs.updateField'(jobId, path = '', field, value) {

    // Check the parameters
    check(jobId, String);
    check(field, String);

    // Build the query
    const query = {_id: jobId};

    // Build the update
    if (!path) {
      path = field;
    } else {
      path += '.' + field;
    }
    let update = {$set: {[path]: value}};

    // Update the job
    Jobs.update(query, update);
  },
  'jobs.updateFields'(jobId, fields) {

    // Check the parameters
    check(jobId, String);
    check(fields, Object);

    // Build the query
    const query = {_id: jobId};

    // Build the update
    let update = {$set: {}};
    if (fields.hasOwnProperty('shipper')) {
      update.$set.shipper = fields.shipper;
    }
    if (fields.hasOwnProperty('consignee')) {
      update.$set.consignee = fields.consignee;
    }
    if (fields.hasOwnProperty('origin')) {
      update.$set.origin = fields.origin;
    }
    if (fields.hasOwnProperty('portOfLoading')) {
      update.$set.portOfLoading = fields.portOfLoading;
    }
    if (fields.hasOwnProperty('portOfDischarge')) {
      update.$set.portOfDischarge = fields.portOfDischarge;
    }
    if (fields.hasOwnProperty('destination')) {
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

    // Check the parameters
    check(jobId, String);

    // Build the query
    const query = {_id: jobId};

    // Find the job
    const job = Jobs.findOne(query);

    // Deal with missing property cases
    if (!job.cargo) {

      // If no cargo property, then set it
      const update = {$set: {cargo: {containers: [{number: 'UNIT001'}]}}};
      Jobs.update(query, update);
    } else if (!job.cargo.containers) {

      // If no containers property, then set it
      const update = {$set: {'cargo.containers': [{number: 'UNIT001'}]}};
      Jobs.update(query, update);
    } else {
      // If we have all properties then push a new unit with a default unit number

      // Build the default unit number
      let unitNumber = 'UNIT';
      const numContainers = job.cargo.containers.length + 1;

      // Handle '0' characters
      if (numContainers < 100) {
        unitNumber += '0';
      }
      if (numContainers < 10) {
        unitNumber += '0';
      }
      unitNumber += numContainers;

      const update = {$push: {'cargo.containers': {number: unitNumber}}};
      Jobs.update(query, update);
    }
  },
  'jobs.updateContainer'(jobId, containerIndex, fields) {

    // Check the parameters
    check(jobId, String);
    check(containerIndex, Number);
    check(fields, Object);

    // Build the query
    const query = {_id: jobId};

    // Build the update
    const containerPath = 'cargo.containers.' + containerIndex;
    let update = {$set: {}};
    if (fields.hasOwnProperty('number')) {
      update.$set[containerPath+'.number'] = fields.number;
    }
    if (fields.hasOwnProperty('type')) {
      update.$set[containerPath+'.type'] = fields.type;
    }
    if (fields.hasOwnProperty('numPackages')) {
      update.$set[containerPath+'.numPackages'] = fields.numPackages;
    }
    if (fields.hasOwnProperty('packageType')) {
      update.$set[containerPath+'.packageType'] = fields.packageType;
    }
    if (fields.hasOwnProperty('grossWeight')) {
      update.$set[containerPath+'.grossWeight'] = fields.grossWeight;
    }
    if (fields.hasOwnProperty('volume')) {
      update.$set[containerPath+'.volume'] = fields.volume;
    }

    // Update the job
    Jobs.update(query, update);
  },
  'jobs.addPackage'(jobId, containerIndex) {

    // Check the parameters
    check(jobId, String);
    check(containerIndex, Number);

    // Build the query
    const query = {_id: jobId};

    // Find the job
    const job = Jobs.findOne(query);

    // Nothing to update if there are no containers
    if (!job.cargo || !job.cargo.containers || job.cargo.containers.length < containerIndex) {
      return;
    }

    // Build the path to the packages
    const packagesPath = 'cargo.containers.' + containerIndex + '.packages';

    if (!job.cargo.containers[containerIndex].packages) {
      Jobs.update(query, {$set: {[packagesPath]: [{description: 'PKG001'}]}});
    } else {

      // Build default package description
      let packageNumber = 'PKG';
      const numPackages = job.cargo.containers[containerIndex].packages.length + 1;

      // Handle '0' characters
      if (numPackages < 100) {
        packageNumber += '0';
      }
      if (numPackages < 10) {
        packageNumber += '0';
      }
      packageNumber += numPackages;

      // Update the job
      Jobs.update(query, {$push: {[packagesPath]: {description: packageNumber}}})
    }
  },
  'jobs.updatePackage'(jobId, containerIndex, packageIndex, fields) {

    // Check the parameters
    check(jobId, String);
    check(containerIndex, Number);
    check(packageIndex, Number);
    check(fields, Object);

    // Build the query
    const query = {_id: jobId};

    // Build the update
    const path = 'cargo.containers.' + containerIndex + '.packages.' + packageIndex;
    let update = {$set: {}};
    if (fields.hasOwnProperty('description')) {
      update.$set[path+'.description'] = fields.description;
    }
    if (fields.hasOwnProperty('numPackages')) {
      update.$set[path+'.numPackages'] = fields.numPackages;
    }
    if (fields.hasOwnProperty('packageType')) {
      update.$set[path+'.packageType'] = fields.packageType;
    }
    if (fields.hasOwnProperty('grossWeight')) {
      update.$set[path+'.grossWeight'] = fields.grossWeight;
    }
    if (fields.hasOwnProperty('volume')) {
      update.$set[path+'.volume'] = fields.volume;
    }

    // Update the job
    Jobs.update(query, update);
  },
});
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Jobs } from '../jobs.js';

Meteor.publish('jobs.private', function() {
  return Jobs.find();
});

Meteor.publish('jobs.search', function(filter) {
  if (!filter) {
    return;
  }
  return Jobs.find({ search: {$regex: filter, $options: 'i'} }, {limit: 10});
});

// Necessary if the job is already subscribed in the sidebar?
Meteor.publish('job', function job(params) {
  new SimpleSchema({
    number: {type: String},
  }).validate(params);

  const {number} = params;
  return Jobs.find({number: +number});
});
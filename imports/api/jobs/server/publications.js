import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Jobs } from '../jobs.js';

Meteor.publish('jobs.private', function jobsPrivate() {
  //if (!this.userId) {
  //  return this.ready();
  //}

  return Jobs.find();
});

// Necessary if the job is already subscribed in the sidebar?
Meteor.publish('job', function job(params) {
  new SimpleSchema({
    number: { type: String },
  }).validate(params);

  const { number } = params;
  return Jobs.find({ number: +number });

});
import { Meteor } from 'meteor/meteor';

import { Jobs } from './jobs.js';

Meteor.methods({
  'jobs.addNew'() {
    const lastJob = Jobs.findOne({}, {sort: { number: -1}});
    Jobs.insert({number: lastJob.number + 1});
  }
});
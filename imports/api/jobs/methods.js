import { Meteor } from 'meteor/meteor';

import { Jobs } from './jobs.js';

Meteor.methods({
  'jobs.addNew'() {
    console.log('add new!');
    const lastJob = Jobs.findOne({}, {sort: { number: -1}});
    console.log(lastJob);
    Jobs.insert({number: lastJob.number + 1});
  }
});
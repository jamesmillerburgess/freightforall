import { Meteor } from 'meteor/meteor';

import { Jobs } from './jobs.js';

Meteor.methods({
  'jobs.addNew'() {
    console.log('add new!');
    Jobs.insert({number: 19});
  }
});
import { Meteor } from 'meteor/meteor';

import { Jobs } from './jobs.js';

Meteor.methods({
  'jobs.addNew'(number) {
    Jobs.insert({number: number});
  }
});
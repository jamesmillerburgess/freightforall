import { Meteor } from 'meteor/meteor';

import { Jobs } from '../jobs.js';

Meteor.publish('jobs.private', function jobsPrivate() {
  //if (!this.userId) {
  //  return this.ready();
  //}

  return Jobs.find({
    //userId: this.userId,
  });
});
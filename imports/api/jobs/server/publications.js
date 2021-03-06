import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Jobs } from '../jobs.js';

Meteor.publish('jobs.private', function () {
  if (this.userId) {
    return Jobs.find({ creator: this.userId });
  }
});

Meteor.publish('jobs.search', function (filter) {
  if (!filter) {
    return;
  }

  if (this.userId) {
    return Jobs.find({
        creator: this.userId,
        search: { $regex: filter, $options: 'i' },
      },
      { limit: 10 });
  }
});

// Necessary if the job is already subscribed in the sidebar?
Meteor.publish('job', function job(params) {
  if (this.userId) {
    new SimpleSchema({
      number: { type: String },
    }).validate(params);

    const { number } = params;
    return Jobs.find({ userId: this.userId, number: +number });
  }
});

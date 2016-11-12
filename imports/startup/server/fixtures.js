import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/jobs/jobs.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Jobs.find().count() === 0) {
    Jobs.remove({});
    Jobs._ensureIndex({ search: 1 });
  }
});

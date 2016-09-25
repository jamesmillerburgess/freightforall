import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/jobs/jobs.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Jobs.find().count() !== -1) {
    Jobs.remove({});

    const data = [
      {
        number: 1,
        shipper: 'Presspart Engineering Ltd',
        numContainers: 2,
        originLocation: 'GBFXT',
        destinationLocation: 'INNSA'
      },
      {
        number: 2,
        shipper: 'AIA Engineering Ltd',
        numContainers: 1,
        originLocation: 'INNSA',
        destinationLocation: 'GBFXT'
      },
      {
        number: 3,
        shipper: 'Banana Enterprises',
        numContainers: 35,
        originLocation: 'DEDUS',
        destinationLocation: 'USNYC'
      },
      {
        number: 4,
        shipper: 'Siemens',
        numContainers: 3,
        originLocation: 'DEMUN',
        destinationLocation: 'CNSNG'
      },
      {
        number: 5,
        shipper: 'Microsoft Corporation',
        numContainers: 1,
        originLocation: 'USPRT',
        destinationLocation: 'JPTKY'
      },
    ];

    data.forEach((job) => {
      Jobs.insert({
        number: job.number,
        shipper: job.shipper,
        numContainers: job.numContainers,
        originLocation: job.originLocation,
        destinationLocation: job.destinationLocation
      });

    });
  }
});
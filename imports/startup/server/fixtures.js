import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/jobs/jobs.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Jobs.find().count() !== -1) {
    Jobs.remove({});

    const data = [
      {
        number: 5,
        shipper: 'Presspart Manufacturing Ltd',
        consignee: 'AIA Engineering Ltd',
        numContainers: 2,
        origin: {
          name: 'London',
          code: 'GBLON'
        },
        portOfLoading: {
          name: 'Felixstowe',
          code: 'GBFXT'
        },
        portOfDischarge: {
          name: 'Nhava Sheva',
          code: 'INNSA'
        },
        destination: {
          name: 'Mumbai',
          code: 'INBOM'
        },
        cargo: {
          containers: [
            {
              number: 'MSCU1234566',
              type: '40HC',
              numPackages: 20,
              packageType: 'pallet',
              grossWeight: 2000,
              volume: 20,
              packages: [
                {
                  description: "Bibles, hard bound. Really heavy, so please handle with care, etc. etc.",
                  numPackages: 10,
                  packageType: 'pallet',
                  grossWeight: 1000,
                  volume: 10
                },
                {
                  description: "Bibles, soft bound",
                  numPackages: 10,
                  packageType: 'pallet',
                  grossWeight: 1000,
                  volume: 10
                }
              ]
            },
            {
              number: 'MSCU2345672',
              type: '45HC',
              numPackages: 1,
              packageType: 'pallet',
              grossWeight: 50,
              volume: 1,
              packages: []
            }
          ]
        }
      },
      {
        number: 4,
        archived: true,
        shipper: 'AIA Engineering Ltd',
        consignee: 'Hello Bibles Inc',
        numContainers: 1,
        origin: {
          name: 'Nhava Sheva',
          code: 'INNSA'
        },
        destination: {
          name: 'Felixstowe',
          code: 'GBFXT'
        },
      },
      {
        number: 3,
        shipper: 'Banana Enterprises',
        consignee: 'Strawberry Fields',
        numContainers: 35,
        originLocation: 'DEDUS',
        destinationLocation: 'USNYC'
      },
      {
        number: 2,
        shipper: 'Siemens',
        consignee: 'Nokia Corp',
        numContainers: 3,
        originLocation: 'DEMUN',
        destinationLocation: 'CNSNG'
      },
      {
        number: 1,
        shipper: 'Microsoft Corporation',
        consignee: 'Apple Computer',
        numContainers: 1,
        originLocation: 'USPRT',
        destinationLocation: 'JPTKY'
      },
    ];

    data.forEach((job) => {
      Jobs.insert({
        number: job.number,
        archived: job.archived,
        shipper: job.shipper,
        consignee: job.consignee,
        numContainers: job.numContainers,
        origin: job.origin,
        portOfLoading: job.portOfLoading,
        portOfDischarge: job.portOfDischarge,
        destination: job.destination,
        cargo: job.cargo
      });

    });
  }
});
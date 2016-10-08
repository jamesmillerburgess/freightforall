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
        consignee: 'AIA Engineering Ltd',
        numContainers: 2,
        originLocation: 'London – GBLON',
        portOfLoading: 'Felixstowe – GBFXT',
        portOfDischarge: 'Nhava Sheva – INNSA',
        destinationLocation: 'Mumbai – INBOM',
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
              grossWeight: 50,
              volume: 1,
              packages: []
            }
          ]
        }
      },
      {
        number: 2,
        shipper: 'AIA Engineering Ltd',
        consignee: 'Hello Bibles Inc',
        numContainers: 1,
        originLocation: 'INNSA',
        destinationLocation: 'GBFXT'
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
        number: 4,
        shipper: 'Siemens',
        consignee: 'Nokia Corp',
        numContainers: 3,
        originLocation: 'DEMUN',
        destinationLocation: 'CNSNG'
      },
      {
        number: 5,
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
        shipper: job.shipper,
        consignee: job.consignee,
        numContainers: job.numContainers,
        originLocation: job.originLocation,
        portOfLoading: job.portOfLoading,
        portOfDischarge: job.portOfDischarge,
        destinationLocation: job.destinationLocation,
        cargo: job.cargo
      });

    });
  }
});
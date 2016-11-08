import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';

import { Jobs } from '../../api/jobs/jobs.js';

import './navbar.html';

Template.Navbar.onCreated(function navBarOnCreated() {
});

Template.Navbar.events({
  'click #add-job'() {
    const lastJob = Jobs.findOne({}, {sort: {number: -1}});

    let nextJobNumber = 1;
    if (lastJob) {
      nextJobNumber = (lastJob.number + 1) || 1;
    }

    Meteor.call('jobs.addNew', nextJobNumber);

    FlowRouter.go('/job/' + nextJobNumber)
  }
});
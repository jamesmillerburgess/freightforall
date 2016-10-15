import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Jobs } from '../../api/jobs/jobs.js';

import './navbar.html';

Template.Navbar.events({
  'click #add-job'() {
    const lastJobNumber = Jobs.findOne({}, {sort: { number: -1}}).number + 1;
    Meteor.call('jobs.addNew', lastJobNumber, () => FlowRouter.go('/job/' + lastJobNumber));
  }
});
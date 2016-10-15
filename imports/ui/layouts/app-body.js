import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Jobs } from '../../api/jobs/jobs.js';

import './text-formatters.js';
import './app-body.html';

Meteor.startup(() => {});

Template.App_body.onCreated(function appBodyOnCreated() {
  this.subscribe('jobs.private');
});

Template.App_body.helpers({
  Jobs() { return Jobs.find({}, {sort: {number: -1}}); }
});
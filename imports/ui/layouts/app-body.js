import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

import { Jobs } from '../../api/jobs/jobs.js';

import './text-formatters.js';
import './app-body.html';

Meteor.startup(() => {
});

Template.App_body.onCreated(function appBodyOnCreated() {
  Session.set('showArchivedJobs', false);
  this.subscribe('jobs.private');
});

Template.App_body.helpers({
  Jobs() {
    return Jobs.find({ archived: { $ne: true } }, { sort: { number: -1 } });
  },
  ArchivedJobs() {
    return Jobs.find({ archived: true }, { sort: { number: -1 } });
  },
  showArchivedJobs() {
    return Session.get('showArchivedJobs');
  }
});

Template.App_body.events({
  'click .show-archived-link'() {
    Session.set('showArchivedJobs', true);
  },
  'click .hide-archived-link'() {
    Session.set('showArchivedJobs', false);
  }
});

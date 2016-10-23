import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Jobs } from '../../api/jobs/jobs.js';

import './text-formatters.js';
import './app-body.html';

Meteor.startup(() => {
});

Template.App_body.onCreated(function appBodyOnCreated() {
  // Don't show archived jobs
  Session.set('showArchivedJobs', false);

  // Subscribe to my jobs
  this.subscribe('jobs.private');

  // Set up search filter to re-subscribe on edit of the session variable
  let self = this;
  Session.set('searchFilter', '');
  this.autorun(() => {
    if (Session.get('searchFilter')) {
      self.subscribe('jobs.search', Session.get('searchFilter'));
    }
  });
});

Template.App_body.helpers({
  Jobs() {
    return Jobs.find({archived: {$ne: true}}, {sort: {number: -1}});
  },
  FilteredJobs() {
    if (!Session.get('searchFilter'))
      return;
    // Search with the filter
    let cursor = Jobs.find(
      {
        search: {
          $regex: Session.get('searchFilter'),
          $options: 'i'
        }
      },
      {
        limit: 10
      });
    Session.set('numSearchResults', cursor.count());
    return cursor;
  },
  ArchivedJobs() {
    return Jobs.find({archived: true}, {sort: {number: -1}});
  },
  showArchivedJobs() {
    return Session.get('showArchivedJobs');
  },
  searching() {
    return Session.get('searchInput');
  },
  noSearchResults() {
    return Session.get('numSearchResults') === 0;
  }
})
;

Template.App_body.events({
  'click .show-archived-link'() {
    Session.set('showArchivedJobs', true);
  },
  'click .hide-archived-link'() {
    Session.set('showArchivedJobs', false);
  },
  'input .sidebar-search'(e) {
    Session.set('searchInput', e.target.value);

    const words = e.target.value.split(' ');
    Session.set('searchTokens', words);

    let searchFilter = '^';
    for (let w in words) {
      searchFilter += '(?=.*' + words[w] + ')';
    }
    searchFilter += '.+';
    Session.set('searchFilter', searchFilter);
  }
});

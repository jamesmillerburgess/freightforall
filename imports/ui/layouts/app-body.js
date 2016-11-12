import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Jobs } from '../../api/jobs/jobs.js';

import './text-formatters.js';
import './app-body.html';

Template.App_body.onCreated(function appBodyOnCreated() {

  // Don't show archived jobs
  Session.set('showArchivedJobs', false);

  // Subscribe to my jobs
  this.subscribe('jobs.private');

  // Set up search filter to re-subscribe on edit of the session variable
  let self = this;
  Session.set('searchFilter', '');
  Session.set('searchInput', '');
  this.autorun(() => {
    if (Session.get('searchFilter')) {
      self.subscribe('jobs.search', Session.get('searchFilter'));
    }
  });
});

Template.App_body.helpers({
  activeJobs() {
    return Jobs.find({archived: {$ne: true}}, {sort: {number: -1}});
  },
  filteredJobs() {
    if (!Session.get('searchFilter'))
      return;

    // Search with the filter
    let cursor = Jobs.find(
      {search: {$regex: Session.get('searchFilter'), $options: 'gi'}},
      {limit: 10}
    );
    return cursor;
  },
  archivedJobs() {
    return Jobs.find({archived: true}, {sort: {number: -1}});
  },
  showArchivedJobs() {
    return Session.get('showArchivedJobs');
  },
  searching() {
    return Session.get('searchInput');
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
    // Store the input value
    Session.set('searchInput', e.target.value);

    // Pure tokens for use in formatting
    const words = e.target.value.split(' ');
    Session.set('searchTokens', words);

    // Build regex
    let searchFilter = '^';
    for (let w in words) {
      searchFilter += '(?=.*' + words[w] + ')';
    }
    searchFilter += '.+';
    Session.set('searchFilter', searchFilter);
  }
});
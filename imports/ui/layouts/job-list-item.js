import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './job-list-item.html';

Template.JobListItem.helpers({
  isActive() {
    return FlowRouter.getParam('_id') == this.job.number
  },
  numContainers() {
    if (this.job.cargo && this.job.cargo.containers)
      return this.job.cargo.containers.length;
    return 0;
  },
  archivedClass() {
    if (this.job.archived) {
      return 'archived';
    }
  },
  isArchived() {
    return this.job.archived || false;
  }
});

Template.JobListItem.events({
  'click .archive-icon'(e) {
    e.preventDefault();
    Meteor.call('jobs.archive', this.job._id);
  },
  'click .unarchive-icon'(e) {
    e.preventDefault();
    Meteor.call('jobs.unarchive', this.job._id);
  },
  'click a'(e) {
    e.preventDefault();
    FlowRouter.go('Job.show', {_id: this.job.number});
  }
});
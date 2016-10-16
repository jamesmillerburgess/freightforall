import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './job-list-item.html';

Template.JobListItem.helpers({
  isActive() { return FlowRouter.getParam('_id') == this.job.number },
  numContainers() {
    if (this.job.cargo && this.job.cargo.containers)
      return this.job.cargo.containers.length;
    return 0;
  },
  archivedClass() {
    console.log(this.job);
    if (this.job.archived) {
      return 'archived';
    }
  }
});
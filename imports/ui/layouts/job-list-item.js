import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Jobs } from '../../api/jobs/jobs.js';

import './job-list-item.html';

Template.JobListItem.helpers({
  isActive() { return FlowRouter.getParam('_id') == this.job.number }
});
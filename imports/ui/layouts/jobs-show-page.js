import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Jobs } from '../../api/jobs/jobs.js';

import { listRenderHold } from '../launch-screen.js';
import './jobs-show-page.html';

Template.Jobs_showPage.onCreated(function jobsShowPageOnCreated() {
  this.getNumber = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('job', { number: this.getNumber() });
  });
});

Template.Jobs_showPage.onRendered(function jobsShowPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      listRenderHold.release();
    }
  });
});

Template.Jobs_showPage.helpers({
  job() {
    const instance = Template.instance();
    const number = instance.getNumber();
    return Jobs.findOne({ number: +number });
  }
});
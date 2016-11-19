import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BillOfLading } from '../../api/documents/bill-of-lading.js';

import { Jobs } from '../../api/jobs/jobs.js';

import { listRenderHold } from '../launch-screen.js';

import './job-main.html';

Template.Jobs_showPage.onCreated(function onCreated() {
  this.autorun(() => {
    var postNumber = FlowRouter.getParam('_id');
    this.subscribe('job', { number: postNumber });
  });
});

Template.Jobs_showPage.onRendered(function onRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      listRenderHold.release();
    }
  });
});

Template.Jobs_showPage.helpers({
  job() {
    const postNumber = FlowRouter.getParam('_id');
    return Jobs.findOne({ number: +postNumber } || {});
  },

  containerPath(index) {
    return 'cargo.containers.' + index;
  },

  blTypes() {
    return ['WAYBILL', 'ORIGINAL'];
  }
});

Template.Jobs_showPage.events({
  'click .add-container-button'() {
    Meteor.call('jobs.addContainer', this._id);
  },

  'click .print-icon'() {
    BillOfLading(this, url => {
      $('.print-preview').attr('src', url);
    });
  },
});

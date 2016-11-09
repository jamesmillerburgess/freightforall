import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Jobs } from '../../api/jobs/jobs.js';

import { listRenderHold } from '../launch-screen.js';
import './job-main.html';

Template.Jobs_showPage.onCreated(function jobsShowPageOnCreated() {
  this.autorun(() => {
    var postNumber = FlowRouter.getParam('_id');
    this.subscribe('job', {number: postNumber});
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
    var postNumber = FlowRouter.getParam('_id');
    return Jobs.findOne({number: +postNumber} || {});
  },
});

Template.Jobs_showPage.events({
  'keydown .linebreakless'(e) {
    // Save if pressing enter
    if (e.keyCode == 13) {
      e.preventDefault();
      e.target.blur();
    }
  },
  'input .linebreakless'(e) {
    // Resize textarea as needed
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
  },
  'focus textarea'(e) {
    e.target.select();
  },
  'blur #shipper'(e) {
    Meteor.call('jobs.updateFields', this._id, {shipper: e.target.value});
  },
  'blur #consignee'(e) {
    Meteor.call('jobs.updateFields', this._id, {consignee: e.target.value});
  },
  'blur #origin'(e) {
    Meteor.call('jobs.updateFields', this._id, {origin: e.target.value});
  },
  'blur #port-of-loading'(e) {
    Meteor.call('jobs.updateFields', this._id, {portOfLoading: e.target.value});
  },
  'blur #port-of-discharge'(e) {
    Meteor.call('jobs.updateFields', this._id, {portOfDischarge: e.target.value});
  },
  'blur #destination'(e) {
    Meteor.call('jobs.updateFields', this._id, {destination: e.target.value});
  },
  'click #add-container-button'() {
    Meteor.call('jobs.addContainer', this._id);
  },
});
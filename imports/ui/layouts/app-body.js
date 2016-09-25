import { Meteor } from 'meteor/meteor';

import { Jobs } from '../../api/jobs/jobs.js';

import './app-body.html';

Meteor.startup(() => {

});

Template.App_body.onCreated(function appBodyOnCreated() {
  this.subscribe('Jobs.private');
});

Template.App_body.helpers({
  Jobs() { return Jobs.find(); }
});

UI.registerHelper('formatJobNumber', function(context, options) {
  if(context) {
    let jobNumber = context + '';
    let zeroes = '0000000000';
    zeroes= zeroes.slice(0, zeroes.length - jobNumber.length);
    jobNumber = zeroes + jobNumber;
    return jobNumber;
  }
});

UI.registerHelper('formatNumContainers', function(context, options) {
  if(context) {
    let numContainers = context + ' container' + (context == 1 ? '' : 's');
    return numContainers;
  }
});
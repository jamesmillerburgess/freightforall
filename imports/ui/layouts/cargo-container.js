import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './cargo-container.html';

Template.CargoContainer.onCreated(function jobsShowPageOnCreated() {
  this.data.path = 'cargo.containers.' + this.data.containerIndex;
});

Template.CargoContainer.events({
  'click .add-package-button'() {
    Meteor.call('jobs.addPackage', this.job._id, this.containerIndex);
  },
  'blur .container-number'(e) {
    Meteor.call('jobs.updateContainer', this.job._id, this.containerIndex, {number: e.target.value});
  },
  'blur .container-type'(e) {
    Meteor.call('jobs.updateContainer', this.job._id, this.containerIndex, {type: e.target.value});
  },
  'blur .container-num-packages'(e) {
    Meteor.call('jobs.updateContainer', this.job._id, this.containerIndex, {numPackages: e.target.value});
  },
  'blur .container-package-type'(e) {
    Meteor.call('jobs.updateContainer', this.job._id, this.containerIndex, {packageType: e.target.value});
  },
  'blur .container-gross-weight'(e) {
    Meteor.call('jobs.updateContainer', this.job._id, this.containerIndex, {grossWeight: e.target.value});
  },
  'blur .container-volume'(e) {
    Meteor.call('jobs.updateContainer', this.job._id, this.containerIndex, {volume: e.target.value});
  },
});
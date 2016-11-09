import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Jobs } from '../../api/jobs/jobs.js';

import './cargo-container.html';

Template.CargoContainer.events({
  'click .add-package-button'() {
    Meteor.call('jobs.addPackage', this.job._id, this.containerIndex);
  }
});
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './cargo-container.html';
import './cargo-container.less';

Template.CargoContainer.helpers({
  packagePath(index) {
    return this.path + '.packages.' + index;
  },
});

Template.CargoContainer.events({
  'click .add-package-button'() {
    Meteor.call('jobs.addPackage', this.job._id, this.containerIndex);
  },
});

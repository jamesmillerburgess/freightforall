import './cargo-package.html';

Template.CargoContainer.events({
  'blur .package-description'(e) {
    Meteor.call('jobs.updatePackage', this.job._id, this.containerIndex, this.packageIndex, {description: e.target.value});
  },
  'blur .package-num-packages'(e) {
    Meteor.call('jobs.updatePackage', this.job._id, this.containerIndex, this.packageIndex, {numPackages: e.target.value});
  },
  'blur .package-package-type'(e) {
    Meteor.call('jobs.updatePackage', this.job._id, this.containerIndex, this.packageIndex, {packageType: e.target.value});
  },
  'blur .package-gross-weight'(e) {
    Meteor.call('jobs.updatePackage', this.job._id, this.containerIndex, this.packageIndex, {grossWeight: e.target.value});
  },
  'blur .package-volume'(e) {
    Meteor.call('jobs.updatePackage', this.job._id, this.containerIndex, this.packageIndex, {volume: e.target.value});
  },
});
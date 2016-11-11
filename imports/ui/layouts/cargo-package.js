import './cargo-package.html';

Template.CargoContainer.events({
  'blur .package-description'(e) {
    console.log(this);
    Meteor.call('jobs.updatePackage', this.job._id, this.containerIndex, this.packageIndex, {description: e.target.value});
  },
});
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './navbar.html';

Template.Navbar.events({
  'click #add-job'() {
    Meteor.call('jobs.addNew')
  }
});
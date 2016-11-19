import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load templates
import '../../ui/layouts/app-body.js';
import '../../ui/layouts/job-list-item.js';
import '../../ui/layouts/job-main.js';
import '../../ui/layouts/cargo-container.js';
import '../../ui/layouts/cargo-package.js';
import '../../ui/layouts/textarea.js';
import '../../ui/layouts/select.js';
import '../../ui/layouts/navbar.js';
import '../../ui/pages/root-redirector.js';
import '../../ui/pages/app-not-found.js';

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_rootRedirector' });
  },
});

FlowRouter.route('/job/:_id', {
  name: 'Job.show',
  action() {
    BlazeLayout.render('App_body', { content: 'Jobs_showPage' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

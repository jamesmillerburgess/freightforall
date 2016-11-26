import './select.html';
import './select.less';

Template.Select.onRendered(function onRendered() {
  let select = this.find('select');
  select.value = this.data.value;
});

Template.Select.events({
  'change select'(e) {
    const value = this.options[e.target.selectedIndex] || '';
    Meteor.call('jobs.updateField', this.jobId, this.path, this.field, value);
  },
});

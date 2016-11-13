import './elastic-textarea.html';

Template.ElasticTextarea.onRendered(function onRendered() {
  const elem = this.find('textarea');
  elem.style.height = '1px';
  elem.style.height = elem.scrollHeight + 'px';
});

Template.ElasticTextarea.events({
  'keydown textarea'(e) {

    // Save if pressing enter
    if (e.keyCode == 13) {
      e.preventDefault();
      e.target.blur();
    }
  },

  'input textarea'(e) {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  },

  'focus textarea'(e) {

    // Select all text on focus
    e.target.select();
  },

  'blur textarea'(e) {
    const value = e.target.value || '';
    Meteor.call('jobs.updateField', this.jobId, this.path, this.field, value);
  },
});

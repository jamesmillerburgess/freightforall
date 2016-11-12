import './elastic-textarea.html';

Template.ElasticTextarea.onRendered(function onRendered() {
  resize(this.find('textarea'));
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
    resize(e.target);
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

function resize(elem) {
  elem.style.height = '1px';
  elem.style.height = elem.scrollHeight + 'px';
}

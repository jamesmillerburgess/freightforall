import './textarea.html';
import './textarea.less';

Template.Textarea.onRendered(function onRendered() {
  if (!this.data.rows) {
    const elem = this.find('textarea');
    elem.style.height = '1px';
    elem.style.height = elem.scrollHeight + 'px';
  }
});

Template.Textarea.events({
  'keydown textarea'(e) {

    if (!this.rows) {
      // Save if pressing enter
      if (e.keyCode == 13) {
        e.preventDefault();
        e.target.blur();
      }
    }
  },

  'input textarea'(e) {
    if (!this.rows) {
      e.target.style.height = '1px';
      e.target.style.height = e.target.scrollHeight + 'px';
    }
  },

  'focus textarea'(e)
  {

    // Select all text on focus
    e.target.select();
  }
  ,

  'blur textarea'(e)
  {
    const value = e.target.value || '';
    Meteor.call('jobs.updateField', this.jobId, this.path, this.field, value);
  }
  ,
});

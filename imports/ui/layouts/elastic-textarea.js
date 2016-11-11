import './elastic-textarea.html';

Template.ElasticTextarea.onRendered(function elasticTextareaOnRendered() {
  let containerNumber = this.find('textarea');
  containerNumber.style.height = "1px";
  containerNumber.style.height = containerNumber.scrollHeight + "px";
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
    // Resize textarea as needed
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
  },
  'focus textarea'(e) {
    e.target.select();
  },
  'blur textarea'(e) {
    Meteor.call('jobs.updateField', this.jobId, this.path, this.field, e.target.value);
  },
});
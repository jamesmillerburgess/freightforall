UI.registerHelper('formatJobNumber', function (context, options) {
  if (context) {
    let jobNumber = context + '';
    let zeroes = '0000000000';
    zeroes = zeroes.slice(0, zeroes.length - jobNumber.length);
    jobNumber = zeroes + jobNumber;
    return jobNumber;
  }
});

UI.registerHelper('formatNumContainers', function (context, options) {
  if (context) {
    return context + ' container' + (context == 1 ? '' : 's');
  }
});

UI.registerHelper('formatWeight', function (context, options) {
  if (context) {
    return (Math.round(+context * 1000) / 1000).toFixed(3) + ' kg';
  }
});

UI.registerHelper('formatVolume', function (context, options) {
  if (context) {
    return (Math.round(+context * 1000) / 1000).toFixed(3) + ' cbm';
  }
});

UI.registerHelper('formatPackageType', function (context, numPackages) {
  if (context) {
    return context + (numPackages == 1 ? '' : 's');
  }
});
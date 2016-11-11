UI.registerHelper('formatText', function (context) {
  if (!context)
    return;
  let formattedText = context + '';

  // Get the coordinate pairs of the string that need styling applied
  let pairs = [];
  let searchTokens = Session.get('searchTokens');
  for (let t in searchTokens) {
    if (searchTokens[t]) {
      let regex = new RegExp(searchTokens[t], 'gi');
      let result;
      while ((result = regex.exec(formattedText)) !== null) {
        pairs.push([result.index, result.index + searchTokens[t].length])
      }
    }
  }

  // No pairs, no formatting
  if (pairs.length == 0)
    return formattedText;

  // Need to reduce the pairs, because they might overlap and lead us to insert bad HTML
  let count = 0;
  let reduced = [];
  let found = false;
  for (let c = 0; c < formattedText.length; c++) {
    found = false;
    for (let p in pairs) {
      if (c >= pairs[p][0] && c < pairs[p][1]) {
        found = true;
      }
    }
    if (found) {
      count++;
    } else {
      if (count > 0) {
        reduced.push([c - count, c]);
      }
      count = 0;
    }
  }

  // For the case when the end of the string is matched
  if (found) {
    reduced.push([formattedText.length - count, formattedText.length]);
  }

  // Insert the styling
  let offset = 0;
  const openB = '<b>';
  const closeB = '</b>';
  for (let p in reduced) {
    reduced[p][0] += offset;
    reduced[p][1] += offset;
    formattedText =
      formattedText.slice(0, reduced[p][0]) +
      openB +
      formattedText.slice(reduced[p][0], reduced[p][1]) +
      closeB +
      formattedText.slice(reduced[p][1]);

    // Offset calculated because the string gets longer after each tag
    offset += openB.length + closeB.length;
  }

  return formattedText;
});

UI.registerHelper('formatNumContainers', function (context) {
  if (context) {
    return context + ' container' + (context == 1 ? '' : 's');
  }
});

UI.registerHelper('formatWeight', function (context) {
  return context;
  /*
  if (context) {
    return (Math.round(+context * 1000) / 1000).toFixed(3) + ' kg';
  }
  */
});

UI.registerHelper('formatVolume', function (context) {
  return context;
  /*
  if (context) {
    return (Math.round(+context * 1000) / 1000).toFixed(3) + ' cbm';
  }
  */
});

UI.registerHelper('formatPackageType', function (context, numPackages) {
  return context;
  /*
  if (context) {
    return context + (numPackages == 1 ? '' : 's');
  }
  */
});
'use strict';

const concatIntoFile = require('../lib/gulp/concat-into-file.js');
const configuration = require('../lib/gulp/configuration');
const merge = require('merge-stream');
const plugins = require('../lib/gulp/plugins').read();
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);

  let merged = merge();
  let toConcat = config['styles'].concat;

  if(!toConcat || !toConcat.length) {
    return;
  }

  let buildFile = function(file) {
    let src = config.styles.src;

    if(config.styles.concat && config.styles.concat.src) {
      src = config.styles.concat.src;
    }

    let fileStream = gulp.src(src)
      .pipe(tasks['styles'](file.settings, plugins, config))
      .pipe(concatIntoFile(file, plugins, config));

    merged.add(fileStream);
  };

  toConcat.forEach(buildFile);
  return merged;
};

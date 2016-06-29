'use strict';

const _ = require('lodash');
const concatIntoFile = require('../lib/gulp/concat-into-file.js');
const configuration = require('../lib/gulp/configuration');
const merge = require('merge-stream');
const plugins = require('../lib/gulp/plugins').read();
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);

  let merged = merge();
  let toConcat = config['styles'].concat;

  let buildFile = function(file) {
    let src = config.styles.src;
    let filter = file.filter || undefined;
    let union = file.union || undefined;

    src = _.union(src, union);

    let fileStream = gulp.src(src)
      .pipe(plugins.filter(filter))
      .pipe(tasks['styles'](file.settings, plugins, config))
      .pipe(concatIntoFile(file, plugins, config));

    merged.add(fileStream);
  };

  if(!toConcat.length) {
    return merged;
  }

  toConcat.forEach(buildFile);
  return merged;
};

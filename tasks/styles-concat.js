'use strict';

const _ = require('lodash');
const concatIntoFile = require('../lib/gulp/concat-into-file.js');
const configuration = require('../lib/gulp/configuration');
const eventStream = require('event-stream');
const gutil = require('gulp-util');
const plugins = require('../lib/gulp/plugins').read();
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  const config = configuration.merge(configuration.default(), projectArguments.config);
  const toConcat = config['styles'].concat;
  const buildFile = function(file) {
    gutil.log('Concat File:', file.name);

    let src = config.styles.src;
    const filter = file.filter || function() {
      return true;
    };
    const union = file.union || undefined;

    src = _.union(src, union);

    return gulp.src(src)
      .pipe(plugins.filter(filter))
      .pipe(tasks['styles'](file.settings, plugins, config))
      .pipe(concatIntoFile(file, plugins, config));
  };

  const concatStreams = toConcat.map((file) => {
    return buildFile(file);
  });

  if(!toConcat.length) {
    return merged;
  }

  return eventStream.merge(concatStreams);
};

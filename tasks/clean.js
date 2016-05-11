'use strict';

const configuration = require('../lib/gulp/configuration');
const path = require('path');
const plugins = require('../lib/gulp/plugins').read()
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);
  let options = {
    read: false,
  };

  return gulp.src(config.dist_dir, options)
    .pipe(plugins.clean());
};

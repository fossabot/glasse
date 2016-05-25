'use strict';

const configuration = require('../lib/gulp/configuration');
const distDir = require('../lib/gulp/dist-dir');
const plugins = require('../lib/gulp/plugins').read();
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);
  let src = config['scripts'].src;

  return gulp.src(src)
    .pipe(tasks['scripts-lint'](config['scripts'].settings, plugins, config));
};

'use strict';

const configuration = require('../lib/gulp/configuration');
const distDir = require('../lib/gulp/dist-dir');
const plugins = require('../lib/gulp/plugins').read();
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);
  let src = config['styles-lint'].src;

  return gulp.src(src)
    .pipe(tasks['styles-lint'](config['styles-lint'].settings, plugins, config));
};

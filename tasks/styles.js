'use strict';

const configuration = require('../lib/gulp/configuration');
const distDir = require('../lib/gulp/dist-dir');
const plugins = require('../lib/gulp/plugins').read()
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);

  return gulp.src(config['styles'].src)
    .pipe(tasks['styles'](config['styles'].settings, plugins, config))
    .pipe(plugins.flatten())
    .pipe(gulp.dest(distDir(config, 'styles')));
};

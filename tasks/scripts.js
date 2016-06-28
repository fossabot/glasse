'use strict';

const configuration = require('../lib/gulp/configuration');
const distDir = require('../lib/gulp/dist-dir');
const isDevelopment = require('../lib/gulp/is-development');
const plugins = require('../lib/gulp/plugins').read();
const plumber = require('gulp-plumber');
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);

  return gulp.src(config['scripts'].src)
    .pipe(plugins.gulpif(isDevelopment(), plumber()))
    .pipe(tasks['scripts'](config['scripts'].settings, plugins, config))
    .pipe(plugins.flatten())
    .pipe(gulp.dest(distDir(config, 'scripts')));
};

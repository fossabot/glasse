'use strict';

const configuration = require('../lib/gulp/configuration');
const distDir = require('../lib/gulp/dist-dir');
const plugins = require('../lib/gulp/plugins').read()
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);

  return gulp.src(config['svg-sprite'].src)
    .pipe(tasks['svg-sprite'](config['svg-sprite'], plugins, config))
    .pipe(gulp.dest(distDir(config, 'svg-sprite')));
}

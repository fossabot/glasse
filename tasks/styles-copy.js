'use strict';

const configuration = require('../lib/gulp/configuration');
const plugins = require('../lib/gulp/plugins').read()

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);
  
  return gulp.src(config['styles'].additional_style_files)
    .pipe(plugins.flatten())
    .pipe(gulp.dest(config['styles'].additional_style_files_dist_dir));
};

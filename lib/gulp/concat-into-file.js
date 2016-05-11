'use strict';

const gulp = require('gulp');
const lazypipe = require('lazypipe');
const path = require('path');

const buildSettings = require('./build-settings.js');

module.exports = function(file, plugins, config) {
  return lazypipe()
    .pipe(function() {
      let defaults = [
        true,
        {
          file: path.join(config.dist_dir, (file.dist_dir || ''), file.name),
        }
      ];
      let settings = buildSettings('newer', defaults, file.settings);
      return plugins.gulpif(settings[0], plugins.newer(settings[1].file));
    })
    .pipe(function() {
      let defaults = [
        true,
        {
          fileName: file.name,
        }
      ];
      let settings = buildSettings('concat', defaults, file.settings);
      return plugins.gulpif(settings[0], plugins.concat(settings[1].fileName));
    })
    .pipe(function() {
      let dest;

      if(file.dist_dir) {
        dest = path.join(config.dist_dir, file.dist_dir);
      } else {
        dest = path.join(config.dist_dir, plugins.file(config.styles.dist_dir || ''));
      }

      return gulp.dest(dest);
    })();
};

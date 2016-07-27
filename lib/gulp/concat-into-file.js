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
        dest = path.join(config.dist_dir);
      }

      return gulp.dest(dest);
    })();
};

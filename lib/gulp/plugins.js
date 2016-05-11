'use strict';

const readPlugins = () => {
  return require('gulp-load-plugins')({
    rename: {
      'gulp-if': 'gulpif',
      'gulp-svg-sprite': 'svg-sprite',
    }
  });
};

module.exports = {
  read: readPlugins,
};

'use strict';

const babel = require('gulp-babel');
const debug = require('gulp-debug');
const gulp = require('gulp');
const lazypipe = require('lazypipe');
const path = require('path');

const buildSettings = require('../build-settings.js');
const runner = require('../runner.js');

module.exports = function(settings, plugins, config) {
  let sourceMapsDefaults = [
    true,
    {
      init: undefined,
      write: './',
    }
  ];

  return lazypipe()
    .pipe(function() {
      let taskSettings = buildSettings('sourcemaps', sourceMapsDefaults, settings);
      return plugins.gulpif(taskSettings[0], plugins.sourcemaps.init(taskSettings[1]));
    })
    .pipe(function() {
      let babelDefaults = [
        true,
        {
          presets: [
            'es2015',
          ],
          plugins: [
            'transform-es2015-modules-amd',
          ],
        }
      ];

      let taskSettings = buildSettings('babel', babelDefaults, settings);
      return runner('babel', babelDefaults, settings, plugins);
    })
    .pipe(function() {
      let taskSettings = buildSettings('sourcemaps', sourceMapsDefaults, settings);
      return plugins.gulpif(taskSettings[0], plugins.sourcemaps.write(taskSettings[1].write));
    })();
};

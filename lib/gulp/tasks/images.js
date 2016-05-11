'use strict';

const lazypipe = require('lazypipe');
const runner = require('../runner.js');
const buildSettings = require('../build-settings.js');

module.exports = function(settings, plugins, config) {
  return lazypipe()
    .pipe(function() {
      let defaults = [
        true,
        [
          plugins.imagemin.gifsicle({
            interlaced: true,
          }),
          plugins.imagemin.jpegtran({
            progressive: true,
          }),
          plugins.imagemin.optipng({
            optimizationLevel: 5,
          }),
          plugins.imagemin.svgo({
            plugins: [{
              removeViewBox: false,
              cleanupIDs: false,
            }]
          }),
        ],
      ];

      return runner('imagemin', defaults, settings, plugins);
    })();
};

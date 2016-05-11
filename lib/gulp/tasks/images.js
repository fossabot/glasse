'use strict';

const lazypipe = require('lazypipe');
const runner = require('../runner.js');
const buildSettings = require('../build-settings.js');

module.exports = function(settings, plugins, config) {
  return lazypipe()
    .pipe(function() {
      let ext = plugins.imagemin;
      let defaults = [
        true,
        [
          ext.gifsicle(),
          ext.jpegtran(),
          ext.optipng(),
          ext.svgo({
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

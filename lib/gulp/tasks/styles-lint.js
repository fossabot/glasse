'use strict';

const lazypipe = require('lazypipe');
const runner = require('../runner.js');
const buildSettings = require('../build-settings.js');

module.exports = function(settings, plugins, config) {
  return lazypipe()
    .pipe(plugins.debug)
    .pipe(function() {
      let stylintDefaults = [
        true,
        {
          brackets: 'never',
          colons: 'always',
          colors: 'always',
          commaSpace: 'always',
          depthLimit: 4,
          duplicates: true,
          indentPref: 2,
          quotePref: 'single',
          semicolons: 'never',
          sortOrder: 'alphabetical',
          stackedProperties: 'never',
        }
      ];

      let taskSettings = buildSettings('stylint', stylintDefaults, settings);
      return runner('stylint', taskSettings, settings, plugins);
    })();
};

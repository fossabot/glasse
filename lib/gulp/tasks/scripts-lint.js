'use strict';

const lazypipe = require('lazypipe');
const runner = require('../runner.js');
const buildSettings = require('../build-settings.js');

module.exports = function(settings, plugins, config) {
  return lazypipe()
    .pipe(plugins.debug)
    .pipe(function() {
      let eslintDefaults = [
        true,
        {
          envs: [
            'browser',
          ],
          extends: 'defaults/configurations/airbnb/es6',
        }
      ];

      let taskSettings = buildSettings('eslint', eslintDefaults, settings);
      return runner('eslint', taskSettings, settings, plugins);
    })
    .pipe(function() {
      let eslintDefaults = [
        true,
        {
          format: undefined,
        }
      ];

      let taskSettings = buildSettings('eslint', eslintDefaults, settings);
      return plugins.gulpif(taskSettings[0], plugins.eslint.format(taskSettings[1].format));
    })();
};

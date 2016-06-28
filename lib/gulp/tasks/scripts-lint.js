'use strict';

const isDevelopment = require('../is-development');
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
          extends: 'airbnb',
          rules: {
            'no-underscore-dangle': 0,
            'func-names': 0,
            'strict': 0,
            'import/no-unresolved': 0,
            'no-new': 0,
          }
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
      return plugins.gulpif(taskSettings[0], plugins.eslint.formatEach.apply(taskSettings[1].format));
    })
    .pipe(function() {
      return plugins.gulpif(!isDevelopment(), plugins.eslint.failAfterError());
    })();
};

'use strict';

const buildSettings = require('./build-settings.js');

module.exports = function(plugin, defaults, settings, plugins) {
  let taskSettings = buildSettings(plugin, defaults, settings);
  return plugins.gulpif(taskSettings[0], plugins[plugin](taskSettings[1]));
};

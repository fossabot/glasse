'use strict';

const configuration = require('../lib/gulp/configuration');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);

  if(!config.watches.length) {
    return;
  }

  config.watches.forEach(function(task) {
    gulp.watch(task.paths, task.tasks);
  });
};

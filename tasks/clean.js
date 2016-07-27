'use strict';

const configuration = require('../lib/gulp/configuration');
const del = require('del');
const path = require('path');
const plugins = require('../lib/gulp/plugins').read()
const tasks = require('../lib/gulp/tasks');

module.exports = (gulp, projectArguments) => {
  let config = configuration.merge(configuration.default(), projectArguments.config);

  return del([
    path.join(config.dist_dir, '**/*'),
  ])
};

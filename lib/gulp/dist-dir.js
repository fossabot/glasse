'use strict';

const path = require('path');

module.exports = (config, name) => {
  return path.join(config.dist_dir, (config[name].dist_dir || ''));
};

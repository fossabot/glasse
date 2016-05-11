'use strict';

const path = require('path');

module.exports = function(file, ctx) {
  if(file.dist_dir) {
    return path.join(config.dist_dir, file.dist_dir);
  }

  let ctxDistDir = config[ctx].dist_dir;

  return path.join(config.dist_dir, ctxDistDir || '');
};

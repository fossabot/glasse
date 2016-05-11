'use strict';

const _ = require('lodash');
const mergeConfig = (defaultConfig, userConfig) => {
  return _.defaultsDeep(defaultConfig, userConfig);
};
const readDefaultConfig = () => {
  const config = require('../../gulp-config');

  return config || {};
};

module.exports = {
  merge: mergeConfig,
  default: readDefaultConfig,
};

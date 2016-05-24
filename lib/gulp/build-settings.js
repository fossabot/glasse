'use strict';

const _ = require('lodash');

module.exports = function(scope, defaults, set) {
  let settings;

  /* Fail silent, of the scope does not exist */
  if(set && set.hasOwnProperty(scope)) {
    settings = set[scope];
  }

  if(!_.isFunction(settings)) {
    return defaults;
  }

  return _.merge(defaults, settings(process.env));
};

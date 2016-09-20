'use strict';

const lazypipe = require('lazypipe');
const runner = require('../runner.js');

module.exports = function(settings, plugins, config) {
  return lazypipe()
    .pipe(function() {
      let defaults = [
        true,
        {
          mode      : {
            css     : false,
            view    : false,
            defs    : false,
            stack   : false,
            symbol  : {
              dest    : '',
              sprite  : 'symbols.svg'
            }
          },
        },
      ];

      return runner('svg-sprite', defaults, settings, plugins);
    })();
};

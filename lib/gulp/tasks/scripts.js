'use strict';

const debug = require('gulp-debug');
const gulp = require('gulp');
const lazypipe = require('lazypipe');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const buildSettings = require('../build-settings.js');
const runner = require('../runner.js');

module.exports = function(settings, plugins, config) {
  let sourceMapsDefaults = [
    true,
    {
      init: undefined,
      write: './',
    }
  ];

  return lazypipe()
    .pipe(function() {
      let defaults = [
        true,
        {
          init: undefined,
          write: './',
        }
      ];
      let taskSettings = buildSettings('sourcemaps', sourceMapsDefaults, settings);
      return plugins.gulpif(taskSettings[0], plugins.sourcemaps.init(taskSettings[1]));
    })
    .pipe(function() {
      let nodeModulesDir = path.join(__dirname, '../../../..');
      let modulesDir = path.join(__dirname, './scripts/modules/');
      let entryFile = path.join(modulesDir, '..' ,'app.js');

      let taskSettings = buildSettings('webpack', {}, settings);
      let tmpSettings = {
        entry: {
          app: entryFile,
        },

        output: {
          filename: '[name].js'
        },

        resolveLoader: {
          root: nodeModulesDir,
          modulesDirectories: [
            nodeModulesDir,
            modulesDir,
          ],
        },

        resolve: {
          root: [
            modulesDir,
          ],
        },
      };

      if(taskSettings[1].entry) {
        tmpSettings.entry = taskSettings[1].entry;
      }

      if(taskSettings[1].resolveLoader) {
        tmpSettings.resolveLoader = taskSettings[1].resolveLoader;
      }

      if(taskSettings[1].resolve) {
        tmpSettings.resolve = taskSettings[1].resolve;
      }

      if(taskSettings[1].output) {
        tmpSettings.output = taskSettings[1].output;
      }

      let defaults = [
        true,
        {
          entry: tmpSettings.entry,
          output: tmpSettings.output,
          plugins: [
            new webpack.optimize.CommonsChunkPlugin({
              name: 'commons',
              filename: 'commons.js',
              minChunks: 1,
            }),
          ],
          resolveLoader: tmpSettings.resolveLoader,
          resolve: tmpSettings.resolve,
          module: {
            loaders: [
              {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loader: 'babel',
                query: {
                  presets: [
                    'babel-preset-es2015',
                  ].map(require.resolve),
                  plugins: [
                    'babel-plugin-transform-runtime',
                  ].map(require.resolve),
                },
              },
            ],
          },
        },
      ];

      plugins.webpack = webpackStream;
      return runner('webpack', defaults, settings, plugins);
    })
    .pipe(function() {
      let taskSettings = buildSettings('sourcemaps', sourceMapsDefaults, settings);
      return plugins.gulpif(taskSettings[0], plugins.sourcemaps.write(taskSettings[1].write));
    })();
};

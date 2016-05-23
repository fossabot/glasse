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
      let defaults = [
        true,
        {
          entry: {
            app: path.resolve('./scripts/app.js'),
          },

          output: {
            filename: '[name].js'
          },

          plugins: [
            new webpack.optimize.CommonsChunkPlugin({
              name: 'commons',
              filename: 'commons.js',
              minChunks: 2,
            }),
          ],

          resolveLoader: {
            root: nodeModulesDir,
            modulesDirectories: [
              path.resolve('./node_modules/'),
              path.resolve('./scripts/modules/'),
            ],
          },

          resolve: {
            root: [
              path.resolve('./scripts/modules/'),
            ],
          },

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

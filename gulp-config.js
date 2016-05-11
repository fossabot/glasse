'use strict';

let config = {
  dist_dir: './dist/',
  settings: {
    /*

      There is a setting for every gulp module, which got called. The setting
      itself is always a function, receiving the process.env und returning an
      array. First array-item indicates, whether this task is enabled or not,
      the second, the options.

      cssnano: function(env) {
        return [
          !env.development,
          {
            ...
          }
        ];
      },

    */
  },

  styles: {
    dist_dir: 'css/modules',

    src: [
      'vendor/**/*.css',
      'styles/modules/*.styl',
      'styles/layouts/*.styl',
      'styles/base/global.styl',
      'styles/base/fonts.styl',
      'node_modules/normalize.css/*.css',
    ],

    settings: {},
  },

  scripts: {
    dist_dir: 'js/modules',

    src: [
      'vendor/**/*.js',
      'scripts/**/*.js',
    ],

    settings: {},
  },

  images: {
    dist_dir: '/images/',
    src: [
      'images/**/*',
    ],
  },

  fonts: {
    dist_dir: '/fonts/',
    src: [
      'fonts/**/*',
    ],
  },

  'svg-sprite': {
    dist_dir: '/images/',
    src: [
      'images/ui/**/*.svg',
    ],
  },

  watches: [
    {
      tasks: [
        'styles',
      ],
      paths: [
        './styles/**/*',
        './vendor/**/*.css',
      ]
    },
    {
      tasks: [
        'scripts',
      ],
      paths: [
        './scripts/**/*',
      ]
    },

    {
      tasks: [
        'images',
      ],
      paths: [
        './images/**/*',
      ]
    },

    {
      tasks: [
        'fonts',
      ],
      paths: [
        './fonts/**/*',
      ]
    },
  ],
};

module.exports = config;

# Glasse
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faboutsource-test%2Fglasse.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Faboutsource-test%2Fglasse?ref=badge_shield)


Glasse is an installable gulp-asset-pipeline, which provides you some basic
tasks.

## Default Tasks

- **clean** - Cleanup `dist/`.
- **fonts** - Compile and copy fonts.
- **images** - Optimize and copy images.
- **scripts** - Compile and pack the javascript.
- **scripts-concat** - Concat the JavaScript into a single file.
- **scripts-lint** - Lint the JavaScript files.
- **styles** - Compile the CSS.
- **styles-concat** - Concat the CSS into a single file.
- **styles-lint** - Lint the stylus files.
- **svg-sprite** - Build a SVG sprite out of images.

- **watch** - Watches the required paths for changes.

## How to use

Tasks are provided in the recommended `gulp-require-tasks` format.

### Import tasks into your project:

```js
'use strict';

const requireTasks = require('gulp-require-tasks');
const path = require('path');

requireTasks({
  arguments: [
    {
      config: require('./gulp-config'), // see section for gulp-config.js
    }
  ],
  passCallback: false,
  path: path.join(__dirname, '../glasse/tasks'),
});

```

### gulp-config.js

```js
'use strict';

module.exports = {
  dist_dir: './dist/',
  
  styles: {
    dist_dir: 'styles/', /* relative to scope dist_dir */
    src: [
      './assets/styles/*.styl',
    ],
    concat: [
      {
        name: 'concat.css',
        dist_dir: 'styles/build/',
        filter: [
          '**/*', /* filter files from styles.src through gulp-filter */
        ],
        extend: [
          './assets/vendor/framework.styl',
        ]
      }
    ],
  },
  
  scripts: { /* ... */ },
  'scripts-lint': { /* ... */ },
  'styles-lint': { /* ... */ },
  images: { /* ... */ },
  fonts: { /* ... */ },
  'svg-sprite': { /* ... */ },
  
  watches: [
    {
      tasks: [
        'styles',
        /* ... */
      ],
      paths: [
        './assets/styles/**/*',
      ]
    },
    
    /* .. */
  ],
};
```

In addition it's possible to overwrite the asset-pipeline internals:

```js
'use strict';

module.exports = {
  styles: {
    settings: {
      stylus: function(env) {
        return [
          true, /* condition for gulp-if, which decides, whether this task runs or not */
          {
            import: [ /* ... */ ],
          } /* the config passed into the task, EXTENDING the defaults */
        ]
      },
    },
  },
};
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faboutsource-test%2Fglasse.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faboutsource-test%2Fglasse?ref=badge_large)
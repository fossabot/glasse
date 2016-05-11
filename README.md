# Glasse

Glasse is an installable gulp-asset-pipeline, which provides you some basic
tasks.

## Default Tasks

- **clean** - Cleanup `dist/`.
- **fonts** - Compile and copy fonts.
- **images** - Optimize and copy images.
- **scripts** - Compile and pack the javascript.
- **scripts-concat** - Concat the javascript into a single file.
- **styles** - Compile the CSS.
- **styles-concat** - Concat the CSS into a single file.

- **watch** - Watches the required paths for changes.

## How to use

Tasks are provided in the recommended `gulp-require-tasks` format, which
should be bullet-proof for the upcoming `gulp 4`.

That means you can import the tasks like so:

```js
'use strict';

const requireTasks = require('gulp-require-tasks');
const path = require('path');

requireTasks({
  arguments: [
    {
      config: require('./gulp-config'),
    }
  ],
  passCallback: false,
  path: path.join(__dirname, '../glasse/tasks'),
});

```

The provided `config` File carefully extends the defaults.

'use strict';

exports = module.exports = cliHeight;

function normalizeOpts(options) {
  var defaultOpts = {
    defaultHeight: 0,
    output: process.stdout,
    tty: require('tty')
  };

  if (!options) {
    return defaultOpts;
  } else {
    Object.keys(defaultOpts).forEach(function (key) {
      if (!options[key]) {
        options[key] = defaultOpts[key];
      }
    });

    return options;
  }
}

function cliHeight(options) {
  var opts = normalizeOpts(options);

  if (opts.output.getWindowSize) {
    return opts.output.getWindowSize()[1] || opts.defaultHeight;
  } else {
    if (opts.tty.getWindowSize) {
      return opts.tty.getWindowSize()[0] || opts.defaultHeight;
    } else {
      if (opts.output.rows) {
        return opts.output.rows;
      } else {
        if (process.env.CLI_HEIGHT) {
          var height = parseInt(process.env.CLI_HEIGHT, 10);

          if (!isNaN(height) && height !== 0) {
            return height;
          }
        }
      }

      return opts.defaultHeight;
    }
  }
};

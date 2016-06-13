const process = require('process');

const isDevelopment = () => {
  const WPEnvVar = 'WP_ENV';

  return (!process.env[WPEnvVar] ||
          process.env[WPEnvVar] === 'development' ||
          process.env[WPEnvVar] === '');
};

module.exports = isDevelopment;

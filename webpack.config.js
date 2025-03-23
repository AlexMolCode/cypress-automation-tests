const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'cypress'), // maps @ to the cypress folder for all imports
    },
  },
};

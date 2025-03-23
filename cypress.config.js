const { defineConfig } = require('cypress');
const webpack = require('@cypress/webpack-preprocessor');
const webpackConfig = require('./webpack.config.js');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    setupNodeEvents(on, config) {
      
      // Enable Mochawesome for reports
      require('cypress-mochawesome-reporter/plugin')(on);

      // Enable Webpack preprocessor with config from webpack.config.js
      on('file:preprocessor', webpack({ webpackOptions: webpackConfig }));
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true, // Only displays one report per run locally
      html: true,
      json: true,
      charts: true, 
      embeddedScreenshots: true,
      inlineAssets: true  
    }
  },
});

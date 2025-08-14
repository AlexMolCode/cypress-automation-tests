const { defineConfig } = require('cypress');
const webpack = require('@cypress/webpack-preprocessor');
const webpackConfig = require('./webpack.config.js');

const isCI = process.env.CI === 'true';
module.exports = defineConfig({
  projectId: 'in78pu', // Project ID is used for Cypress Cloud
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
      overwrite: false, 
      html: !isCI, // Only generate HTML when generating report locally
      json: true,
      charts: true, 
      embeddedScreenshots: true,
      inlineAssets: true  
    }
  },
});

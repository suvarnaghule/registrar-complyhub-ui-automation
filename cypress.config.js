const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  video:true,
  e2e: {
    baseUrl:'https://monitor.dev.compliancemonitorapi.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here'
      allureWriter(on, config);
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  }
});

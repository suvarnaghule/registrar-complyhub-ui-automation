const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  e2e: {
    baseUrl:'https://monitor.dev.compliancemonitorapi.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

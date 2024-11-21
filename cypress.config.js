const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  video:true,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: "cypress/results/report.xml",
    toConsole: true  
  },  
  e2e: {
    baseUrl:'https://monitor.dev.compliancemonitorapi.com',
    setupNodeEvents(on, config) {
      
      // implement node event listeners here'
     // require('cypress-mochawesome-reporter/plugin')(on);
     // allureWriter(on, config);
  /*   on('before:spec', (spec) => {     
      config.reporter = 'junit';
      config.reporterOptions = {
        mochaFile: `cypress/results/junit-${spec.name}.xml`, 
        toConsole: true,
        overwrite: false
      };
      //console.log(`Running spec file: ${spec.name}`);
      return config;
    }); */   
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  }
});

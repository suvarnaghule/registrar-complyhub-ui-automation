const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  video:true,
  
  /*reporter: 'junit',
  reporterOptions: {
    mochaFile: "cypress/results/report.xml",
    toConsole: true  
  },  */  
  e2e: {
    baseUrl:'https://monitor.dev.compliancemonitorapi.com',
    setupNodeEvents(on, config) {
      
      // implement node event listeners here'
     // require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on, config);
   /* on('before:spec', (spec) => { 
      const resultDir = 'cypress/results';
      const fs = require('fs');
      if (!fs.existsSync(resultDir)) {
        console.log(`Directory ${resultDir} does not exist. Creating...`);
        fs.mkdirSync(resultDir, { recursive: true });
      }    
      config.reporterOptions = {
        mochaFile: `cypress/results/junit-${spec.name.replace('.cy.js', '')}.xml`, 
        toConsole: true
      };
      
      //console.log(`Running spec file: ${spec.name}`);
      console.log('Reporter options:', config.reporterOptions);
      return config;
    });   */  
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  }
});

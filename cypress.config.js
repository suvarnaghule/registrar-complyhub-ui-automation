const { defineConfig } = require("cypress");
const reportDir = process.env.REPORT_DIR || 'cypress/reports/mochawesome-report';
const reportName = process.env.REPORT_NAME || 'TestReport';
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  video:false,
  screenshotsFolder: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: `${reportDir}/${reportName}`, // Report directory based on environment variables
    overwrite: false, // Set to true to overwrite reports on each run
    code: false,
    quiet: true,
    chart:true,
  },
  e2e: {
    baseUrl:'https://monitor.dev.compliancemonitorapi.com',
    setupNodeEvents(on, config) {
      
      // implement node event listeners here'
      require('cypress-mochawesome-reporter/plugin')(on);
    //  allureWriter(on, config);
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

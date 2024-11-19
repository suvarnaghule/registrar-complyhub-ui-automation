
const { defineConfig } = require('cypress');
const mysql = require('mysql')
const reportDir = process.env.REPORT_DIR || 'cypress/reports/mochawesome-report';
const reportName = process.env.REPORT_NAME || 'TestReport';
/// <reference types=“@shelex/cypress-allure-plugin” />
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const pdf = require('pdf-parse');
const fs = require("fs");
const path = require("path");
const nodeXlsx = require('node-xlsx');

module.exports = defineConfig({

  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  projectId: "iya37g",
  //reporter: 'mochawesome',
  reporter: '../node_modules/cypress-mochawesome-reporter',
  video: true,
  reporterOptions: {
    reportDir: `${reportDir}/${reportName}`, // Report directory based on environment variables
    overwrite: false, // Set to true to overwrite reports on each run
    chart:true,
  },
  e2e: {
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
    baseUrl:'https://monitor.dev.compliancemonitorapi.com',
    specPattern:'cypress/e2e/MonitorSuppliers/*.cy.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/grep/src/plugin')(config);
      on('task',
        {         
          queryDb: query => { return queryTestDb(query, config) }, 
          parseXlsx:filePath=>{ return parseXlsx(filePath) }, 
          readPdf:pdfPath=>{ return readPdf(pdfPath)},
          checkLogFileForMessage({baseName,message}) {return checkLogFileForMessage(baseName,message)},
          deleteLogFile() {            
            return deleteLogFile();
          }
        }); 
        allureWriter(on, config);
        return config;
    },
  },
  "env": {
    "db": {
      "host": "db4free.net",
      "user": "mobilestoreuser",
      "password": "mobilestoreuser",
      "database": "mymobilestore"
    },
   url: "https://rcclzidw2m.execute-api.us-east-1.amazonaws.com/dev/reg/auth/fda-monitor-legacy/authorize/",
   facilityUrl: "https://wj8017xak0.execute-api.us-east-1.amazonaws.com/dev",
    "UserName":"FancyFood",
    "UserPassword":"FDANYC"
  }
  
})
function parseXlsx(filePath)
{
 return new Promise((resolve, reject) => {
  try {
    const fullPath = path.resolve(filePath)
    const jsondata = nodeXlsx.parse(fs.readFileSync(fullPath))
    return resolve(jsondata)
  // const jsonData  = nodeXlsx.parse(fs.readFileSync(filePath))
   
    // const wb = xlsx.readFile(args.excelFilePath)
    // const ws = wb.Sheets(args.sheetName)
    // return xlsx.utils.sheet_to_json(wb.Sheets[ws])
   // return resolve(jsonData);
  } catch (e) {
    reject(e);
  }
})
}
function readPdf(pdfPath) 
{
  return new Promise((resolve)=>{
    const filepath=path.resolve(pdfPath)
    const dataBuffer=fs.readFileSync(filepath)
    pdf(dataBuffer).then((data)=>{
      return resolve(data)
    })
  })
} 
function checkLogFileForMessage(baseName,message) {
  const logFilePath = `cypress/logs/${baseName}.log`; 
  const filepath=path.resolve(logFilePath)
  const logContent = fs.readFileSync(filepath, 'utf8'); 
  // Check if the log file contains the specific message
  if (logContent.includes(message)) {
    return true;
  } 
  return false;
} 
function deleteLogFile()
{
  const logFilePath = 'cypress/logs/TestMonitorSupplier.log';
  const filepath=path.resolve(logFilePath)
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);  // Delete the file
    console.log('Log file deleted successfully.');
  } else {
    console.log('Log file does not exist.');
  } 
  return null;  
}    
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
          if (error) reject(error)
          else {
              connection.end()
              return resolve(results)
          }
      })
  })
}
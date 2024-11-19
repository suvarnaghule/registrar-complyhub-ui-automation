// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>

import Login from "../PageClass/CommonPages/Login";
const fs = require("fs");

cy.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent Cypress from failing the test
    return false;
})

Cypress.on('uncaught:exception',(err,runnable)=>{
    return false;
})
Cypress.Commands.add('loginMyFDA', (username, password) => {
    cy.session([username, password], () => {
        const loginObj = new Login()
        // cy.visit('/');
        cy.visit('https://monitor.dev.compliancemonitorapi.com')
        loginObj.userLogin(username, password);
        cy.wait(2000);
        loginObj.verifyLoginSuccess();
        cy.logger('application', "Validated success Login Msg-->Login Test");
    })                                                                                         // { cacheAcrossSpecs: true } 
});

Cypress.Commands.add('logger', (filename, message) => {
    // Define the log file path based on the filename parameter
    const logFilePath = `cypress/logs/${filename}.log`;
  
    // Create or append to the log file
    cy.writeFile(logFilePath, `[${new Date().toISOString()}] ${message}\n`, { flag: 'a+' });
  });
  
  /*Cypress.Commands.add('checkLogFileForMessage', (filename, message) => {  
    const logFilePath = `cypress/logs/${filename}.log`;
    const logContent = fs.readFileSync(logFilePath, 'utf8');     
      // Check if the log file contains the specific message
      return logContent.includes(message);
  });  */
  
Cypress.Commands.add('getToken',(UserName,UserPassword) => {
    const authAPI = Cypress.env('url')+UserName
    const pwd = UserPassword
    cy.request({   
      method : 'GET',
      url: authAPI,
      qs: {createToken:'true' , password: pwd, ts :new Date().getTime()}
    }).then((response) => {       
        const tokenInfo = response.body.data.tokenInfo;
        return tokenInfo;  
    })
})
Cypress.Commands.add("parseXlsx", (inputFile) => {
    return cy.task('parseXlsx', { filePath: inputFile })
    })

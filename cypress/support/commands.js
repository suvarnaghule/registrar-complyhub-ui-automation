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

import Login from "../PageClass/CommonPages/Login";

cy.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent Cypress from failing the test
    return false;
})
Cypress.on('uncaught:exception',(err,runnable)=>{
    return false;
})
Cypress.Commands.add('logger', (filename, message) => {
    // Define the log file path based on the filename parameter
    const logFilePath = `cypress/logs/${filename}.log`; 
    // Create or append to the log file
    cy.writeFile(logFilePath, `[${new Date().toISOString()}] ${message}\n`, { flag: 'a+' });
  });

Cypress.Commands.add('loginMyFDA', () => {
    cy.session([] ,() => {
        const loginObj = new Login()
        // cy.visit('/');
        cy.visit('https://monitor.dev.compliancemonitorapi.com')
        loginObj.userLogin(Cypress.env('UserName'), Cypress.env('UserPassword'));
        cy.wait(2000);
        loginObj.verifyLoginSuccess();
        cy.logger('application', "Validated success Login Msg-->Login Test");
    })                                                                                         // { cacheAcrossSpecs: true } 
});
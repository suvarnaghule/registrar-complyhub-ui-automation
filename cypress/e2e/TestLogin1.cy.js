

import { before } from "mocha";
import Login1 from "../PageClass/Login1";
import '../support/commands';

const startTime = Date.now();
describe('Validate User is Register',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://dev-registrarcorp.myfda.com/');
        cy.logger('application',"Launched Application-->Login Test");
      });
    
   
    it('Verify User is able to login',()=>{

        
        
        cy.fixture('Testdata1').then((registerUserdata) => {
                    const loginobj = new Login1();
                      // loginobj.userLogin(registerUserdata.UserName, registerUserdata.UserPassword);
                       loginobj.setUserName(registerUserdata.UserName);
                       loginobj.setPassword(registerUserdata.UserPassword);
                       cy.logger('application',"Entered User Details-->Login Test");
                       loginobj.clickLoginbtn();
                       loginobj.verifyLoginSuccess();
                       cy.logger('application',"Validated success Login Msg-->Login Test");
                       const loadTime = Date.now() - startTime;
                       cy.logger('performance',`TotalTime taken to LoginUser: ${loadTime}ms`);
           })
        
    })

})
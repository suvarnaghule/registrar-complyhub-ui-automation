

import { before } from "mocha";
import Login1 from "../PageClass/Login1";
import Facility360 from "../PageClass/Facility360";
import '../support/commands';


const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://dev-registrarcorp.myfda.com/');
        cy.logger('application',"Launched Application-->Login Test");
      });
    
   
    it('Verify Facility Details',()=>{

        
        
        cy.fixture('facility360').then((facility360data) => {
                    const loginobj = new Login1();
                       loginobj.userLogin(facility360data.UserName, facility360data.UserPassword);
                       cy.wait(2000);
                       loginobj.verifyLoginSuccess();
                       cy.logger('application',"Validated success Login Msg-->Login Test");
                       const facility360 = new Facility360();
                       facility360.selectFacility360Tab();
                       cy.logger('application',"Redirected to facility360 tab")
                       cy.get('.modal-content > a').click();
                       facility360.selectFacilityFromDD(facility360data.facilityDDText,facility360data.facilityDDValue);
                       cy.logger('application',"Facility selected"+facility360data.facilityDDText)
                       cy.wait(3000);
                       facility360.VerifyFacilityName(facility360data.facilityName)
                       facility360.verifyDUNSNumber(facility360data.DUNSNumber)
                       facility360.VerifyPrimaryContactAddress(facility360data.ContactName,facility360data.ContactEmail,facility360data.ContactPhone)
                       facility360.verifyAbout(facility360data.AboutDetails)
                       const loadTime = Date.now() - startTime;
                       cy.logger('performance',`TotalTime taken to LoginUser: ${loadTime}ms`);
           })
        
    })

})
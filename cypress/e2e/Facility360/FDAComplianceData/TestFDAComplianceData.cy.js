
import Login from "../../../PageClass/CommonPages/Login";
import Facility360 from "../../../PageClass/CommonPages/Facility360";
import Facility360FDACompliance  from "../../../PageClass/Facility360/FDAComplianeData/Facility360FDACompliance"

const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
          cy.visit('https://dev-registrarcorp.myfda.com/');
          cy.logger('application',"Launched Application-->Login Test");
            
      }); 
  it('verify compliance data', ()=>{
    cy.fixture('./Facility360/FDAComplianceData/facility360DFAComplianceData').then((facility360fdacompliance) => {
        const loginobj = new Login();
        loginobj.userLogin(facility360fdacompliance.UserName, facility360fdacompliance.UserPassword);
        cy.wait(3000);
        loginobj.verifyLoginSuccess();
        cy.logger('application',"Validated success Login Msg-->Login Test");
        const facility360 = new Facility360();
        facility360.selectFacility360Tab();
        cy.logger('application',"Redirected to facility360 tab")
        cy.get('.modal-content > a').click();
        facility360.selectFacilityFromDD(facility360fdacompliance.facilityDDText,facility360fdacompliance.facilityDDValue);
        cy.logger('application',"Facility selected"+facility360fdacompliance.facilityDDText)
        const fdaCompliance= new Facility360FDACompliance();
        fdaCompliance.selectFDAComplianceTab();
        cy.logger('application', "FDA Compliance tab is selected");
        fdaCompliance.verifyComplianceDEtails(facility360fdacompliance.Audit,facility360fdacompliance.Inspection,facility360fdacompliance.WarningLetter,facility360fdacompliance.ImportAlert,facility360fdacompliance.ImportRefusal,facility360fdacompliance.Recall);
        cy.logger('application', "Verified FDACompliance Details like Audit, Inspection, warningletter, Importalert, ImportRefusal and Recalls");
    })
  }) 

})
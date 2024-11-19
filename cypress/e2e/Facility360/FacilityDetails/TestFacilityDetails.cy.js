
import Login from "../../../PageClass/CommonPages/Login";
import Facility360 from "../../../PageClass/CommonPages/Facility360";
import Facility360AddNew from "../../../PageClass/Facility360/FacilityDetails/Facility360AddNew";
import Facility360RegiScore from "../../../PageClass/Facility360/FacilityDetails/Facility360RegiScore";
import FDARegistration from "../../../PageClass/Facility360/FacilityDetails/Facility360AddFDARegistration"
import AddNewDoc from "../../../PageClass/Facility360/Documents/MyDocuments/Facility360AddNewDocument"

const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
         cy.visit('https://dev-registrarcorp.myfda.com/');
       // cy.visit('https://monitor.dev.compliancemonitorapi.com/dashboard/login')
         cy.logger('application',"Launched Application-->Login Test");
            
      }); 
      
    it('Verify Basic Facility Details',()=>{        
        
      cy.fixture('./Facility360/CommonFixtures/facility360').then((facility360data) => {
        const loginobj = new Login();
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
        cy.logger('application',"Facility name is verified")
        facility360.verifyDUNSNumber(facility360data.DUNSNumber)
        cy.logger('application',"DUNS number is verified")
        facility360.VerifyPrimaryContactAddress(facility360data.ContactName,facility360data.ContactEmail,facility360data.ContactPhone)
        cy.logger('application',"Primary conatct details are verified")
        facility360.verifyAbout(facility360data.AboutDetails)
        cy.logger('application',"About details are verified")
        const loadTime = Date.now() - startTime;
        cy.logger('performance',`TotalTime taken to LoginUser: ${loadTime}ms`);
           })
        
    })

    it('verify Add Facility with Manually selection',()=>{
      cy.fixture('./Facility360/FacilityDetails/facility360AddNew').then((facility360dataAddNew) => {
           const loginobj = new Login();
           loginobj.userLogin(facility360dataAddNew.UserName, facility360dataAddNew.UserPassword);
           cy.wait(2000);
           loginobj.verifyLoginSuccess();
           cy.logger('application',"Validated success Login Msg-->Login Test");
           const facility360 = new Facility360();
           facility360.selectFacility360Tab();
           cy.logger('application',"Redirected to facility360 tab")
           cy.get('.modal-content > a').click();
           facility360.selectFacilityFromDD(facility360dataAddNew.facilityDDText,facility360dataAddNew.facilityDDValue);
           cy.logger('application',"Facility selected"+facility360dataAddNew.facilityDDText)
           cy.wait(3000);
           const facilityAddNew = new Facility360AddNew();
           facilityAddNew.verifyManualAddFacility(facility360dataAddNew.facilityManualAdd);
           cy.logger('application',"selecting manual add facility")
           facilityAddNew.enterFacilityDetails(facility360dataAddNew.facilityName,facility360dataAddNew.facilityAddressLine1,facility360dataAddNew.facilityCity,facility360dataAddNew.facilityCountryText,facility360dataAddNew.facilityCountryValue);
           cy.logger('application',"User is able to enter all facility details")
           facility360.selectFacility360Tab();
           cy.logger('application',"New facility added successfully")
      })
    })

    it('Verify Facility 360 Regi Score', ()=>{
      cy.fixture('./Facility360/FacilityDetails/facility360regiscore').then((facility360regiscore) => {
        const loginobj = new Login();
        loginobj.userLogin(facility360regiscore.UserName, facility360regiscore.UserPassword);
        cy.wait(1000);
        loginobj.verifyLoginSuccess();
        cy.logger('application',"Validated success Login Msg-->Login Test");
        const facility360 = new Facility360();
        facility360.selectFacility360Tab();
        cy.logger('application',"Redirected to facility360 tab")
        cy.get('.modal-content > a').click();
        facility360.selectFacilityFromDD(facility360regiscore.facilityDDText,facility360regiscore.facilityDDValue);
        cy.logger('application',"Facility selected"+facility360regiscore.facilityDDText)
        const facilityRegiScore = new Facility360RegiScore();
        facilityRegiScore.verifyRegiScorePercentage(facility360regiscore.facilityRegiScorePercentage);
        cy.logger('application',"verfied regiscroe percentage");
        facilityRegiScore.verifyRegiScoreRisk(facility360regiscore.facilityRegiScoreStatus);
        cy.logger('application',"verified regiscore risk level");
        facilityRegiScore.clickOnSeeDetailsBtn(facility360regiscore.facilityRegiSeeDetails);
        cy.logger('application',"User has redirected to regiscore popup");
        facilityRegiScore.verifyRegiScorePopupDetails(facility360regiscore.facilityRegiShipmentLast5Years,facility360regiscore.facilityRegiLastShipment,facility360regiscore.facilityRegiCleared,facility360regiscore.facilityRegiImportAlert,facility360regiscore.facilityRegiRefusedAndDetained,facility360regiscore.facilityRegiWarnings)
        cy.logger('application',"verified regiscore popup details like last 5 year shipment, last shipment,cleared,import alert");
        facilityRegiScore.closethePopup();
        cy.logger('application',"closing the popup");
    })
  })
  it.only('Add FDA registration - Verify that User can add FDA registration',()=>{        
        
    cy.fixture('./Facility360/FacilityDetails/facility360FDARegistration').then((data) => {
      const loginobj = new Login();
      loginobj.userLogin(data.UserName, data.UserPassword);
      cy.wait(2000);
      loginobj.verifyLoginSuccess();
      cy.logger('application',"Validated success Login Msg-->Login Test");
      const facility360 = new Facility360();
      facility360.selectFacility360Tab();
      cy.logger('application',"Redirected to facility360 tab")
      cy.get('.modal-content > a').click();
      facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
      cy.logger('application',"Facility selected"+data.facilityDDText)
      cy.wait(3000);
      const fdaReg = new FDARegistration()
      fdaReg.minimizeFacilityInfoBlock()
      fdaReg.clickOnMonitorFDARegistration()  
      fdaReg.enterdetailsOfReg(data.registrationMethod,data.registrationType,data.registrationEmail,data.regNo,data.regPin)
     /* const addNewDocObj = new AddNewDoc() 
      addNewDocObj.verifyDocIsShared(data.registrationEmail,data.regEmailSub)
      fdaReg.submitRegNoForVerification(data.regNo) */
    })
      
  })
})
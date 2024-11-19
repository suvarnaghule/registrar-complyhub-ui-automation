import Login from "../../../../PageClass/CommonPages/Login"
import Facility360 from "../../../../PageClass/CommonPages/Facility360";
import SmartDM from "../../../../PageClass/Facility360/Documents/SmartDMS/Facility360SmartDM"
import DocumentType from "../../../../PageClass/Facility360/Documents/DocumentTypes/Facility360DocumentType"
import UpdateDocumentType from "../../../../PageClass/Facility360/Documents/DocumentTypes/Facility360UpdateDocumentType"

const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
          cy.visit('https://dev-registrarcorp.myfda.com/');
          cy.logger('application',"Launched Application-->Login Test");
            
      });   
    
it.only('Documents - Document Type tab- Verify that User can create new document type',()=>{
  cy.fixture('./Facility360/Documents/DocumentTypes/facility360DocumentType').then((facility360DocType) => {
    const loginobj = new Login();
    loginobj.userLogin(facility360DocType.UserName,facility360DocType.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(facility360DocType.facilityDDText,facility360DocType.facilityDDValue);
    const smartdm = new SmartDM();
    const docType = new DocumentType()
    smartdm.selectDocumentTab()
    cy.wait(1000)
    docType.selectDocumentTypeTab();
    cy.logger('application',"Document Type tab is selected")
    docType.clickOnNewDocType()
    docType.enterDetails(facility360DocType.data)
   // cy.wait(5000)
   // docType.searchDocumentType(facility360DocType.data.Name)
   // docType.verifyNewDocType(facility360DocType.data)    
})
})
it('Documents - Document Type tab- update new document type created',()=>{
    cy.fixture('./Facility360/Documents/DocumentTypes/facility360DocumentType').then((facility360DocType) => {
      const loginobj = new Login();
      loginobj.userLogin(facility360DocType.UserName,facility360DocType.UserPassword);
      cy.wait(2000);
      loginobj.verifyLoginSuccess();
      cy.logger('application',"Validated success Login Msg-->Login Test");
      const facility360 = new Facility360();
      facility360.selectFacility360Tab();
      cy.logger('application',"Redirected to facility360 tab")
      cy.get('.modal-content > a').click();
      facility360.selectFacilityFromDD(facility360DocType.facilityDDText,facility360DocType.facilityDDValue);
      const smartdm = new SmartDM();
      const docType = new DocumentType()
      smartdm.selectDocumentTab()
      docType.selectDocumentTypeTab();
      cy.logger('application',"Document Type tab is selected")
      docType.searchDocumentType(facility360DocType.data.Name)
     /* docType.verifyNewDocType(facility360DocType.data)   
      const updateDocType = new UpdateDocumentType();             
      updateDocType.clickOnUpdateDocBtn()
      updateDocType.EnterData(facility360DocType.updateData)
      cy.wait(5000)
      docType.searchDocumentType(facility360DocType.updateData.Name)
      docType.verifyNewDocType(facility360DocType.updateData)    */           
  })
  })
  it('Documents - Document Type tab- download file attachment for document type ',()=>{
    cy.fixture('./Facility360/Documents/DocumentTypes/facility360DocumentType').then((facility360DocType) => {
      const loginobj = new Login();
      loginobj.userLogin(facility360DocType.UserName,facility360DocType.UserPassword);
      cy.wait(2000);
      loginobj.verifyLoginSuccess();
      cy.logger('application',"Validated success Login Msg-->Login Test");
      const facility360 = new Facility360();
      facility360.selectFacility360Tab();
      cy.logger('application',"Redirected to facility360 tab")
      cy.get('.modal-content > a').click();
      facility360.selectFacilityFromDD(facility360DocType.facilityDDText,facility360DocType.facilityDDValue);
      const smartdm = new SmartDM();
      const docType = new DocumentType()
      smartdm.selectDocumentTab()
      docType.selectDocumentTypeTab();
      cy.logger('application',"Document Type tab is selected")
      docType.verifyNewDocType(facility360DocType.updateData) 
      docType.downloadFileAttachment()             
  })
  })

  it('Documents - Document Type tab- User can view list of all available document types ',()=>{
    cy.fixture('./Facility360/Documents/DocumentTypes/facility360DocumentType').then((facility360DocType) => {
      const loginobj = new Login();
      loginobj.userLogin(facility360DocType.UserName,facility360DocType.UserPassword);
      cy.wait(2000);
      loginobj.verifyLoginSuccess();
      cy.logger('application',"Validated success Login Msg-->Login Test");
      const facility360 = new Facility360();
      facility360.selectFacility360Tab();
      cy.logger('application',"Redirected to facility360 tab")
      cy.get('.modal-content > a').click();
      facility360.selectFacilityFromDD(facility360DocType.facilityDDText,facility360DocType.facilityDDValue);
      const smartdm = new SmartDM();
      const docType = new DocumentType()
      smartdm.selectDocumentTab()
      docType.selectDocumentTypeTab();
      cy.logger('application',"Document Type tab is selected")
      docType.viewDocTypeList()
  })
  })
})


import Login from "../../../../PageClass/CommonPages/Login";
import Facility360 from "../../../../PageClass/CommonPages/Facility360";
import NewDocument from "../../../../PageClass/Facility360/Documents/MyDocuments/Facility360AddNewDocument";
import UpdateDoc from "../../../../PageClass/Facility360/Documents/MyDocuments/Facility360UpdateDocument"
import ShareDoc from "../../../../PageClass/Facility360/Documents/MyDocuments/Facility360ShareDocument"
import FilterDoc from "../../../../PageClass/Facility360/Documents/MyDocuments/Facility360ApplyFilter"

const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
          cy.visit('https://dev-registrarcorp.myfda.com/');
          cy.logger('application',"Launched Application-->Login Test");
            
      });   

  it('Add New Document', () => {
    cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {
      const docInput = data.docInput
      const loginobj = new Login();
      loginobj.userLogin(data.UserName, data.UserPassword);
      cy.wait(2000);
      loginobj.verifyLoginSuccess();
      cy.logger('application', "Validated success Login Msg-->Login Test");
      const facility360 = new Facility360();
      facility360.selectFacility360Tab();
      cy.logger('application', "Redirected to facility360 tab")
      cy.get('.modal-content > a').click();
      facility360.selectFacilityFromDD(data.facilityDDText, data.facilityDDValue);
      cy.logger('application', "Facility selected" + data.facilityDDText)
      cy.wait(2000);
      const documentobj = new NewDocument();
      documentobj.selectDocumentTab()
      cy.logger('application', "Redirected to Document tab")

      documentobj.selectMyDocumentsTab()
      cy.logger('application', "Redirected to My Documents tab")

      documentobj.clickOnAddDocument()
      cy.logger('application', "Add Document modal is opened")

      documentobj.EnterInputData(docInput);
      cy.logger('application', "Required details are entered")

      /* cy.get("#newExpDocForm input[type='file']").selectFile({
         contents :'cypress/fixtures/facility360.json',
         fileName : 'facility360.json',
         mimeType : 'application/json',
         lastModified: Date.now()
       },{force:true})               
       cy.wait(5000)
       documentobj.clickOnSaveDocBtn() 
       cy.logger('application',"New document is created")  */

      documentobj.clickOnSkipForNowBtn();
      cy.logger('application', "New Folder with Missing status is created")

      documentobj.searchDoc(docInput);
      cy.logger('application', "Created new document details are verified")

    })
  })

  it('Update created document using update document option',() => {
      cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {      
        const loginobj = new Login();
        loginobj.userLogin(data.UserName,data.UserPassword);
        cy.wait(2000);
        loginobj.verifyLoginSuccess();
        cy.logger('application',"Validated success Login Msg-->Login Test");
        const facility360 = new Facility360();
        facility360.selectFacility360Tab();
        cy.logger('application',"Redirected to facility360 tab")
        cy.get('.modal-content > a').click();
        facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
        cy.logger('application',"Facility selected"+data.facilityDDText)
        cy.wait(2000); 
        const documentobj = new NewDocument();
        documentobj.selectDocumentTab()
        cy.logger('application',"Redirected to Document tab")
        documentobj.selectMyDocumentsTab()
        cy.logger('application',"Redirected to My Documents tab")
        documentobj.searchDoc(data.docInput);
        cy.logger('application',"Created new document details are verified")
        cy.fixture('./Facility360/Documents/MyDocuments/facility360UpdateDoc').then((updateDocData)=>{
          const updatedocobj = new UpdateDoc();   
          updatedocobj.clickOnUpdateDoc()
          updatedocobj.EnterUpdatedData(updateDocData.updatedDocInput)
          documentobj.clickOnSkipForNowBtn()
          documentobj.searchDoc(updateDocData.updatedDocInput);        
        })                                
       })       
    })
    /*it('Update created document using Add file option',() => {
      cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {      
        const loginobj = new Login();
        loginobj.userLogin(data.UserName,data.UserPassword);
        cy.wait(2000);
        loginobj.verifyLoginSuccess();
        cy.logger('application',"Validated success Login Msg-->Login Test");
        const facility360 = new Facility360();
        facility360.selectFacility360Tab();
        cy.logger('application',"Redirected to facility360 tab")
        cy.get('.modal-content > a').click();
        facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
        cy.logger('application',"Facility selected"+data.facilityDDText)
        cy.wait(2000); 
        const documentobj = new NewDocument();
        documentobj.selectDocumentTab()
        cy.logger('application',"Redirected to Document tab")
        documentobj.selectMyDocumentsTab()
        cy.logger('application',"Redirected to My Documents tab")
        documentobj.searchDoc(data.docInput);
        cy.logger('application',"Created new document details are verified")
        
        cy.fixture('./Facility360/MyDocuments/facility360UpdateDoc').then((updateDocData)=>{
          const updatedocobj = new UpdateDoc();   
          updatedocobj.clickOnAddFile()
          
          
          //to be updated 

        }) 
        
                                
       })       
    })*/

    it('Download file attached to document',() => {
      cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {      
        const loginobj = new Login();
        loginobj.userLogin(data.UserName,data.UserPassword);
        cy.wait(2000);
        loginobj.verifyLoginSuccess();
        cy.logger('application',"Validated success Login Msg-->Login Test");
        const facility360 = new Facility360();
        facility360.selectFacility360Tab();
        cy.logger('application',"Redirected to facility360 tab")
        cy.get('.modal-content > a').click();
        facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
        cy.logger('application',"Facility selected"+data.facilityDDText)
        cy.wait(2000); 
        const documentobj = new NewDocument();
        documentobj.selectDocumentTab()
        cy.logger('application',"Redirected to Document tab")
        documentobj.selectMyDocumentsTab()
        cy.logger('application',"Redirected to My Documents tab")
        documentobj.searchDoc(data.docInput);
        cy.logger('application',"Created new document details are verified")
        documentobj.DownloadDoc()                                         
       })       
    })


    it('Share Created document',()=>{  
      cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {        
         const loginobj = new Login();
          loginobj.userLogin(data.UserName,data.UserPassword);
          cy.wait(2000);
          loginobj.verifyLoginSuccess();
          cy.logger('application',"Validated success Login Msg-->Login Test");
          const facility360 = new Facility360();
          facility360.selectFacility360Tab();
          cy.logger('application',"Redirected to facility360 tab")
          cy.get('.modal-content > a').click();
          facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
          cy.logger('application',"Facility selected"+data.facilityDDText)
          cy.wait(2000); 
          const documentobj = new NewDocument();
          documentobj.selectDocumentTab()
          cy.logger('application',"Redirected to Document tab")

          documentobj.selectMyDocumentsTab()
          cy.logger('application',"Redirected to My Documents tab")
      
          documentobj.searchDoc(data.docInput);
          cy.logger('application',"Created new document details are verified") 
          
          cy.fixture('./Facility360/Documents/MyDocuments/facility360ShareDoc').then((shareDocData)=>{
          const shareDocObj = new ShareDoc()
          shareDocObj.clickOnSingleShareDoc()
          shareDocObj.shareDoc(shareDocData.docShareName,shareDocData.docShareEmail,shareDocData.docShareEmailMsg);
          cy.logger('application',"Document is shared ")           
          cy.wait(1000) 
          shareDocObj.verifyDocIsShared(shareDocData.docShareEmail,shareDocData.docShareEmailSub)
          shareDocObj.verifySharedDocEmailContent(data.docInput)         
          })                  
        })
        cy.get('@downloadFile').then((filename)=>{                               
          cy.task('readPdf','cypress/downloads/'+filename).then((data)=>{
            cy.log(data.text)
          })              
        }) 
        
  }) 
 
it('Documents - My Documents tab- Verify that User can view documents',()=>{
  cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {      
    const loginobj = new Login();
    loginobj.userLogin(data.UserName,data.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
    cy.logger('application',"Facility selected"+data.facilityDDText)
    cy.wait(2000); 
    const documentobj = new NewDocument();
    documentobj.selectDocumentTab()
    cy.logger('application',"Redirected to Document tab")
    documentobj.selectMyDocumentsTab()
    cy.logger('application',"Redirected to My Documents tab")
    documentobj.viewMyDoc();                              
   })       
})
it('Documents - My Documents tab- Apply Filter',()=>{
  
  cy.fixture('./Facility360/Documents/MyDocuments/facility360ApplyFilter').then((data) => {      
    const loginobj = new Login();
    loginobj.userLogin(data.UserName,data.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
    cy.logger('application',"Facility selected"+data.facilityDDText)
    cy.wait(2000); 
    const documentobj = new NewDocument();
    documentobj.selectDocumentTab()
    cy.logger('application',"Redirected to Document tab")
    documentobj.selectMyDocumentsTab()
    cy.logger('application',"Redirected to My Documents tab") 

    const filterdocobj = new FilterDoc()
    filterdocobj.applyFilter('Type',data.docTypeFilter)
    cy.logger('application',"Type Filter is applied")
    filterdocobj.resetFilter()
    cy.logger('application'," Filter is reset")
    
    filterdocobj.applyFilter('Category',data.docCatFilter)
    cy.logger('application',"Category Filter is applied")
    filterdocobj.resetFilter()
    cy.logger('application'," Filter is reset")

    cy.wait(2000)
    filterdocobj.applyFilter('Product',data.docProductFilter)
    cy.logger('application',"Product Filter is applied")
    filterdocobj.resetFilter()
    cy.logger('application'," Filter is reset") 
   })       
})
  
it('Documents - My Documents tab- Verify status label above document table',()=>{
  cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {      
    const loginobj = new Login();
    loginobj.userLogin(data.UserName,data.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
    cy.logger('application',"Facility selected"+data.facilityDDText)
    cy.wait(2000); 
    const documentobj = new NewDocument();
    documentobj.selectDocumentTab()
    cy.logger('application',"Redirected to Document tab")
    documentobj.selectMyDocumentsTab()
    cy.logger('application',"Redirected to My Documents tab") 

    documentobj.clickOnDocStatusLabel(data.expiredDocStatusLabel)
    cy.wait(2000)
    documentobj.verifyDocStatusData(data.expiredDocStatusLabel)
   })       
}) 
it(' Verify that User can share documents using  Bulk share option',()=>{  

  cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {        
     const loginobj = new Login();
     loginobj.userLogin(data.UserName,data.UserPassword);
     cy.wait(2000);
     loginobj.verifyLoginSuccess();
     cy.logger('application',"Validated success Login Msg-->Login Test");
     const facility360 = new Facility360();
     facility360.selectFacility360Tab();
     cy.logger('application',"Redirected to facility360 tab")
     cy.get('.modal-content > a').click();
     facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
     cy.logger('application',"Facility selected"+data.facilityDDText)
     cy.wait(2000); 
     const documentobj = new NewDocument();
     documentobj.selectDocumentTab()
     cy.logger('application',"Redirected to Document tab")

     documentobj.selectMyDocumentsTab()
     cy.logger('application',"Redirected to My Documents tab")
 
     documentobj.clickOnDocStatusLabel(data.validDocStatusLabel)
     cy.wait(2000)
     documentobj.selectValidDocuments(data.validDocCount)

     cy.fixture('./Facility360/Documents/MyDocuments/facility360ShareDoc').then((shareDocData)=>{
       const shareDocObj = new ShareDoc()
       shareDocObj.clickOnBulkShareDoc()
       shareDocObj.shareDoc(shareDocData.docShareName,shareDocData.docShareEmail,shareDocData.docShareEmailMsg);
       cy.logger('application',"Document is shared ")           
       cy.wait(1000) 
       //shareDocObj.verifyDocIsShared(shareDocData.docShareEmail,shareDocData.docShareEmailSub)
       //shareDocObj.verifySharedDocEmailContent()          
     })              
   })      
}) 
it('Verify that User can download spreadsheet, which contain list of all documents',() => {
 /* cy.fixture('./Facility360/Documents/MyDocuments/facility360AddNewDocument').then((data) => {      
    const loginobj = new Login();
    loginobj.userLogin(data.UserName,data.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
    cy.logger('application',"Facility selected"+data.facilityDDText)
    cy.wait(2000); 
    const documentobj = new NewDocument();
    documentobj.selectDocumentTab()
    cy.logger('application',"Redirected to Document tab")
    documentobj.selectMyDocumentsTab()
    cy.logger('application',"Redirected to My Documents tab")
    documentobj.downloadSpreadSheet()
   })*/
   const excelFilePath = 'cypress/downloads/My_Documents_Report.xlsx'
   const sheetName = 'Report'     
   cy.task('generateJsonFromExcel',{excelFilePath,sheetName}).then((jsonData)=>{
    const rowlength = Cypress.$(jsonData[0].data).length
    console.log(rowlength )
    console.log(JSON.stringify(jsonData))
    expect(jsonData[0].name).eq('Report')
   // cy.writeFile('cypress/fixtures/xlsxData.json',{ReportData:jsonData[0].data})
    cy.writeFile('cypress/fixtures/xlsxData.json',JSON.stringify(jsonData,null,2))
   }) 
})
})
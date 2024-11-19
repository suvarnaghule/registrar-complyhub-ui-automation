
import Login from "../../PageClass/CommonPages/Login";
import Facility360 from "../../PageClass/CommonPages/Facility360";
import Facility360AddNew from "../../PageClass/Facility360/FacilityDetails/Facility360AddNew";
import Facility360RegiScore from "../../PageClass/Facility360/FacilityDetails/Facility360RegiScore";
import Facility360Shipment from "../../PageClass/Facility360/Shipments/MyShipments/Facility360Shipment"
import Facility360FDACompliance  from "../../PageClass/Facility360/FDAComplianeData/Facility360FDACompliance"
import NewDocument from "../../PageClass/Facility360/Documents/MyDocuments/Facility360AddNewDocument";
import AllShipment from "../../PageClass/Facility360/Shipments/AllShipments/Facility360ShipmentInsightTab"
import SmartDM from "../../PageClass/Facility360/Documents/SmartDMS/Facility360SmartDM"
import UpdateDoc from "../../PageClass/Facility360/Documents/MyDocuments/Facility360UpdateDocument"

const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
          cy.visit('https://dev-registrarcorp.myfda.com/');
       // cy.visit('https://monitor.dev.compliancemonitorapi.com/dashboard/login')
          cy.logger('application',"Launched Application-->Login Test");
            
      }); 
    
   
    it('Verify Basic Facility Details',()=>{        
        
      cy.fixture('./Facility360/facility360').then((facility360data) => {

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

      cy.fixture('./Facility360/facility360AddNew').then((facility360dataAddNew) => {
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

      cy.fixture('./Facility360/facility360regiscore').then((facility360regiscore) => {
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

  it('Verify that User can see details of all shipments sent to US in last 5 years on',()=>{


      cy.fixture('./Facility360/facility360Shipment').then((facility360shipment) => {
        const loginobj = new Login();
        loginobj.userLogin(facility360shipment.UserName, facility360shipment.UserPassword);
        cy.wait(3000);
        loginobj.verifyLoginSuccess();
        cy.logger('application',"Validated success Login Msg-->Login Test");
        const facility360 = new Facility360();
        facility360.selectFacility360Tab();
        cy.logger('application',"Redirected to facility360 tab")
        cy.get('.modal-content > a').click();
        facility360.selectFacilityFromDD(facility360shipment.facilityDDText,facility360shipment.facilityDDValue);
        cy.logger('application',"Facility selected"+facility360shipment.facilityDDText)
        const facility360Shipment = new Facility360Shipment();
        facility360Shipment.selectShipmentTab();
        cy.logger('application',"User is on shipment tab");
        cy.wait(3000)
        facility360Shipment.selectShipmentSubTab();
        cy.logger('application',"by default my shipment sub tab is selected");
        facility360Shipment.selectShipmentProductCategory(facility360shipment.facilitySelectProductCataegory);
        cy.logger('application',"User has selected shipment product category and clicked on apply filter");
        cy.wait(3000)
        facility360Shipment.verifyShippingDetails(facility360shipment.all,facility360shipment.cleared,facility360shipment.Detained,facility360shipment.Refused);
        cy.logger('application',"verfiying the value for shipment details like all, cleared detained and refused");
      })
      


  })

  it('verify compliance data', ()=>{
    cy.fixture('./Facility360/facility360DFAComplianceData').then((facility360fdacompliance) => {
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

  it('Add New Document',()=>{  

        cy.fixture('./Facility360/facility360AddNewDocument').then((data) => {
            const docInput = data.docInput
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

            documentobj.clickOnAddDocument()
            cy.logger('application',"Add Document modal is opened")
           
            documentobj.EnterInputData(docInput);
            cy.logger('application',"Required details are entered")

            //cy.get("input[class='doc-file']").selectFile(fileName)

             //Upload file
         /*   cy.fixture('Testdata.json').then(function(fileContent){
              cy.get("input[class='doc-file']").attachFile({ fileContent,  fileName, mimeType:'application/json'})            
            })                       
            cy.wait(1000)

            documentobj.clickOnSaveDocBtn() 
            cy.logger('application',"New document is created") */

           documentobj.clickOnSkipForNowBtn();
           cy.logger('application',"New Folder with Missing status is created") 
           
           documentobj.VerifyDocIsCreated(docInput);
           cy.logger('application',"Created new document details are verified")         
                 
           })       
    })

  it('Update created document using update document option',() => {
      cy.fixture('./Facility360/facility360AddNewDocument').then((data) => {      
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
        documentobj.VerifyDocIsCreated(data.docInput);
        cy.logger('application',"Created new document details are verified")
        cy.fixture('./Facility360/facility360UpdateDoc').then((updateDocData)=>{
          const updatedocobj = new UpdateDoc();   
          updatedocobj.clickOnUpdateDoc()
          updatedocobj.EnterUpdatedData(updateDocData.updatedDocInput)
          documentobj.clickOnSkipForNowBtn()
          documentobj.VerifyDocIsCreated(updateDocData.updatedDocInput);        

        }) 
        
                                
       })       
    })
    it('Update created document using Add file option',() => {
      cy.fixture('./Facility360/facility360AddNewDocument').then((data) => {      
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
        documentobj.VerifyDocIsCreated(data.docInput);
        cy.logger('application',"Created new document details are verified")
        

        cy.fixture('./Facility360/facility360UpdateDoc').then((updateDocData)=>{
          const updatedocobj = new UpdateDoc();   
          updatedocobj.clickOnAddFile()
          
          
          //to be updated 

        }) 
        
                                
       })       
    })

    it('Download created document',() => {
      cy.fixture('./Facility360/facility360AddNewDocument').then((data) => {      
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
        documentobj.VerifyDocIsCreated(data.docInput);
        cy.logger('application',"Created new document details are verified")
        documentobj.DownloadDoc()                                         
       })       
    })


    it('Share Created document',()=>{  

       cy.fixture('./Facility360/facility360AddNewDocument').then((data) => {        
         /* const loginobj = new Login();
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
          cy.wait(2000);  */
          const documentobj = new NewDocument();
        /*  documentobj.selectDocumentTab()
          cy.logger('application',"Redirected to Document tab")

          documentobj.selectMyDocumentsTab()
          cy.logger('application',"Redirected to My Documents tab")
      
          documentobj.VerifyDocIsCreated(data.docInput);
          cy.logger('application',"Created new document details are verified")

          documentobj.shareDoc(data.docShareName,data.docShareEmail,data.docShareEmailMsg);
          cy.logger('application',"Document is shared ") 
          
          cy.wait(1000) */

          documentobj.verifyDocIsShared(data.docShareEmail,data.docShareEmailSub)
          documentobj.verifySharedDocEmailContent()        
          
        })      
  }) 


  it('Verify top 10 countries and exporters for selected product category',()=>{  
    cy.fixture('./Facility360/facility360ShipmentInsightTab').then((data) => {         
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
            const shipmentobj = new AllShipment();
            shipmentobj.selectShipmentTab()
            cy.logger('application',"Redirected to Shipment tab") 
            shipmentobj.selectAllShipmentTab()
            cy.logger('application',"Redirected to All Shipment tab")
            cy.wait(3000);
            shipmentobj.selectTopCountriesTab()
            cy.logger('application',"Redirected to Top countries tab")                        
            //Select product category
            shipmentobj.selectProductCategory(data.productCatText)
            cy.logger('application',"Selected product category")
            shipmentobj.applyFilter()
            cy.logger('application',"Filter is applied")
            cy.wait(2000) 
            shipmentobj.verifyTop10Countries(data.top10Countries[0].top10CountryName,data.top10Countries[1].top10CountryShipment,data.top10Countries[2].shipmentCount)
            cy.logger('application',"Top 10 countries along with shipment count is verified")
            shipmentobj.verifyTotalShipmentCount(data.top10Countries[2].shipmentCount)
            cy.logger('application',"Verified Total shipment count on Top 10 countries Tab ")
           
            shipmentobj.selectTopExportersTab()
            cy.logger('application',"Top exoprters tab is selected")
            shipmentobj.verifyTop10Exporters(data.top10Exporters[0].top10ExporterName,data.top10Exporters[1].top10ExporterShipment,data.top10Countries[2].shipmentCount)
            cy.logger('application',"Top 10 exporters along with shipment count is verified") 
            shipmentobj.verifyTotalShipmentCount(data.top10Countries[2].shipmentCount)
            cy.logger('application',"Verified Total shipment count on Top 10 exporters tab ") 
            
            //Show Top 100 modal
            shipmentobj.openTop100ExportersModal()
            //Close Top 100 modal
            shipmentobj.closeShowTop100Modal()        
           })  

}) 
it('Verify top 10 countries and exporters for default product category',()=>{  
  cy.fixture('./Facility360/facility360ShipmentInsightTab').then((data) => {         
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
          const shipmentobj = new AllShipment();
          shipmentobj.selectShipmentTab()
          cy.logger('application',"Redirected to Shipment tab") 
          shipmentobj.selectAllShipmentTab()
          cy.logger('application',"Redirected to All Shipment tab")
          cy.wait(3000);
          
          shipmentobj.selectTopCountriesTab()
          cy.logger('application',"Redirected to Top countries tab")     
          shipmentobj.verifyDefaultProductCat()
          cy.logger('application',"Verified default product category")
          shipmentobj.verifyTop10Countries(data.top10Countries[3].DefaultTop10CountryName,data.top10Countries[4].DefaultTop10CountryShipment,data.top10Countries[5].DefaultShipmentCount)
          cy.logger('application',"Verified Top 10 countries for default product category")
          shipmentobj.verifyTotalShipmentCount(data.top10Countries[5].DefaultShipmentCount)
          cy.logger('application',"Verified Total shipment count on Top 10 countries Tab ")
          
          shipmentobj.selectTopExportersTab()
          cy.logger('application',"Top exoprters tab is selected")
          shipmentobj.verifyTop10Exporters(data.top10Exporters[2].DefaultTop10ExporterName ,data.top10Exporters[3].DefaultTop10ExporterShipment,data.top10Countries[5].DefaultShipmentCount)
          cy.logger('application',"Verified Top 10 exporters for default product category")
          shipmentobj.verifyTotalShipmentCount(data.top10Countries[5].DefaultShipmentCount)
          cy.logger('application',"Verified Total shipment count on Top 10 exporters tab ")
          
          //Show Top 100 modal
          shipmentobj.openTop100ExportersModal()
          //Close Top 100 modal
          shipmentobj.closeShowTop100Modal()        
         
        /*  cy.get('@TotalShipmentCnt').then(count=>{
            cy.log('Shipment Count : '+count)
        })*/                    
         })  

}) 


it('Documents - SmartDMS tab- Verify that User can view suggested documents',()=>{
  cy.fixture('./Facility360/facility360SmartDM').then((facility360SmartDM) => {
    const loginobj = new Login();
    loginobj.userLogin(facility360SmartDM.UserName,facility360SmartDM.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(facility360SmartDM.facilityDDText,facility360SmartDM.facilityDDValue);
    const smartdm = new SmartDM();
    smartdm.selectDocumentTab()
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    smartdm.verifyStatusOfDocument(facility360SmartDM.status)
    cy.logger('application',"status of all document is " +facility360SmartDM.status)
})
})
it('Documents - SmartDMS tab- Apply Filter document suggestions',()=>{
  cy.fixture('./Facility360/facility360SmartDM').then((facility360SmartDM) => {
    const loginobj = new Login();
    loginobj.userLogin(facility360SmartDM.UserName,facility360SmartDM.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(facility360SmartDM.facilityDDText,facility360SmartDM.facilityDDValue);
    const smartdm = new SmartDM();
    smartdm.selectDocumentTab()
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    smartdm.applyFilter(facility360SmartDM.TypeOfFilter,facility360SmartDM.FilterValue)
    cy.wait(5000)
    smartdm.verifyFilter(facility360SmartDM.TypeOfFilter,facility360SmartDM.FilterValue)
    cy.wait(1000)
    smartdm.resetFilter()
    cy.wait(2000)
    smartdm.applyFilter(facility360SmartDM.DocCatFilter,facility360SmartDM.DocCatFilterValue)
    cy.wait(5000)
    smartdm.verifyFilter(facility360SmartDM.DocCatFilter,facility360SmartDM.DocCatFilterValue)
    cy.wait(1000)
    smartdm.resetFilter()
    cy.wait(2000)
    smartdm.applyFilter(facility360SmartDM.DocTypeFilter,facility360SmartDM.DocTypeFilterValue)
    cy.wait(5000)
    smartdm.verifyFilter(facility360SmartDM.DocTypeFilter,facility360SmartDM.DocTypeFilterValue)
    cy.wait(1000)
    smartdm.resetFilter()
    cy.wait(2000)
    smartdm.applyFilter(facility360SmartDM.ProductFilter,facility360SmartDM.ProductFilterValue)
    cy.wait(5000)
    smartdm.verifyFilter(facility360SmartDM.ProductFilter,facility360SmartDM.ProductFilterValue)   
})
})
it('Documents - SmartDMS tab- User can view Ignored Documents List',()=>{
  cy.fixture('./Facility360/facility360SmartDM').then((facility360SmartDM) => {
    const loginobj = new Login();
    loginobj.userLogin(facility360SmartDM.UserName,facility360SmartDM.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(facility360SmartDM.facilityDDText,facility360SmartDM.facilityDDValue);
    const smartdm = new SmartDM();
    smartdm.selectDocumentTab()
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    smartdm.clickOnViewIgnoredList()
    cy.wait(2000)
    smartdm.viewIgnoredList()
})
})
/*it('Documents - SmartDMS tab- Retrieve single document suggestion',()=>{
  let smart_dm_doc_cnt
  cy.fixture('./Facility360/facility360SmartDM').then((facility360SmartDM) => {
    const loginobj = new Login();
    loginobj.userLogin(facility360SmartDM.UserName,facility360SmartDM.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(facility360SmartDM.facilityDDText,facility360SmartDM.facilityDDValue);
    const smartdm = new SmartDM();
    smartdm.selectDocumentTab()
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    cy.wait(5000)
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((doc_cnt)=>{
      smart_dm_doc_cnt=doc_cnt
      smartdm.clickOnViewIgnoredList()
      cy.wait(2000)
      smartdm.retrieveSingleDoc()
      cy.wait(7000)
     // smartdm.closeIgnoredDocList()
     // cy.wait(2000)
      smartdm.verifyRetrivedSingleDoc()
      cy.wait(2000)
      smartdm.getSmartDMSDocCount()
      cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
        expect(updated_doc_cnt).eq(smart_dm_doc_cnt + 1)
      }) 
    })
})
})*/
it('Documents - SmartDMS tab- Ignore & Retrieve single document suggestion',()=>{
  let initial_doc_cnt
  cy.fixture('./Facility360/facility360SmartDM').then((facility360SmartDM) => {
    const loginobj = new Login();
    loginobj.userLogin(facility360SmartDM.UserName,facility360SmartDM.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(facility360SmartDM.facilityDDText,facility360SmartDM.facilityDDValue);
    const smartdm = new SmartDM();
    smartdm.selectDocumentTab()
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    cy.wait(5000)
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((doc_cnt)=>{
      initial_doc_cnt = doc_cnt
      cy.log('Initial doc count : '+initial_doc_cnt)
      cy.logger('aaplication',"Smart DMS tab doc count noted")
      smartdm.getDetailsOfDoc()
      smartdm.clickOnIgnoredDocument() 
      cy.wait(10000)
      smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
          expect(updated_doc_cnt).eq(initial_doc_cnt-1)
        }) 
      smartdm.clickOnViewIgnoredList() 
      smartdm.verifyIgnoredDoc()
      cy.wait(2000)
      smartdm.retrieveSingleDoc()
      cy.wait(7000)
     // smartdm.closeIgnoredDocList()
     // cy.wait(2000)
      smartdm.verifyRetrivedSingleDoc()
      cy.wait(2000)
      smartdm.getSmartDMSDocCount()
      cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
        expect(updated_doc_cnt).eq(initial_doc_cnt)
      })         
  })  
})
})
it('Documents - SmartDMS tab- Add Document',()=>{
  let initial_doc_cnt, doc_type,doc_cat, doc_product;
  
  cy.fixture('./Facility360/facility360SmartDM').then((facility360SmartDM) => {
    const loginobj = new Login();
    loginobj.userLogin(facility360SmartDM.UserName,facility360SmartDM.UserPassword);
    cy.wait(2000);
    loginobj.verifyLoginSuccess();
    cy.logger('application',"Validated success Login Msg-->Login Test");
    const facility360 = new Facility360();
    facility360.selectFacility360Tab();
    cy.logger('application',"Redirected to facility360 tab")
    cy.get('.modal-content > a').click();
    facility360.selectFacilityFromDD(facility360SmartDM.facilityDDText,facility360SmartDM.facilityDDValue);
    const smartdm = new SmartDM();
    smartdm.selectDocumentTab()
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    cy.wait(5000)
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((doc_cnt)=>{
      initial_doc_cnt = doc_cnt
      cy.log('Initial doc count : '+initial_doc_cnt)
      cy.logger('aaplication',"Smart DMS tab doc count noted")
    smartdm.clickOnAddFile()
    smartdm.EnterInputdata(facility360SmartDM.docInput)
    cy.wait(5000)
    const documentobj = new NewDocument();
    //Check doc gets added in My documents Tab 
    cy.get('@docType').then((docType) =>{
      doc_type = docType
      cy.get('@docCat').then((docCat) =>{
        doc_cat = docCat
        cy.get('@docProduct').then((docProduct) =>{
          doc_product = docProduct
          const docInput={
            "Type":doc_type,
            "Name":facility360SmartDM.docInput.Name,  
            "Cat":doc_cat,
            "Products":doc_product      
          }
          cy.log(JSON.stringify(docInput))
          documentobj.selectMyDocumentsTab()
          cy.wait(2000)
          documentobj.VerifyDocIsCreated(docInput)
          cy.wait(2000)
          smartdm.getSmartDMSDocCount()
          cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
            expect(updated_doc_cnt).eq(initial_doc_cnt-1)
          })
        })
      })     
    })
  })  
 }) 
})
it('Documents - My Documents tab- Verify that User can view documents',()=>{
  cy.fixture('./Facility360/facility360AddNewDocument').then((data) => {      
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
  
  cy.fixture('./Facility360/facility360AddNewDocument').then((data) => {      
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

   /* documentobj.applyFilter('Type',data.docTypeFilter)
    cy.logger('application',"Type Filter is applied")
    documentobj.resetFilter()
    cy.logger('application'," Filter is reset")
    documentobj.applyFilter('Category',data.docCatFilter)
    cy.logger('application',"Category Filter is applied")
    documentobj.resetFilter()
    cy.wait(2000)*/
    documentobj.applyFilter('Product',data.docProductFilter)
    cy.logger('application',"Product Filter is applied")
    
   })       
})
  
it('Documents - My Documents tab- Verify status label above document table',()=>{
  cy.fixture('./Facility360/facility360AddNewDocument').then((data) => {      
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

    documentobj.clickOnExpiredStatusLabel()
    cy.wait(2000)
    documentobj.verifyExpiredStatusData()
   })       
})   

})
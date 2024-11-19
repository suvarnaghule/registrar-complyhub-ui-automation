
import Login from "../../../../PageClass/CommonPages/Login"
import Facility360 from "../../../../PageClass/CommonPages/Facility360";
import NewDocument from "../../../../PageClass/Facility360/Documents/MyDocuments/Facility360AddNewDocument";
import SmartDM from "../../../../PageClass/Facility360/Documents/SmartDMS/Facility360SmartDM"
import BulkUpload from "../../../../PageClass/Facility360/Documents/SmartDMS/Facility360BulkUpload"
import IgnoreDocument from "../../../../PageClass/Facility360/Documents/SmartDMS/Facility360IgnoreDocument"
import SingleUpload from "../../../../PageClass/Facility360/Documents/SmartDMS/Facility360SingleUpload"
import BulkIgnore from "../../../../PageClass/Facility360/Documents/SmartDMS/Facility360BulkIgnore"
import MergeDocument from "../../../../PageClass/Facility360/Documents/SmartDMS/Facility360MergeDocuments"


const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
          cy.visit('https://dev-registrarcorp.myfda.com/');
          cy.logger('application',"Launched Application-->Login Test");
            
      });   
    
it('Documents - SmartDMS tab- Verify that User can view suggested documents',()=>{
  cy.fixture('./Facility360/Documents/SmartDMS/facility360SmartDM').then((facility360SmartDM) => {
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
  cy.fixture('./Facility360/Documents/SmartDMS/facility360SmartDM').then((facility360SmartDM) => {
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
    cy.wait(4000)
    smartdm.applyFilter(facility360SmartDM.DocTypeFilter,facility360SmartDM.DocTypeFilterValue)
    cy.wait(5000)
    smartdm.verifyFilter(facility360SmartDM.DocTypeFilter,facility360SmartDM.DocTypeFilterValue)
    cy.wait(1000)
    smartdm.resetFilter()
    cy.wait(4000)
    smartdm.applyFilter(facility360SmartDM.ProductFilter,facility360SmartDM.ProductFilterValue)
    cy.wait(5000)
    smartdm.verifyFilter(facility360SmartDM.ProductFilter,facility360SmartDM.ProductFilterValue) 
})
})
it('Documents - SmartDMS tab- User can view Ignored Documents List',()=>{
  cy.fixture('./Facility360/Documents/SmartDMS/facility360SmartDM').then((facility360SmartDM) => {
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
    const ignoreDoc = new IgnoreDocument()
    smartdm.selectDocumentTab()
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    smartdm.clickOnViewIgnoredList()
    cy.wait(2000)
    ignoreDoc.viewIgnoredList()
})
})
/*it('Documents - SmartDMS tab- Retrieve single document suggestion',()=>{
  let smart_dm_doc_cnt
  cy.fixture('./Facility360/Documents/SmartDMS/facility360SmartDM').then((facility360SmartDM) => {
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
it.only('Documents - SmartDMS tab- Ignore & Retrieve single document suggestion',()=>{
  let initial_doc_cnt
  cy.fixture('./Facility360/Documents/SmartDMS/facility360SmartDM').then((facility360SmartDM) => {
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
    const ignoreDoc = new IgnoreDocument()
    const bulkUpload = new BulkUpload()
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
      bulkUpload.selectDocuments(1)
      ignoreDoc.clickOnIgnoredDocument() 
      cy.wait(10000)
      smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
          expect(updated_doc_cnt).eq(initial_doc_cnt-1)
        }) 
      smartdm.clickOnViewIgnoredList() 
      ignoreDoc.verifyIgnoredDoc()
      cy.wait(2000)
      ignoreDoc.retrieveSingleDoc()
      cy.wait(7000)
     // smartdm.closeIgnoredDocList()
      cy.wait(2000)
     ignoreDoc.verifyRetrivedSingleDoc()
      cy.wait(2000)
      smartdm.getSmartDMSDocCount()
      cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
        expect(updated_doc_cnt).eq(initial_doc_cnt)
      })         
  })  
})
})
it('Documents - SmartDMS tab- Single Add Document',()=>{
  let initial_doc_cnt, doc_type,doc_cat, doc_product;
  
  cy.fixture('./Facility360/Documents/SmartDMS/facility360BulkAddDoc').then((data) => {
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
    const smartdm = new SmartDM();
    const singleUpload = new SingleUpload()
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
    singleUpload.EnterInputdata(data.docInput)
    cy.wait(5000)
    const documentobj = new NewDocument();
    documentobj.selectMyDocumentsTab()
    cy.wait(4000)
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
          cy.wait(4000)
          documentobj.searchDoc(docInput)
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
it('Documents - SmartDMS tab- Bulk Add Document',()=>{
  let initial_doc_cnt, doc_type,doc_cat, doc_product;
  let fda_cat
  cy.fixture('./Facility360/Documents/SmartDMS/facility360BulkAddDoc').then((data) => {
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
    const smartdm = new SmartDM();
    smartdm.selectDocumentTab()
    cy.wait(2000)
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    cy.wait(5000)
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((doc_cnt)=>{
      initial_doc_cnt = doc_cnt
      cy.log('Initial doc count : '+initial_doc_cnt)
      cy.logger('application',"Smart DMS tab doc count noted")
    }) 
    const bulkUpload = new BulkUpload()
   // bulkUpload.verifyBulkUploadIconIsDisabled()
    bulkUpload.selectDocuments(data.BulkUploadCount)
   // bulkUpload.verifyBulkUploadIconIsEnabled()
    cy.wait(100)
    bulkUpload.clickOnBulkUploadIcon() 
    bulkUpload.clickOnSaveBtn()
    cy.wait(2000) 
    const documentobj = new NewDocument();
    documentobj.selectMyDocumentsTab()
    cy.wait(4000)
    bulkUpload.verifyBulkAddDoc(data.BulkUploadCount)
  /*  for(let i=1;i<=data.BulkUploadCount;i++)
    {
    cy.get('@FdaCat'+i).then((fdaCat) =>{
      fda_cat= fdaCat
      cy.get('@DocCat'+i).then((docCat) =>{
        doc_cat = docCat
        cy.get('@DocType'+i).then((docType) =>{
          doc_type = docType
          const docInput={
            "Type":doc_type,
            "Name":doc_type,  
            "Cat":doc_cat,
            "Products":fda_cat      
          }
          documentobj.searchDoc(docInput)
          cy.wait(2000)
        })
      })
    })
  } */   
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
      expect(updated_doc_cnt).eq(initial_doc_cnt-data.BulkUploadCount)
    })
 }) 
})
it('Documents - SmartDMS tab- Bulk Ignore & Retrieve Document Suggestions',()=>{
  let initial_doc_cnt 
  
  cy.fixture('./Facility360/Documents/SmartDMS/facility360SmartDM').then((facility360SmartDM) => {
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
      cy.logger('application',"Smart DMS tab doc count noted")
    }) 
    const bulkUpload = new BulkUpload()
    const bulkIgnore = new BulkIgnore()
   // bulkUpload.verifyBulkUploadIconIsDisabled()
    bulkUpload.selectDocuments(facility360SmartDM.BulkIgnoreCount)
   // bulkUpload.verifyBulkUploadIconIsEnabled()
    cy.wait(100)
    bulkIgnore.clickOnBulkIgnoreIcon() 
    cy.wait(2000) 
    smartdm.clickOnViewIgnoredList()
    bulkIgnore.verifyBulkIgnoredDoc()
    bulkIgnore.retrieveBulkIgnoredDoc()
    cy.wait(7000)
    //smartdm.closeIgnoredDocList()
    cy.wait(2000)
    bulkIgnore.verifyRetrievedBulkIgnoredDoc(facility360SmartDM.BulkIgnoreCount)
    cy.wait(2000)
    //smartdm.closeIgnoredDocList()
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
      expect(updated_doc_cnt).eq(initial_doc_cnt)
    })
 }) 
})

it('Documents - SmartDMS tab- Merge Documents',()=>{
  let initial_doc_cnt, filter_doc_count
  cy.fixture('./Facility360/Documents/SmartDMS/facility360MergeDoc').then((facility360SmartDM) => {
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
    const bulkUpload = new BulkUpload()
    smartdm.selectDocumentTab()
    smartdm.selectSmartDMTab();
    cy.logger('application',"SmartDM tab is selected")
    cy.logger('application',"Verify the list of Suggested Documents")
    cy.wait(5000)
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((doc_cnt)=>{
      initial_doc_cnt = doc_cnt
      cy.log('Initial doc count : '+initial_doc_cnt)
      cy.logger('application',"Smart DMS tab doc count noted")
    }) 
    smartdm.applyFilter(facility360SmartDM.DocTypeFilter,facility360SmartDM.DocTypeFilterValue)
    cy.wait(8000)
    smartdm.verifyFilter(facility360SmartDM.DocTypeFilter,facility360SmartDM.DocTypeFilterValue)
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((doc_cnt)=>{
      filter_doc_count = doc_cnt    
      cy.log('Smart DMS count after applying filter : '+filter_doc_count)
      cy.logger('application',"Smart DMS tab doc count noted")
    }) 
    bulkUpload.selectDocuments(facility360SmartDM.MergeDocCount)
    const mergeDoc = new MergeDocument()
    mergeDoc.clickOnMergeDocIcon()
    mergeDoc.clickOnSaveBtn()
    cy.wait(9000)
    smartdm.getSmartDMSDocCount()
    cy.get('@SmartDMSDocCnt').then((doc_cnt_after_merge)=>{
    expect(doc_cnt_after_merge).eq(filter_doc_count-(facility360SmartDM.MergeDocCount - 1))  
    })
    mergeDoc.verifyMergedDoc(facility360SmartDM.MergeDocCount)
  }) 
})   

})
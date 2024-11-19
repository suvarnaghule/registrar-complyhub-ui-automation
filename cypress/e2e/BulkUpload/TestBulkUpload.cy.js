import BulkUpload from "../../PageClass/BulkUpload/BulkUpload"
import EditDocImplRecord from "../../PageClass/BulkUpload/EditDocImplRecord";
import importerUpdateDocument from "../../PageClass/ImporterDocuments/MyDocuments/importerUpdateDocument";
import NewDocument from "../../PageClass/Facility360/Documents/MyDocuments/Facility360AddNewDocument";
import deleteImplRecord from "../../PageClass/BulkUpload/DeleteImplRecord";
import filterImplRecord from "../../PageClass/BulkUpload/FilterImplRecord";
import importerMyDocuments from "../../PageClass/ImporterDocuments/MyDocuments/importerMyDocuments";

/*after('Delete File',() =>{
    const myDocObj = new importerMyDocuments()
    const newDocObj = new NewDocument()
    cy.fixture('./BulkUpload/bulkUpload').then((data) => {
        cy.loginMyFDA(data.UserName, data.UserPassword)
        cy.visit('/documents').wait(2000)
        cy.fixture('./BulkUpload/editDocImplRecord').then((docInput) => {
            newDocObj.searchDoc(docInput.Input)
            cy.wait(1000)
            myDocObj.deleteDocument(docInput.Input.Name)     
        })      
    })    
   }) */

describe('Bulk Upload ( Document Implementation Screen', {
    viewportWidth: 1280,
    viewportHeight: 800
},() => {
    let docData
    beforeEach(() => {
        cy.fixture('./BulkUpload/bulkUpload').then((data) => {
            docData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)
            cy.visit('/documents')
        })
    });
    
    it('Navigate to Document Implementation Screen & Upload a Single File', () => {
        const bulkUploadObj = new BulkUpload()
        bulkUploadObj.clickOnBulkDocumentsUpload()
        bulkUploadObj.clickOnSkipToDocumentImpl()
        bulkUploadObj.clickOnUploadFilesBtn()
        bulkUploadObj.docImplUploadFile(docData.fileName,docData.mimeType)
        cy.wait(1000)
        bulkUploadObj.searchFile(docData.fileName)
        bulkUploadObj.clickOnExpandBtnOfFirstRow()
        bulkUploadObj.verifyNameOfFile(docData.fileName)
    })
    it.skip('Document Implementation Screen -> Upload Multiple File', () => {
        const bulkUploadObj = new BulkUpload()
        // bulkUploadObj.clickOnBulkDocumentsUpload()
        // bulkUploadObj.clickOnSkipToDocumentImpl()
        cy.visit('/documents?impl=1')
       // bulkUploadObj.clickOnUploadFilesBtn()
        cy.fixture('./BulkUpload/multipleFileUpload').then((input)=>{
          //  bulkUploadObj.docImplMultipleUploadFile(input.multipleFileUploadCount,input.multipleFileInput)
            cy.wait(1000)
            // bulkUploadObj.searchFile(docData.fileName)
            // bulkUploadObj.clickOnExpandBtnOfFirstRow()
            // bulkUploadObj.verifyNameOfFile(docData.fileName)
        })      
    })
    it('DocImpl -> Edit & save record', () => {
        const bulkUploadObj = new BulkUpload()
        const editRecordObj = new EditDocImplRecord()
        const updateDocObj = new importerUpdateDocument()
        bulkUploadObj.clickOnBulkDocumentsUpload()
        bulkUploadObj.clickOnSkipToDocumentImpl()
        cy.wait(3000)
        bulkUploadObj.searchFile(docData.fileName)
        cy.wait(2000)
        bulkUploadObj.clickOnEditBtnOfFirstRow()
        editRecordObj.verifyEditRecordPopUPIsOpened()
        cy.fixture('./BulkUpload/editDocImplRecord').then((docInput) => {
            updateDocObj.EnterNewImporterData("docImpl", docInput.Input)
            updateDocObj.clickOnImporterDocSaveBtn("docImpl")
            editRecordObj.clickOnOkBtnAfterFileSave()
            editRecordObj.verifyDataOfFirstRecord(docInput.Input)
            bulkUploadObj.clickOnExpandBtnOfFirstRow()
            cy.wait(1000)
            editRecordObj.verifyDetailsOnExpandedRecord(docData.fileName, docInput.Input)
        })
    })
    it('Doc Impl-> Publish Record',()=>{
        cy.visit('/documents?impl=1')
        const bulkUploadObj = new BulkUpload()
        const editRecordObj = new EditDocImplRecord()
        const updateDocObj = new importerUpdateDocument();
        const newDocObj = new NewDocument()
        bulkUploadObj.searchFile(docData.fileName)
        cy.wait(2000)
        bulkUploadObj.clickOnPublishBtnOfFirstRecord()
        editRecordObj.clickOnOkBtnAfterFileSave()
        cy.wait(2000)
        bulkUploadObj.clickOnBackBtn()
        cy.fixture('./BulkUpload/editDocImplRecord').then((docInput) => {
            newDocObj.searchDoc(docInput.Input,"Importer")
            //updateDocObj.validateImporterSupplierName(docInput.Input.SupplierName)
        })
    })
    it('DocImpl -> Delete Multiple  Records', () => {
        const bulkUploadObj = new BulkUpload()
        const delRecordObj = new deleteImplRecord()
        bulkUploadObj.clickOnBulkDocumentsUpload()
        bulkUploadObj.clickOnSkipToDocumentImpl()
        cy.wait(3000)
        delRecordObj.selectRecords(docData.delRecordCount)
        delRecordObj.clickOnMultipleDeleteOption(docData.delRecordCount)       
    }) 
    it.only('DocImpl -> Filter based search', () => {
        const bulkUploadObj = new BulkUpload()
        const filterObj = new filterImplRecord()
        bulkUploadObj.clickOnBulkDocumentsUpload()
        bulkUploadObj.clickOnSkipToDocumentImpl()
        cy.wait(3000) 
        filterObj.clickOnFilterIcon()
        filterObj.selectIsOrContainsOption(docData.filterDDValue)
        filterObj.enterDocNameInFilterSearchBox(docData.filterDocName)
        filterObj.clickOnSearchBtnOnFilter()
        cy.wait(2000)
        filterObj.verifyFilterSearchResult(docData.filterDDValue,docData.filterDocName)
        filterObj.clickOnFilterIcon()
        filterObj.resetFilterSearch()
    })        
})   
import BulkUpload from "../../PageClass/BulkUpload/BulkUpload"
import EditDocImplRecord from "../../PageClass/BulkUpload/EditDocImplRecord";
import importerUpdateDocument from "../../PageClass/ImporterDocuments/MyDocuments/importerUpdateDocument";
import NewDocument from "../../PageClass/Facility360/Documents/MyDocuments/Facility360AddNewDocument";
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
            cy.loginMyFDA(data.UserName,data.UserPassword)
            cy.visit('/documents')
        })
    });
    
    it.only('Navigate to Document Implementation Screen & Upload a Single File', {tags : '@smokeTag'},() => {
        const bulkUploadObj = new BulkUpload()
        bulkUploadObj.clickOnBulkDocumentsUpload()
        bulkUploadObj.clickOnSkipToDocumentImpl()
        bulkUploadObj.clickOnUploadFilesBtn()
        bulkUploadObj.docImplUploadFile(docData.fileName,docData.mimeType)
        cy.wait(3000)
        bulkUploadObj.searchFile(docData.fileName)
        bulkUploadObj.clickOnExpandBtnOfFirstRow()
        bulkUploadObj.verifyNameOfFile(docData.fileName)
    })
    it('Document Implementation Screen -> Edit & save record', () => {
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
    it('Document Implementation Screen -> Publish Record',()=>{
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
            newDocObj.searchDoc(docInput.Input)
            updateDocObj.validateImporterSupplierName(docInput.Input.SupplierName)       
        })
    })
})   
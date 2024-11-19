import DocumentType from "../../../PageClass/Facility360/Documents/DocumentTypes/Facility360DocumentType";
import updateDocumentType from "../../../PageClass/Facility360/Documents/DocumentTypes/Facility360UpdateDocumentType";

describe('Validate Importer Document Type Tab', {
    viewportWidth: 1280,
    viewportHeight: 800
}, () => {
    let docTypeData
    beforeEach(() => {
        cy.fixture('./ImporterDocuments/DocumentTypes/importerDocumentType').then((data) => {
            docTypeData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)
            cy.visit('/documents') 
            cy.wait(2000)            
        })
    });

    it('Importer Document Type Tab -> create new document type', () => {
        const docTypeObj = new DocumentType()
        docTypeObj.selectDocumentTypeTab()
        docTypeObj.clickOnNewDocType()
        docTypeObj.enterDetails(docTypeData.data)
        docTypeObj.searchDocumentType(docTypeData.data.Name)
        cy.wait(2000)
        docTypeObj.verifyNewDocType(docTypeData.data)
    })
    it('Importer Document Type Tab -> download file attached to document type', () => {
        const docTypeObj = new DocumentType()
        const updateDocTypeObj = new updateDocumentType()
        docTypeObj.selectDocumentTypeTab()    
        docTypeObj.searchDocumentType(docTypeData.data.Name)
        cy.wait(2000)
        docTypeObj.downloadFileAttachment(docTypeData.data.fileName)
    })
    it('Importer Document Type Tab -> update new document type created', () => {
        const docTypeObj = new DocumentType()
        const updateDocTypeObj = new updateDocumentType()
        docTypeObj.selectDocumentTypeTab()    
        docTypeObj.searchDocumentType(docTypeData.data.Name)
        cy.wait(2000)
        updateDocTypeObj.clickOnUpdateDocBtn()
        updateDocTypeObj.EnterData(docTypeData.updateData)
        docTypeObj.searchDocumentType(docTypeData.updateData.Name)
        cy.wait(2000)
        docTypeObj.verifyNewDocType(docTypeData.updateData)
    })
    it('Importer Document Type Tab -> Delete document type', () => {
        const docTypeObj = new DocumentType()
        docTypeObj.selectDocumentTypeTab()
        docTypeObj.searchDocumentType(docTypeData.data.Name)
        cy.wait(2000)
        docTypeObj.deleteDocumentType(docTypeData.data.Name)
    })
})    
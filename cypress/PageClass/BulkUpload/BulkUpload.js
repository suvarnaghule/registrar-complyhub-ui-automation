 class BulkUpload {
    documentsUploadBtn = "div[class$='add-doc-buttons'] a "
    dialogBox="div[class='uk-modal-dialog'] div[class$='modal-content']"
    dialogBoxBtn = "div[class='uk-modal-dialog'] button"
    docImplHeader="div[class='doc-impl-header'] h1"
    docImplBtn="div[class='doc-impl-main'] button"
    uploadFileDialogBox="div[class='fsp-select-labels']"
    fileUploadInput = "input[type='file'][id='fsp-fileUpload']"
    fileUploadBtn = "span[title='Upload']"
    fileUploadedOkBtn="button[class$='uk-modal-close add-documents']"

    docImplExpandBtnRecords="#grid_grid_frecords table tr"
    docImplExpandBtn = "td[class='w2ui-grid-data w2ui-col-expand']"
    docImplExpandedRecord="#grid_grid_records table tr[id$='expanded_row']"
    docImplExpandedRecDetails="#details-data span"

    docImplDocumentRecords="#grid_grid_records table tr"
    docImplDocEditBtn="td a[id='editButton']"
    docImplDocPublishBtn="td a[id='publishButton']"
    publishConfirmationPopUp="#w2ui-popup"
    publishConfirmationTextMsg="#w2ui-popup div[class~='w2ui-msg-text']"
    btnsOnPublishConfirmationMsg="#w2ui-popup div[class='w2ui-popup-buttons'] button"

    docImplSearchFileTextbox=" #grid_grid_search_all"
    backBtnOnDocImpl="div[class='doc-impl-main'] a[class^='back-to-doc-repo']"

    clickOnBulkDocumentsUpload() {
        cy.get(this.documentsUploadBtn).contains('Bulk Documents Upload').click().then(()=>{
            cy.get(this.dialogBox).should('be.visible').and('contain.text','You can upload documents or skip to document implementation page')
        })
    }
    clickOnSkipToDocumentImpl()
    {
        cy.get(this.dialogBoxBtn).contains('Skip to Document Implementation').click().then(()=>{
            cy.url().should('contain','/documents?impl=1')
            cy.wait(2000)
            cy.get(this.docImplHeader).should('contain.text','Document Implementation')
        })
    }
    clickOnUploadFilesBtn()
    {
        cy.get(this.docImplBtn).contains('Upload File').click().then(()=>{
            cy.get(this.uploadFileDialogBox).should('be.visible')
            cy.wait(1000)
        })
    }
    docImplUploadFile(file_name,mime_type)
    {
        cy.get(this.fileUploadInput).selectFile({
            contents :'cypress/fixtures/'+file_name,
            fileName : file_name,
            mimeType : mime_type,
            lastModified: Date.now()
          },{force:true})       
         cy.get(this.fileUploadBtn).click()
         cy.get(this.dialogBox+" h3").should('contain.text','File Successfully Uploaded')
         cy.get(this.fileUploadedOkBtn).click()
    }
    clickOnExpandBtnOfFirstRow()
    {
       cy.get(this.docImplExpandBtnRecords).eq(2).as('first_expand_row')
        cy.get('@first_expand_row').find(this.docImplExpandBtn).click()     
    }
    verifyNameOfFile(file_name)
    {
        cy.get(this.docImplExpandedRecord).find(this.docImplExpandedRecDetails).contains('File Name').next().then(($file_name)=>{        
                expect($file_name.text().trim()).eq(file_name)           
        })
    }
    clickOnEditBtnOfFirstRow()
    {
        cy.get(this.docImplDocumentRecords).eq(2).as('first_doc_record')
        cy.get('@first_doc_record').find(this.docImplDocEditBtn).scrollIntoView().click()
    }
    clickOnPublishBtnOfFirstRecord()
    {
        cy.get(this.docImplDocumentRecords + "[index='0']").find(this.docImplDocPublishBtn).click().then(()=>{
            cy.get(this.publishConfirmationPopUp).should('be.visible')
            cy.get(this.publishConfirmationTextMsg).should('contain.text','Are you sure you want to publish')
            cy.get(this.btnsOnPublishConfirmationMsg).contains('Publish').click()
        }) 
    }
    searchFile(filename)
    {
        cy.get(this.docImplSearchFileTextbox).type(filename+'{enter}').should('have.value',filename)
    }
    clickOnBackBtn()
    {
        cy.get(this.backBtnOnDocImpl).click().then(()=>{
            cy.url().should('contain','/documents')   
        })
    }
}
export default BulkUpload;

class importerSendRequest
{
    importerSendReqDocIcon="table[class='uk-table docs'] td div[class='doc-actions'] > i[class='doc-add-send-request']"
    importerSendReqDocModal="#updateDocModal div[class='modal-content']"
    importerSendReqDocModalHeader="#updateDocModal div[class='modal-content'] li[class='uk-step uk-active'] div[class='uk-wizard-title']"

    importerSendReqForFileIcon="#updateDocForm div[class='doc-successful-save'] div[class$='req-doc-file']"
    importerDocReqContainer="div[class='doc-req-or-add-container']"
          
    importerContactEmail="span[class='select2-selection__rendered']"                                                          
    importerAddContactDD="select[name*='docReqContact' i]"                                                   
    importerContactName="div[class='doc-req-or-add-container'] input[class='input-field doc-req-name']"
    importerContactEmailName= "[class='input-field doc-req-email']"                                  
    
    importerSearchContactTextBox="input[class='select2-search__field']"
    importerCommentsTextbox="textarea[class='input-field doc-notes']"                               
    importerUploadInputFile="#updateDocForm input[class='doc-file'][type='file']"

    importerDocSubmitBtn="button[class^='bright-blue-button submit']"  
    importerSmartDMSDocSubmitBtn="button[class^='bright-blue-button'][type='submit']"                                                                                     
    
    importerDocNameInEmailContent="div[class='email_body'] table p"
    hyperlinkListinEmailContent="div[class='email'] a"
 
    clickOnImporterSendRequestDoc()
    {
        cy.get(this.importerSendReqDocIcon).click().then(()=>{
            cy.get(this.importerSendReqDocModal).should('exist').and('be.visible')
            cy.get(this.importerSendReqDocModalHeader).should('have.text','Add File / Send Request')
        })     
    }
    clickOnSendReqForFileIcon()
    {
        cy.get(this.importerSendReqForFileIcon).click().then(()=>{
            cy.get(this.importerDocReqContainer).should('be.visible')
        })
    }
    enterContactDetails(contactEmail,comments,MyDoc_OR_SmartDMS_tab)
    {            
        cy.get(this.importerContactEmail).click().then(()=>{
            cy.get(this.importerAddContactDD).select('Add Contact',{force:true}).then(()=>{
                if(MyDoc_OR_SmartDMS_tab == 'SmartDMS')
                {
                    cy.get(this.importerContactEmailName).clear().type(contactEmail)   
                }
                else
                {
                    cy.get(this.importerContactName).clear().type('RegistrarCorp')
                    cy.get(this.importerContactEmailName).clear().type(contactEmail)
                }               
            })               
        })
        cy.wait(100)
        cy.get(this.importerCommentsTextbox).clear().type(comments)                 
    }
    clickOnImporterDocSubmitBtn(tabName)
    {   
        if(tabName == 'SmartDMS')
        {
            cy.get(this.importerSmartDMSDocSubmitBtn).click()
        }
        else
        {      
            cy.get(this.importerDocSubmitBtn).click()
        }
    }
    verifyImporterDocReqEmail(reqDocCount,docName,supplierName,username)
    {
        let acc_user_name
        if (username == 'fdamonitor')
            acc_user_name = 'Qualified Individual'
        else 
        {
            if (username == 'FancyFood')
                acc_user_name = 'John Smith'
        }
        if (reqDocCount == 1) 
        {         
            cy.get(this.importerDocNameInEmailContent).contains(acc_user_name + ' from Registrar Corp is requesting your').should('contain', docName)          
        }
        else
            cy.get(this.importerDocNameInEmailContent).contains(acc_user_name + ' from Registrar Corp is requesting').should('contain', reqDocCount + " " + 'document(s)')

        cy.get(this.hyperlinkListinEmailContent).contains('View Document Request').invoke('attr', 'target', '_self').click().then(() => {
            cy.wait(5000)
            cy.url().should('contain', '/task')
        })
    }     
}
export default importerSendRequest;
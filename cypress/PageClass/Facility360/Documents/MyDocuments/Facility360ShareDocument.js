class ShareDoc
{
    facility360TableDocShare="table[class='uk-table docs'] td div[class='doc-actions'] > i[class='doc-direct-share']"
    facility360TableMultipleDocShare="button[class='direct-share-multiple uk-float-right'] i[class='fas fa-share-square']"
    facility360DocShareModalHeader="#documentDirectShareModal h2"
    facility360DocShareName="form div[class='direct-share-contacts'] input[class='input-field direct-share-name']"
    facility360DocShareEmail="form div[class='direct-share-contacts'] input[class='input-field direct-share-email']"
    facility360DocShareEmailMsg="#documentDirectShareForm div textarea[name='directShareMessage']"
    facility360DocShareSendBtn="#sendDocDirectShare"
    
    
    selectDomainFromDD="select[id='gm-host-select']"
    editBtn="span[title='Click to Edit']"
    inputEmailAddr="span[title='Click to Edit'] input"
    emailAddrSetBtn="span[title='Click to Edit'] button[class^='save button']"
    emailList="#email_list"

    docNameInEmailContent="div[class='email_body'] ul li"
    hyperlinkListinEmailContent="div[class='email'] a"
    attachFileName="div[class='email'] li[class='attach-file'] a"

    docNameInCMapp="table[class='uk-table docs'] p[class='doc-name']"
    downloadDocInCMapp="table[class='uk-table docs'] td[class='doc-download']"

    reqRegContentHeader="table tbody td h1"

   
    clickOnSingleShareDoc()
    {
        cy.get(this.facility360TableDocShare).click().should('be.visible')  
    }
    clickOnBulkShareDoc()
    {
        cy.get(this.facility360TableMultipleDocShare).click().should('be.visible') 
    }
    shareDoc(docShareName,docShareEmail,docShareEmailMsg)
    {
        cy.get(this.facility360DocShareName).clear().type(docShareName)
        cy.get(this.facility360DocShareEmail).clear().type(docShareEmail)
        cy.get(this.facility360DocShareEmailMsg).clear().type(docShareEmailMsg)
        cy.get(this.facility360DocShareSendBtn).click()                
    }
    verifyDocIsShared(docShareEmail,docShareEmailSub)
    {
        cy.visit('https://www.guerrillamail.com/',{timeout:60000})              
            cy.get(this.selectDomainFromDD).select('guerrillamail.com').should('have.value','guerrillamail.com')
            cy.wait(1000)
            cy.get(this.editBtn).click()
            cy.wait(100)
            cy.get(this.inputEmailAddr).clear().as('inputEmail')
            cy.get('@inputEmail').type(docShareEmail)
            cy.wait(100)
            cy.get(this.emailAddrSetBtn).click()        
            cy.wait(2000)
            cy.get(this.emailList).contains(docShareEmailSub).click();          
                
    }
    verifySharedDocEmailContent(docInput)
    {
        cy.get(this.docNameInEmailContent).should('contain',docInput.Name)
        cy.get(this.hyperlinkListinEmailContent).contains('View Shared Documents').invoke('attr', 'target', '_self').click()
        cy.get(this.docNameInCMapp).then(($docName)=>{
            expect($docName.text().trim()).eq(docInput.Name)
        })
        cy.get(this.downloadDocInCMapp).click()
        cy.get(this.downloadDocInCMapp).invoke('attr','data-fn').then((filename)=>{
            cy.log('Downloaded Filename : '+filename)
            cy.wrap(filename).as('downloadFile')
        })        
    }
    verifyRegNoRequestEmailContent(reg,supplierName)
    {
        let emailMsg
        if(reg == 'Food')
            emailMsg = 'Food Facility'
        else{
            if(reg == 'Drug')   
                emailMsg = 'Drug Establishment'
            else
                if(reg == 'Medical')
                    emailMsg = 'Medical Device Establishment'
                else
                    emailMsg = 'Cosmetic Establishment'
        }
        cy.get(this.reqRegContentHeader).as('emailHeader').should('have.text','Registrar Corp')
        cy.get('@emailHeader').parent().find("p").first().as('msgTextEle').then((msgEle)=>{
           // cy.get(msgEle).invoke('text').should('eq','Registrar Corp needs you to verify that you have a valid U.S. FDA '+emailMsg+' Registration Number.')
           cy.get(msgEle).should('contain.text',emailMsg)
            cy.get('@msgTextEle').next().should('contain.text',supplierName)
            cy.get('@emailHeader').parent().find("a").contains('Submit FDA Registration Number for Verification').invoke('attr', 'target', '_self').click()
        })
    }
    
    verifyMonitorSupplierShareReport(supplier_name)
    {
      cy.get(this.attachFileName).should('contain.text','MyFDA_Compliance_Status_Report') 
      cy.get(this.attachFileName).click().then(()=>{
      cy.task('readPdf','cypress/downloads/MyFDA_Compliance_Status_Report.pdf').then((data)=>{
            cy.log(data.text)
            expect(data.text).to.contain(supplier_name)
            })               
      })  
    }
}
export default ShareDoc;    
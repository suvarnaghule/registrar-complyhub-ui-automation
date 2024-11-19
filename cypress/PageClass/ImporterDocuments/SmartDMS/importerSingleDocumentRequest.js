class documentRequest
{
    smartDMSTable="div[class='uk-overflow-auto'] table tbody tr"
    singleDocReqIcon = "i[class*='requestFile']"
    requestDocumentModal ="div[class$='FileRequestDocModal']"
    requestDocModalHeader="div[class$='FileRequestDocModal'] h2"

    multipleDocReqIcon = "#requestDocument"

    clickOnSingleDocReqIcon()
    {
        cy.get(this.smartDMSTable+":first-child "+this.singleDocReqIcon).click().then(()=>{
            cy.get(this.requestDocumentModal).should('be.visible')
            cy.get(this.requestDocModalHeader).should('have.text','Request Document')
        })
    }
    clickOnMultipleeDocReqIcon()
    {
        cy.get(this.multipleDocReqIcon).click().then(()=>{
            cy.get(this.requestDocumentModal).should('be.visible')
            cy.get(this.requestDocModalHeader).should('have.text','Request Document')  
        })
    }

}
export default documentRequest
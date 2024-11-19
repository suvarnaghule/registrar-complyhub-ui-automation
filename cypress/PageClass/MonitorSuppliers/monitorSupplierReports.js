class monitorSupplierReport
{
    downloadSpreadsheetIcon="#exportIcons #exportExcel:first"
    generatePDFIcon="#exportIcons #exportPDF:first"
    generatePrintableReportIcon="#exportIcons #exportReport"
    shareReportIcon="#exportIcons #shareReport"
    shareReportModal="#shareReportModal"
    shareReportModalHeader= "#shareReportModal h3"

    supplierReportList="div[class$='allFacilityList'] div[class='facilities-block']"
    supplierName="div span[class='uk-font-weight']"
    supplierSelectReportCheckbox="input[type='checkbox']"
    recipientMailTextbox="input[name='recipientList']"
    sendShareReportBtn="#shareReportForm #sendShareReport"

    clickOnDownloadSpreadSheetIcon()
    {
        cy.window().then(win => {
            cy.stub(win, 'open').callsFake((url, target) => {
                expect(target).to.be.eq('_blank')
                // call the original `win.open` method
                // but pass the `_self` argument
                return win.open.wrappedMethod.call(win, url, '_self')
            }).as('open')
        })
        cy.get(this.downloadSpreadsheetIcon).click()
        cy.get('@open').should('be.called')
    }
    clickOnGeneratePDFIcon()
    {
        cy.window().then(win => {
            cy.stub(win, 'open').callsFake((url, target) => {
                expect(target).to.be.eq('_blank')
                // call the original `win.open` method
                // but pass the `_self` argument
                return win.open.wrappedMethod.call(win, url, '_self')
            }).as('open')
        })
        cy.get(this.generatePDFIcon).click()
        cy.get('@open').should('be.called')
    }
    clickOnGeneratePrintableReportIcon()
    {      
        cy.window().then(win => {     
            cy.stub(win, 'open').callsFake((url, target) => {       
                expect(target).to.be.eq('_blank')
                // call the original `win.open` method
                // but pass the `_self` argument 
                //cy.log(url)      
                return win.open.wrappedMethod.call(win, url, '_self')      
            }).as('open')                   
        })
        cy.get(this.generatePrintableReportIcon).click()
       /* cy.get('@open').then((winObj)=>{
            cy.wrap(Reflect).invoke('set', winObj, 'closed', true)
        })  */ 
        cy.get('@open').should('be.called')     
          
    }
    clickOnShareReportIcon()
    {
        cy.get(this.shareReportIcon).first().click().then(()=>{
            cy.get(this.shareReportModal).should('be.visible')
            cy.get(this.shareReportModalHeader).invoke('text').should('eq','Share Report')
        })
    }
    selectSupplierShareReport()
    {
        cy.get(this.supplierReportList).first().as('firstSupplier')
        cy.get('@firstSupplier').find(this.supplierName).invoke('text').then((supplier)=>{
            cy.wrap(supplier).as('supplierName')
        })
        cy.get('@firstSupplier').find(this.supplierSelectReportCheckbox).check().should('be.checked')     
    }
    enterShareReportRecipientsMail(shareReportEmail)
    {
        cy.get(this.recipientMailTextbox).clear().type(shareReportEmail)
        cy.get(this.sendShareReportBtn).click()
    }

}
export default monitorSupplierReport;

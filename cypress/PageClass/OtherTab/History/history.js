class history
{
    otherTab="li[class^='uk-parent new-view']"
    subTabDropDown="li[class^='uk-parent new-view'] div[class^='uk-dropdown uk-dropdown-navbar'] ul li"
    historySubTab="div[class='history-container'] li a"
    addSupplierSubTabHeader = "div[class='add-facility-container'] #addFacilityApproved h2"
    preferencesTabHeader="div[class='preferences-container'] h2[class='info']"

    supplierListTable="#tabs #monitoredFacilities #history"
    supplierNamesInSupplierListTable="#tabs #monitoredFacilities #history tr td[class]"
    supplier_checkbox="input[type='checkbox']"
    resumeMonitoringBtn="#resumeMonitoringSelected"

    reportArchiveContainer="div[class='report-archive-container']"
    reportDateDD="#report-date"
    facilityReportContainer="#select2-compliance-reports-container"
    listFacilityNameReport="select[name='compliance-reports']"
    downloadReportBtn="#archiveDownload"

    supplierListTableRows="#tabs #monitoredFacilities #history tr"
   
    selectSubTabFromOtherTab(subTabName)
    {
        cy.get(this.otherTab).trigger('mouseover')
        cy.get(this.subTabDropDown).should('be.visible').then((ddEle)=>{
            cy.get(ddEle).contains(subTabName).click()
            if(subTabName == 'History')
            {
                cy.get(this.historySubTab).should('contain.text','Report Archive')
                cy.get(this.historySubTab).should('contain.text','Previously Monitored Suppliers')
            }
            else
            {
                if(subTabName == 'Add Supplier')
                {
                    cy.get(this.addSupplierSubTabHeader).should('contain.text','Option 1: Upload Suppliers')
                    cy.get(this.addSupplierSubTabHeader).should('contain.text','Option 2: Add Suppliers Manually')
                }
                else
                {
                    cy.get(this.preferencesTabHeader).should('contain.text','Notifications')
                }
            }
        })
    }
    clickOnPreviouslyMonitoredSuppliers()
    {
        cy.get(this.historySubTab).contains('Previously Monitored Suppliers').click()
        cy.get(this.supplierListTable).should('be.visible')
        cy.wait(1000)
    }
    searchSupplierInPrevMonitoredSuppTable(supplierName)
    {
        let supplierFound = false
        
        cy.get(this.supplierNamesInSupplierListTable).each(($supplier,$index)=>{
            cy.then(() => {
                if (supplierFound) {
                    return;
                }
            })
            if ($supplier.text().trim().includes(supplierName)) {
                supplierFound = true
            }
        }).then(() => {
            cy.wrap(supplierFound).as('supplierFoundInPrevMonListFlag')
        })
    }
    selectSupplierFromList(supplier_name)
    {
        cy.get(this.supplierNamesInSupplierListTable).contains(supplier_name).then((supplier_ele)=>{
            cy.get(supplier_ele).next().find(this.supplier_checkbox).scrollIntoView().check().should('be.checked')
        })
    }
    clickOnResumeMonitoringBtn(supplier_name)
    {
        cy.get(this.resumeMonitoringBtn).click()
        cy.wait(2000)
        cy.get(this.supplierNamesInSupplierListTable).should('not.contain',supplier_name)
    }
    clickOnReportArchive()
    {
        cy.get(this.historySubTab).contains('Report Archive').click() 
        cy.get(this.reportArchiveContainer).should('be.visible') 
    }
    selectMonth(month) 
    {
        cy.get(this.reportDateDD).select(month)
        cy.wait(500)
    } 
    selectSupplierForReport(supplier_name)
    {
        cy.get(this.facilityReportContainer).click().then(()=>{
            cy.get(this.listFacilityNameReport).should('be.visible')
            cy.get(this.listFacilityNameReport).select(supplier_name,{force:true})
            cy.wait(500)
        })
    }
    clickOnDownloadReportBtn()
    {
        cy.get(this.downloadReportBtn).invoke('attr', 'target', '_self').click()
        cy.wait(5000)
    }
}
export default history;
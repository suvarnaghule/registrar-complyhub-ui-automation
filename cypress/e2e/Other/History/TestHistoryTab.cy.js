import other from "../../../PageClass/OtherTab/History/history";
import monitorSupplier from "../../../PageClass/MonitorSuppliers/monitorSupplier";

describe('Validate History Tab', {
    viewportWidth: 1280,
    viewportHeight: 800
},() => {
    let inputData
    beforeEach(() => {
        cy.fixture('./OtherTab/History/history').then((data) => {
            inputData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)            
        })
    });

    it.only('Other Tab -> Previously Monitored Suppliers -> Resume Monitoring', () => {     
        cy.visit('/')
        const otherTabObj = new other()
        const monitorSuppObj = new monitorSupplier()
        otherTabObj.selectSubTabFromOtherTab("History")
        otherTabObj.clickOnPreviouslyMonitoredSuppliers()
        otherTabObj.searchSupplierInPrevMonitoredSuppTable(inputData.supplierName)
        cy.get('@supplierFoundInPrevMonListFlag').then((flag)=>{
            expect(flag).to.be.true
            otherTabObj.selectSupplierFromList(inputData.supplierName)
            otherTabObj.clickOnResumeMonitoringBtn(inputData.supplierName)
        }) 
        monitorSuppObj.clickOnHeaderTab("Monitor Suppliers") 
        monitorSuppObj.searchSupplier(inputData.supplierName)
        cy.get('@searchSupplierFlag').then((flag)=>{
            expect(flag).to.be.true
        })     
    }) 
    it('Other Tab -> Report Archive -> Download Report',()=>{
        cy.visit('/')
        const otherTabObj = new other()
        otherTabObj.selectSubTabFromOtherTab("History") 
        otherTabObj.clickOnReportArchive()
        otherTabObj.selectMonth(inputData.reportMonth)
        otherTabObj.selectSupplierForReport(inputData.supplierName)
        otherTabObj.clickOnDownloadReportBtn()
       // cy.window().then((win)=>{}).invoke('close')
        cy.task('readPdf','cypress/downloads/'+inputData.reportDownloadFileName).then((data)=>{
           // cy.log(data.text)
            expect(data.text).to.include(inputData.supplierName).and.to.include(inputData.reportMonth)
    })
}) 
})
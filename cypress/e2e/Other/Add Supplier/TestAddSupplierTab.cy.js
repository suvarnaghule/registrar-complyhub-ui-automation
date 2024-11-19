import other from "../../../PageClass/OtherTab/History/history";
import Facility360AddNew from "../../../PageClass/Facility360/FacilityDetails/Facility360AddNew";
import monitorSupplier from "../../../PageClass/MonitorSuppliers/monitorSupplier";
import monitorSupplierFilter from "../../../PageClass/MonitorSuppliers/applyFilterMonitorSupplier";

describe('Validate Other Tab', {
    viewportWidth: 1280,
    viewportHeight: 800
},() => {
    let inputData
    beforeEach(() => {
        cy.fixture('./OtherTab/Add Supplier/addSupplier').then((data) => {
            inputData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)            
        })
    });
    it('Other Tab -> Add Supplier Tab -> Add supplier', () => {     
        cy.visit('/')
        const otherTabObj = new other()
        const newSupplierObj = new Facility360AddNew()
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        otherTabObj.selectSubTabFromOtherTab("Add Supplier")
        newSupplierObj.enterFacilityDetails(inputData.SupplierDetails)
        monitorSuppObj.clickOnHeaderTab("Monitor Suppliers")
        filterObj.clickOnFilterIcon()
        filterObj.selectFilter("Supplier Feed","Review")
        monitorSuppObj.searchSupplier(inputData.SupplierDetails.Name)
        cy.get('@searchSupplierFlag').then((flag)=>{
            expect(flag).to.be.true
        })
        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock('Country',inputData.SupplierDetails.Address1+inputData.SupplierDetails.City)
        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock('Country',inputData.SupplierDetails.CountryText)
    }) 
})
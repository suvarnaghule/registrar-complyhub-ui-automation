import ImporterMarketPlace from "../../../PageClass/CommonPages/ImporterMarketPlace";
import marketPlaceSearchFDAProductCategory from "../../../PageClass/ImporterMarketPlace/SearchProduct/searchFDAProductCategory";
import monitorSupplier from "../../../PageClass/MonitorSuppliers/monitorSupplier";
import marketPlaceApplyFilter from "../../../PageClass/CommonPages/ImporterMarketPlaceApplyFilter";

describe('Validate Find Qualified Suppliers Tab',{
    viewportWidth:1280,
    viewportHeight:800   
},()=>{
    let docData
    beforeEach(()=>{           
        cy.fixture('./ImporterMarketPlace/SearchProduct/searchFDAProductCategories').then((data)=>{
        docData = data 
        cy.loginMyFDA(data.UserName,data.UserPassword)                             
        })         
    });   
    
    it('Search & Filter FDA Product Category',()=>{
        cy.visit('/')
        const marketplaceObj = new ImporterMarketPlace()
        const searchFDAProdCatObj = new marketPlaceSearchFDAProductCategory()
        marketplaceObj.selectImporterMarketPlaceTab()
        cy.wait(10000)
        marketplaceObj.selectSearchFDAProdCatOption()
        searchFDAProdCatObj.searchFDAProductCategory(docData.FDAProductCategory)
        cy.wait(2000)
        searchFDAProdCatObj.verifySearchedProductCategory(docData.FDAProductCategory)
        cy.wait(2000)
        searchFDAProdCatObj.verifySearchedProductCategoryInFilter(docData.FDAProductCategory)
        cy.wait(500)
        searchFDAProdCatObj.applyProdCatFilter()
        cy.wait(2000)
        cy.get('@FDAProdCatName').then((fda_prod_cat)=>{
            searchFDAProdCatObj.verifySearchedProductCategory(fda_prod_cat)
        })
    })
    it('Add supplier to Monitoring list ',()=>{
        cy.visit('/')
        const marketplaceObj = new ImporterMarketPlace()
        const monitorSupplierObj = new monitorSupplier()
        const searchFDAProdCatObj = new marketPlaceSearchFDAProductCategory()
        marketplaceObj.selectImporterMarketPlaceTab()
        cy.wait(10000)
        marketplaceObj.selectSearchFDAProdCatOption()
        searchFDAProdCatObj.searchFDAProductCategory(docData.FDAProductCategory)
        cy.wait(2000)
        searchFDAProdCatObj.clickOnShowMoreOfFirstFDAProduct()
        marketplaceObj.clickOnMonitorNowBtn()
        cy.get('@monitorNowFacilityName').then(($supplierName)=>{
            cy.wait(2000)
            cy.visit('/') 
            monitorSupplierObj.searchSupplier($supplierName)
            cy.get('@searchSupplierFlag').then((monitorNowFlag) => {
                expect(monitorNowFlag).to.be.true
            })
        })
    })
    it('Search FDA Product Categories -> Apply Filter ',()=>{
        cy.visit('/marketplace')
        const marketplaceObj = new ImporterMarketPlace()  
        const searchFDAProdCatObj = new marketPlaceSearchFDAProductCategory()
        const filterObj = new marketPlaceApplyFilter()
        // marketplaceObj.selectImporterMarketPlaceTab() 
        cy.wait(10000)
        marketplaceObj.selectSearchFDAProdCatOption()
        searchFDAProdCatObj.searchFDAProductCategory(docData.FDAProductCategory)
        cy.wait(2000)
        searchFDAProdCatObj.clickOnShowMoreOfFirstFDAProduct()
        filterObj.applyCountryFilter(docData.CountryFilter)
        cy.wait(3000)
        filterObj.verifyCountryFilter(docData.CountryFilter)
        cy.wait(1000)
        filterObj.applyNoOfShipmentsFilter(docData.NoOfShipmentsFilter)
        filterObj.verifyNoOfShipmentsFilter(docData.NoOfShipmentsFilter) 
        cy.wait(500) 
        filterObj.applyMonthSinceLastShipmentFilter(docData.MonthLastShipmentFilter)
        filterObj.verifyMonthSinceLastShipmentFilter(docData.MonthLastShipmentFilter)       
    })
})    
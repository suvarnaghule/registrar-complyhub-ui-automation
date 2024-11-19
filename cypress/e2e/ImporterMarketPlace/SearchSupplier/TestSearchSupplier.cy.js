import ImporterMarketPlace from "../../../PageClass/CommonPages/ImporterMarketPlace";
import SearchSupplier from "../../../PageClass/ImporterMarketPlace/SearchSupplier/marketPlaceSearchSupplier";
import monitorSupplier from "../../../PageClass/MonitorSuppliers/monitorSupplier";
import marketPlaceApplyFilter from "../../../PageClass/CommonPages/ImporterMarketPlaceApplyFilter";
import marketPlaceAPI from "../../../API Tests/importerMarketPlaceAPI";

describe('Validate Importer MarketPlace Tab',{
  viewportWidth:1280,
  viewportHeight:800 
},()=>{
  let docData
     beforeEach(() => 
      {
        cy.fixture('./ImporterMarketPlace/SearchSupplier/marketPlaceSearchSupplier').then((data)=>{
          docData = data 
          cy.loginMyFDA(data.UserName,data.UserPassword)
          cy.visit('/marketplace').wait(10000)                            
        })         
      });
    
  it('Search Supplier',()=>{
          
        const searchSuppObj = new SearchSupplier()
        searchSuppObj.selectSearchSupplierOption()
        cy.wait(3000)
        searchSuppObj.searchSupplier(docData.supplierName)
        cy.wait(3000)
        searchSuppObj.clickOnMoreInfo(docData.supplierName)
       // searchSuppObj.verifyAdvertisedProductCat(docData.productCategory)
       // searchSuppObj.verifyAdvertisedProduct(docData.productName)
    
  })
  it('Add supplier to Monitoring list ',()=>{ 
 
    const marketplaceObj = new ImporterMarketPlace()
    const monitorSupplierObj = new monitorSupplier()
    const searchSuppObj = new SearchSupplier()

    searchSuppObj.selectSearchSupplierOption()
    cy.wait(3000)
    searchSuppObj.searchSupplier(docData.supplierName)
    cy.wait(3000)

    marketplaceObj.clickOnMonitorNowBtn()
    cy.get('@monitorNowFacilityName').then(($supplierName) => {
      cy.wait(2000)
      cy.visit('/')
      monitorSupplierObj.searchSupplier($supplierName)
      cy.get('@searchSupplierFlag').then((monitorNowFlag) => {
        expect(monitorNowFlag).to.be.true
      })
    })
  })

  it.only('Search supplier and Apply Filter ',()=>{

    const filterObj = new marketPlaceApplyFilter()
    const searchSuppObj = new SearchSupplier()
    const marketplaceAPIObj = new marketPlaceAPI()

    searchSuppObj.selectSearchSupplierOption()
    cy.wait(3000)
    searchSuppObj.searchSupplier(docData.supplierName)
    cy.wait(3000)
    filterObj.applyCountryFilter(docData.CountryFilter)
    cy.wait(3000)
    filterObj.verifyCountryFilter(docData.CountryFilter)
    cy.wait(1000)
    filterObj.applyNoOfShipmentsFilter(docData.NoOfShipmentsFilter)
    marketplaceAPIObj.verifyNoOfShipments().then((res)=>{
      expect(res.status).eq(200)
    })
    //filterObj.verifyNoOfShipmentsFilter(docData.NoOfShipmentsFilter)
    // cy.wait(500)
    // filterObj.applyMonthSinceLastShipmentFilter(docData.MonthLastShipmentFilter)
   // filterObj.verifyMonthSinceLastShipmentFilter(docData.MonthLastShipmentFilter)       
  })
})  
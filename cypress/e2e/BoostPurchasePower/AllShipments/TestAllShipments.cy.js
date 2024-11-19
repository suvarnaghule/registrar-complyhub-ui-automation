import monitorSupplier from "../../../PageClass/MonitorSuppliers/monitorSupplier";
import Facility360Shipment from "../../../PageClass/Facility360/Shipments/MyShipments/Facility360Shipment";
import ShipmentInsightTab from "../../../PageClass/Facility360/Shipments/AllShipments/Facility360ShipmentInsightTab";
import marketPlaceSearchFDAProductCategory from "../../../PageClass/ImporterMarketPlace/SearchProduct/searchFDAProductCategory";

describe('Validate Boost Purchase Power Tab', {
    viewportWidth: 1280,
    viewportHeight: 800
}, () => {
    let shipmentData
    beforeEach(() => {
        cy.fixture('./BoostPurchasePower/AllShipments/shipments').then((data) => {
            shipmentData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)
            cy.visit('/boost-purchase-power')
        })
    });
    it('Boost Purchase Power Tab -> Search supplier & select FDA product category',()=>{       
        const monitorSuppObj = new monitorSupplier()
        const shipmentObj = new Facility360Shipment()
        monitorSuppObj.searchSupplier(shipmentData.supplier)
        cy.wait(3000)
        shipmentObj.selectShipmentProductCategory(shipmentData.productCatText)
        cy.wait(3000)
        shipmentObj.verifyProductCategoryInShipmentTable(shipmentData.productCatText,shipmentData.totalShipments)
        cy.wait(2000)
        shipmentObj.verifyShippingDetailsSummary(shipmentData.totalShipments,shipmentData.cleared,shipmentData.Detained,shipmentData.Refused);
    })
    it('Boost Purchase Power Tab -> Insights tab -> Verify top 10 suppliers for selected product category',()=>{ 
        const monitorSuppObj = new monitorSupplier()
        const shipmentObj = new Facility360Shipment()
        const insightTabObj = new ShipmentInsightTab()
        cy.fixture('./BoostPurchasePower/AllShipments/insights').then((data) => { 
            monitorSuppObj.searchSupplier(data.supplier)
            cy.wait(5000)
            cy.intercept({
                method: 'GET',
                path: '/dev/fda-import-data/shipment-insights*',
                query:{
                    PRDCT_CODE_DESC_TEXT:data.productCatText
                }
            }
            ).as('ShipmentInsightData')
            shipmentObj.selectShipmentProductCategory(data.productCatText)
            cy.wait(3000)       
            insightTabObj.selectInsightsTab()
            cy.wait(1000)
            cy.wait('@ShipmentInsightData').then(({ request, response }) => {
                insightTabObj.verifyTop10ExportersThroughAPI(response.body.data.topExporters,response.body.data.totalShipments,'Importer')         
            })
        })    
    }) 
    it.only('Boost Purchase Power Tab -> Insights tab -> Verify top 100 suppliers for selected product category',()=>{ 
        const monitorSuppObj = new monitorSupplier()
        const shipmentObj = new Facility360Shipment()
        const insightTabObj = new ShipmentInsightTab()
        cy.fixture('./BoostPurchasePower/AllShipments/insights').then((data) => { 
            monitorSuppObj.searchSupplier(data.supplier)
            cy.wait(5000)
            cy.intercept({
                method: 'GET',
                path: '/dev/fda-import-data/shipment-insights*',
                query:{
                    PRDCT_CODE_DESC_TEXT:data.productCatText
                }
            }
            ).as('ShipmentInsightData')
            shipmentObj.selectShipmentProductCategory(data.productCatText)
            cy.wait(3000)       
            insightTabObj.selectInsightsTab()
            cy.wait(1000)
            //Show Top 100 modal
            insightTabObj.openTop100ExportersModal() 
            cy.wait('@ShipmentInsightData').then(({ request, response }) => {
                //cy.log(JSON.stringify(response.body.data.top100Exporters))
                insightTabObj.verifyTop100ExportersThroughAPI(response.body.data.top100Exporters,response.body.data.totalShipments,'Importer')         
            })                           
            //Close Top 100 modal
           // insightTabObj.closeShowTop100Modal()    
        })    
    }) 

    it('Boost Purchase Power Tab -> Insights tab ->  Navigate to Marketplace by using Goto Marketplace button ',()=>{ 
        const monitorSuppObj = new monitorSupplier()
        const shipmentObj = new Facility360Shipment()
        const insightTabObj = new ShipmentInsightTab()
        const marketplaceObj = new marketPlaceSearchFDAProductCategory()
        cy.fixture('./BoostPurchasePower/AllShipments/insights').then((data) => { 
            monitorSuppObj.searchSupplier(data.supplier)
            cy.wait(3000)
            shipmentObj.selectShipmentProductCategory(data.productCatText)
            cy.wait(3000)
            insightTabObj.selectInsightsTab()
            cy.wait(1000)
            insightTabObj.clickOnGotoMarketplaceButton()
            cy.wait(3000)
            marketplaceObj.verifyDefaultProdCatSelection(data.productCatText)
        })
    })
    it('Boost Purchase Power Tab -> Insights tab ->  Apply date filter ',()=>{ 
        const monitorSuppObj = new monitorSupplier()
        const shipmentObj = new Facility360Shipment()
        monitorSuppObj.searchSupplier(shipmentData.supplier)
        cy.wait(3000)
        shipmentObj.clickOnDatePicker("Arrival Start Date")
        shipmentObj.selectArrivalStartYear(shipmentData.shipmentArrivalDate)
        cy.wait(100)
        shipmentObj.selectArrivalStartMonth(shipmentData.shipmentArrivalDate)
        shipmentObj.selectArrivalStartDay(shipmentData.shipmentArrivalDate)
        cy.wait(200)
        shipmentObj.clickOnDatePicker("Arrival End Date")
        shipmentObj.selectArrivalStartYear(shipmentData.shipmentEndDate)
        cy.wait(100)
        shipmentObj.selectArrivalStartMonth(shipmentData.shipmentEndDate)
        shipmentObj.selectArrivalStartDay(shipmentData.shipmentEndDate)
        cy.wait(100)
        shipmentObj.clickOnApplyFilterButton()
        shipmentObj.verifyArrivalDateColInShipmentTable()        
    })
    it('Boost Purchase Power Tab -> Shipments tab ->  Verify cleared shipments ',()=>{ 
        let shipment_cleared_count
        const monitorSuppObj = new monitorSupplier()
        const shipmentObj = new Facility360Shipment()

        cy.intercept({
            method: 'GET',
            path: '/dev/fda-import-data/shipment*',
            query:{
                STATUS_Equals:shipmentData.shipmentSummaryStatus
            }
            //qs:'createToken=true,'
        }
        ).as('ShipmentData')
       
        monitorSuppObj.searchSupplier(shipmentData.supplier)
        
        //click on cleared (shipment) radio button   
        monitorSuppObj.selectShipmentSummaryRadioBtn(shipmentData.shipmentSummaryStatus)
        
        cy.wait('@ShipmentData').then(({ request, response }) => {
            cy.wait(3000)
            cy.log(response.body.meta.total)
            //monitorSuppObj.verifyShipmentSummaryCount(shipmentData.shipmentSummaryStatus,response.body.meta.total)           
        })
        
    })    

})    
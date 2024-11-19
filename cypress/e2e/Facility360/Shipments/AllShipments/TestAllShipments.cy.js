
import Login from "../../../../PageClass/CommonPages/Login";
import Facility360 from "../../../../PageClass/CommonPages/Facility360";
import AllShipment from "../../../../PageClass/Facility360/Shipments/AllShipments/Facility360ShipmentInsightTab"


const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
          cy.visit('https://dev-registrarcorp.myfda.com/');
       // cy.visit('https://monitor.dev.compliancemonitorapi.com/dashboard/login')
          cy.logger('application',"Launched Application-->Login Test");
            
      });  

  it.only('Verify top 10 countries and exporters for selected product category',()=>{  
    cy.fixture('./Facility360/Shipments/AllShipments/facility360ShipmentInsightTab').then((data) => {         
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const shipmentobj = new AllShipment();
            shipmentobj.selectShipmentTab()
            cy.logger('application',"Redirected to Shipment tab") 
            shipmentobj.selectAllShipmentTab()
            cy.logger('application',"Redirected to All Shipment tab")
            cy.wait(3000);
            shipmentobj.selectTopCountriesTab()
            cy.logger('application',"Redirected to Top countries tab")                        
            //Select product category
            shipmentobj.selectProductCategory(data.productCatText)
            cy.logger('application',"Selected product category")
            shipmentobj.applyFilter()
            cy.logger('application',"Filter is applied")
            cy.wait(2000) 
            shipmentobj.verifyTop10Countries(data.top10Countries[0].top10CountryName,data.top10Countries[1].top10CountryShipment,data.top10Countries[2].shipmentCount)
            cy.logger('application',"Top 10 countries along with shipment count is verified")
            shipmentobj.verifyTotalShipmentCount(data.top10Countries[2].shipmentCount)
            cy.logger('application',"Verified Total shipment count on Top 10 countries Tab ")
           
            shipmentobj.selectTopExportersTab()
            cy.logger('application',"Top exoprters tab is selected")
            shipmentobj.verifyTop10Exporters(data.top10Exporters[0].top10ExporterName,data.top10Exporters[1].top10ExporterShipment,data.top10Countries[2].shipmentCount)
            cy.logger('application',"Top 10 exporters along with shipment count is verified") 
            shipmentobj.verifyTotalShipmentCount(data.top10Countries[2].shipmentCount)
            cy.logger('application',"Verified Total shipment count on Top 10 exporters tab ") 
            
            //Show Top 100 modal
            shipmentobj.openTop100ExportersModal()
            //Close Top 100 modal
            shipmentobj.closeShowTop100Modal()        
           })  

}) 
it('Verify top 10 countries and exporters for default product category',()=>{  
  cy.fixture('./Facility360/Shipments/AllShipments/facility360ShipmentInsightTab').then((data) => {         
          const loginobj = new Login();
          loginobj.userLogin(data.UserName,data.UserPassword);
          cy.wait(2000);
          loginobj.verifyLoginSuccess();
          cy.logger('application',"Validated success Login Msg-->Login Test");
          const facility360 = new Facility360();
          facility360.selectFacility360Tab();
          cy.logger('application',"Redirected to facility360 tab")
          cy.get('.modal-content > a').click();
          facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
          cy.logger('application',"Facility selected"+data.facilityDDText)
          cy.wait(2000); 
          const shipmentobj = new AllShipment();
          shipmentobj.selectShipmentTab()
          cy.logger('application',"Redirected to Shipment tab") 
          shipmentobj.selectAllShipmentTab()
          cy.logger('application',"Redirected to All Shipment tab")
          cy.wait(3000);
          
          shipmentobj.selectTopCountriesTab()
          cy.logger('application',"Redirected to Top countries tab")     
          shipmentobj.verifyDefaultProductCat()
          cy.logger('application',"Verified default product category")
          shipmentobj.verifyTop10Countries(data.top10Countries[3].DefaultTop10CountryName,data.top10Countries[4].DefaultTop10CountryShipment,data.top10Countries[5].DefaultShipmentCount)
          cy.logger('application',"Verified Top 10 countries for default product category")
          shipmentobj.verifyTotalShipmentCount(data.top10Countries[5].DefaultShipmentCount)
          cy.logger('application',"Verified Total shipment count on Top 10 countries Tab ")
          
          shipmentobj.selectTopExportersTab()
          cy.logger('application',"Top exoprters tab is selected")
          shipmentobj.verifyTop10Exporters(data.top10Exporters[2].DefaultTop10ExporterName ,data.top10Exporters[3].DefaultTop10ExporterShipment,data.top10Countries[5].DefaultShipmentCount)
          cy.logger('application',"Verified Top 10 exporters for default product category")
          shipmentobj.verifyTotalShipmentCount(data.top10Countries[5].DefaultShipmentCount)
          cy.logger('application',"Verified Total shipment count on Top 10 exporters tab ")
          
          //Show Top 100 modal
          shipmentobj.openTop100ExportersModal()
          //Close Top 100 modal
          shipmentobj.closeShowTop100Modal()        
         
        /*  cy.get('@TotalShipmentCnt').then(count=>{
            cy.log('Shipment Count : '+count)
        })*/                    
         })  

}) 




})
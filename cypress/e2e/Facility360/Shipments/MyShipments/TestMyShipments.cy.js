
import Login from "../../../../PageClass/CommonPages/Login";
import Facility360 from "../../../../PageClass/CommonPages/Facility360";
import Facility360Shipment from "../../../../PageClass/Facility360/Shipments/MyShipments/Facility360Shipment"


const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
          cy.visit('https://dev-registrarcorp.myfda.com/');
          cy.logger('application',"Launched Application-->Login Test");
            
      }); 
      
  it('Verify that User can see details of selected product category shipments sent to US in last 5 years',()=>{
      cy.fixture('./Facility360/Shipments/MyShipments/facility360Shipment').then((facility360shipment) => {
        const loginobj = new Login();
        loginobj.userLogin(facility360shipment.UserName, facility360shipment.UserPassword);
        cy.wait(3000);
        loginobj.verifyLoginSuccess();
        cy.logger('application',"Validated success Login Msg-->Login Test");
        const facility360 = new Facility360();
        facility360.selectFacility360Tab();
        cy.logger('application',"Redirected to facility360 tab")
        cy.get('.modal-content > a').click();
        facility360.selectFacilityFromDD(facility360shipment.facilityDDText,facility360shipment.facilityDDValue);
        cy.logger('application',"Facility selected"+facility360shipment.facilityDDText)
        const facility360Shipment = new Facility360Shipment();
        facility360Shipment.selectShipmentTab();
        cy.logger('application',"User is on shipment tab");
        cy.wait(3000)
        facility360Shipment.selectShipmentSubTab();
        cy.logger('application',"by default my shipment sub tab is selected");
        facility360Shipment.selectShipmentProductCategory(facility360shipment.facilitySelectProductCataegory);
        cy.logger('application',"User has selected shipment product category and clicked on apply filter");
        cy.wait(3000)
        facility360Shipment.verifyShippingDetailsSummary(facility360shipment.all,facility360shipment.cleared,facility360shipment.Detained,facility360shipment.Refused);
        cy.logger('application',"verfiying the value for shipment details like all, cleared detained and refused");
        facility360Shipment.verifyProductCategoryInShipmentTable(facility360shipment.facilitySelectProductCataegory,facility360shipment.all)
        cy.wait(3000)
        //facility360Shipment.verifyShippingDetailsOnDoughNutChart(facility360shipment.facilitySelectProductCataegory)

      })   
  })
})
class Facility360AddNew{

    
    facilityName="input[placeholder='Supplier Name']"
    facilityAddressLine1="input[placeholder='Address Line 1']"
    facilityCity="input[name='PHYS_CITY']"
    facilityCountrylocator ="select[name='PHYS_COUNTRY']"
    facilitySubmitBtn="#addFacilityBtn"


    verifyManualAddFacility(facilityManualAdd){

        cy.contains(facilityManualAdd).should('include.text',facilityManualAdd)
    }

    enterFacilityDetails(supplierDetails){
        cy.get(this.facilityName).type(supplierDetails.Name).should('have.value',supplierDetails.Name)
        cy.get(this.facilityAddressLine1).type(supplierDetails.Address1)
        cy.get(this.facilityCity).type(supplierDetails.City)
        cy.get(this.facilityCountrylocator).select(supplierDetails.CountryText).should('have.value',supplierDetails.CountryValue)
        cy.get(this.facilitySubmitBtn).click()
    }

    verifyNewlyAddedFacility(){
        
    }

  





}

export default Facility360AddNew;
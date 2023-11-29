class Facility360{

    facilityTab="#facility360"
    facilityDD="//body/div[@id='myfdaBody']/div[3]/div[1]/div[1]/nav[1]/div[2]/ul[1]/li[1]/select[1]"
    facilityContactName="p i[class='fas fa-user']"
    facilityContactEmail = "a[class='mailto']"
    facilityContactPhone = "//body[1]/div[2]/div[3]/div[1]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/p[3]"
    facilityAbout = "p[class='about-block']"

    selectFacility360Tab(){

        cy.get(this.facilityTab).click()
    
    }

    selectFacilityFromDD(facilityname,value){
        cy.xpath(this.facilityDD).select(facilityname).should('have.value', value)
    }

    VerifyFacilityName(facilityName){
        cy.contains(facilityName).should('include.text',facilityName)
    }

    verifyDUNSNumber(DUNSNumber){
        cy.contains(DUNSNumber).should('include.text',DUNSNumber)
    }

    VerifyPrimaryContactAddress(name,email,phone){
        //cy.get(this.facilityContactName).contains(name).should('include.text',name)
        cy.get(this.facilityContactEmail).contains(email).should('include.text',email)
        //cy.xpath(this.facilityContactPhone).should('have.value',phone)

    }

    verifyEmployeesAtTheSite(){

    }

    verifyYearEastablished(){

    }

    verifyAnnualSales(){

    }

    verifyAbout(aboutDetails){
        cy.get(this.facilityAbout).should('include.text',aboutDetails)

    }









}

export default Facility360;
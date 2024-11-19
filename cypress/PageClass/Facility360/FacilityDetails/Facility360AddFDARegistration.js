class FDARegistration
{
    monitorFDARegistration="div[class='fda-registration-block'] a"
    fdaRegFormRequest="#requestFdaRegForm"
    fdaRegFormHeader="#requestFdaRegModal div[class='request-fda-reg-container'] h3"
    registrationMethod="input[name='requestFdaRegAction']"
    registrationType="input[name='requestFdaRegType']"
    fdaFoodRegNo="input[name='requestFdaFoodRegNumber']"
    fdaFoodRegPin="input[name='requestFdaRegPin']"
    fdaDrugRegNo="input[name='requestFdaDrugRegNumber']"
    fdaMedicalRegNo="input[name='requestFdaMedicalRegNumber']" 
    fdaCosmeticRegNo="input[name='requestFdaCosmeticRegNumber']"  
    fdaRegEmailAddr="input[name='requestFdaRegFacilityEmail']" 
    fdaRegEmailMsg="textarea[name='requestFdaRegMessage']"
    fdaRegSubmitBtn="#addReg"

    fdaRegForm="section[class='facility-reg-block uk-width-medium-1-2 uk-width-1-1']"
    fdaRegFormHeader="h2"
    fdaRegFormText="h3"
    fdaRegNo="input[name='fdaRegNumber']"
    fdaRegFormFoodPin="input[name='fdaRegPin']"
    submitFdaRegNo="button[type='submit']"

    facilityInfoBlock="div[class='uk-grid facility-info-block'] > span img[class='up-circle']"

    clickOnMonitorFDARegistration()
    {
        cy.get(this.monitorFDARegistration).contains('FDA Registration').click({force: true}).then(()=>{
            cy.get(this.fdaRegFormRequest).should('exist').and('be.visible')
            cy.get(this.fdaRegFormHeader).should('have.text','Add/ Edit FDA Registration')
        }) 
    }
    minimizeFacilityInfoBlock()
    {
        cy.get(this.facilityInfoBlock).click()
    }
    enterdetailsOfReg(regMethod,regType,regEmail,regNo,regPin,role)
    {
        let fda_reg_form,fdaRegNumber
        if(role == 'Importer')
            fda_reg_form = "div[id^='editFacilities'] "
        else
            fda_reg_form = "div[id^='requestFdaRegModal'] "

        if(regMethod == 'Manually')
            cy.get(fda_reg_form+this.registrationMethod).check('add').should('be.checked')
        else
            cy.get(fda_reg_form+this.registrationMethod).check('ask').should('be.checked')
        
        if(regType == 'Food')
        {
            cy.get(fda_reg_form+this.registrationType).check('food').should('be.checked').then(()=>{
                cy.get(fda_reg_form+this.fdaFoodRegNo).as('fdaRegNumber').should('be.visible') 
                   // cy.get(this.fdaFoodRegPin).clear().type(regPin)               
            })
        }    
        else
        { 
            if(regType == 'Drug')
            {
                cy.get(fda_reg_form+this.registrationType).check('drug').should('be.checked').then(()=>{
                    cy.get(fda_reg_form+this.fdaDrugRegNo).as('fdaRegNumber').should('be.visible')
                })
            }    
            else
            {
                if(regType == 'Medical')
                {
                    cy.get(fda_reg_form+this.registrationType).check('medical').should('be.checked').then(()=>{
                        cy.get(fda_reg_form+this.fdaMedicalRegNo).as('fdaRegNumber').should('be.visible')
                    })
                } 
                else
                {
                    cy.get(fda_reg_form+this.registrationType).check('cosmetic').should('be.checked').then(()=>{
                        cy.get(fda_reg_form+this.fdaCosmeticRegNo).as('fdaRegNumber').should('be.visible')
                    })
                }   
                
            }    
        }    
        cy.get(fda_reg_form+this.fdaRegEmailAddr).clear().type(regEmail).should('have.value',regEmail)
        cy.get('@fdaRegNumber').clear().type(regNo).should('have.value',regNo)
        if(regType == 'Food')
            cy.get(fda_reg_form+this.fdaFoodRegPin).clear().type(regPin).should('have.value',regPin) 
        cy.get(this.fdaRegSubmitBtn).click()
    }
    reqSupplierForRegNumber(regType,regEmail,role)
    {
        let fda_reg_form
        if (role == 'Importer')
            fda_reg_form = "div[id^='editFacilities'] "
        else
            fda_reg_form = "div[id^='requestFdaRegModal'] "
        cy.get(fda_reg_form + this.registrationMethod).check('ask').should('be.checked')
        if (regType == 'Food') {
            cy.get(fda_reg_form + this.registrationType).check('food').should('be.checked')
        }
        else {
            if (regType == 'Drug') {
                cy.get(fda_reg_form + this.registrationType).check('drug').should('be.checked')

            }
            else {
                if (regType == 'Medical')
                    cy.get(fda_reg_form + this.registrationType).check('medical').should('be.checked')
                else
                    cy.get(fda_reg_form + this.registrationType).check('cosmetic').should('be.checked') 
            }
        }
        cy.get(fda_reg_form + this.fdaRegEmailAddr).clear().type(regEmail).should('have.value', regEmail)
        cy.get(this.fdaRegSubmitBtn).click()
    }
    verifySuppliersFDARegForm(regType,regNo,regPin)
    {
        cy.get(this.fdaRegForm).should('be.visible')
        if(regType == 'Cosmetic')
            cy.get(this.fdaRegForm + " " + this.fdaRegFormHeader).should('have.text', 'YOUR SUPPLIER\'S U.S. COSMETIC REGISTRATION')
        else
            cy.get(this.fdaRegForm + " " + this.fdaRegFormHeader).should('have.text', 'YOUR SUPPLIER\'S U.S. FDA REGISTRATION')
        cy.get(this.fdaRegForm + " " + this.fdaRegFormText).should('contain.text', regType)
        if (regType == 'Food')
            expect(regNo).to.have.length(11)
        else {
            if (regType == 'Drug')
                expect(regNo).to.have.length(10)
            else
                expect(regNo).to.have.length.gte(5).and.lte(11)
        }
        cy.get(this.fdaRegNo).clear().type(regNo)
        if (regType == 'Food') {
            // expect (val.length).to.equal(11)
            cy.get(this.fdaRegFormFoodPin).type(regPin)
        }
    }
}
export default FDARegistration;
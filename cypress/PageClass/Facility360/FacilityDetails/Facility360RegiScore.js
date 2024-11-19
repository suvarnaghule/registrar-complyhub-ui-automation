
class Facility360RegiScore{

    facilityRegiPercentage = "div[class='percentage verylow']"
    facilityRegiRisk = "div[class='risk-label']"
    facilityRegiShipmentLast5Years =".uk-float-left > .uk-text-center"
    facilityRegiLastShipment = ".uk-margin-right > .uk-text-center"
    facilityRegiClearedShipment = ".row-2 > .uk-width-1-1 > :nth-child(1) > :nth-child(1)"
    facilityRegiImportAlert =".row-2 > .uk-width-1-1 > :nth-child(2) > :nth-child(1)"
    facilityRegiRefusedAndDetained = ".row-2 > .uk-width-1-1 > :nth-child(3) > :nth-child(1)"
    facilityRegiWarningLetter = ".uk-width-1-1 > :nth-child(4) > span"
    faciliyRegiClose = "#scoreDetailsModal > .uk-modal-dialog > .uk-close > .fas"
    


    verifyRegiScorePercentage(percentage){

        cy.get(this.facilityRegiPercentage).first().should('contain', percentage)
    }

    verifyRegiScoreRisk(risk){

        cy.get(this.facilityRegiRisk).first().should('contain', risk)
    }

    clickOnSeeDetailsBtn(btnlabel){

        cy.contains(btnlabel).click()


    }

    verifyRegiScorePopupDetails(shipment5years,lastshipmentdate,clearedshipment,ImportAlert,RefusedAndDerained,WarningLetter){
        cy.wait(10000)
        cy.get(this.facilityRegiShipmentLast5Years).contains(shipment5years)
        cy.get(this.facilityRegiLastShipment).contains(lastshipmentdate)
        cy.get(this.facilityRegiClearedShipment).contains(clearedshipment)
        cy.get(this.facilityRegiImportAlert).contains(ImportAlert)
        cy.get(this.facilityRegiRefusedAndDetained).contains(RefusedAndDerained)
        //cy.get(this.facilityRegiRefusedAndDetained).contains(RefusedAndDerained)
        cy.get(this.facilityRegiWarningLetter).contains(WarningLetter)
        
        
    }

    closethePopup(){

        cy.get(this.faciliyRegiClose).click()
    }














}

export default Facility360RegiScore;
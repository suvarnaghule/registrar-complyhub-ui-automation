class Facility360FDACompliance{
    facilityFDAComplianceTab="FDA Compliance Data"
    facilityFDAAudit="div[class='compliance-icon third-party-audits']"
    facilityFDAInspection="div[class='compliance-icon inspect-classifications']"
    facilityFDAWarning="div[class='compliance-icon warning-letters']"
    facilityFDAImportAlert="div[class='compliance-icon import-alerts']"
    facilityFDAImportRefusal="div[class='compliance-icon import-refusals']"
    facilityFDARecall="div[class='compliance-icon recalls']"


    selectFDAComplianceTab(){
        cy.contains(this.facilityFDAComplianceTab).click

    }

    verifyComplianceDEtails(audit,inspection,warning,importalert,importrefusal,recall){
        cy.get(this.facilityFDAAudit).children().invoke('attr','class').should('eq',audit)
        cy.get(this.facilityFDAInspection).children().invoke('attr','class').should('eq',inspection)
        cy.get(this.facilityFDAWarning).children().invoke('attr','class').should('eq',warning)
        cy.get(this.facilityFDAImportAlert).children().invoke('attr','class').should('eq',importalert)
        cy.get(this.facilityFDAImportRefusal).children().invoke('attr','class').should('eq',importrefusal)
        cy.get(this.facilityFDARecall).children().invoke('attr','class').should('eq',recall)

    }





}

export default Facility360FDACompliance;
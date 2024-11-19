import IgnoreDocument from "../../Facility360/Documents/SmartDMS/Facility360IgnoreDocument"
import importerMyDocuments from "../MyDocuments/importerMyDocuments"

const ignoreDocListNextBtn = "div[class='paginationIgnoreDocList'] ul li[class$='next']"
const importerMyDocTableNextBtn="ul li[class$='next']"

const ignoreDoc = new IgnoreDocument()
const myDocObj = new importerMyDocuments()

class pagination
{
    ignoreDocListCount = "div[class='paginationIgnoreDocList'] div[class='results-count']"
    ignoreDocListPreviousBtn = "div[class='paginationIgnoreDocList'] ul li[class$='previous']"
    //ignoreDocListNextBtn = "div[class='paginationIgnoreDocList'] ul li[class$='next']"

    getTotalCountOfRecords()
    {
        cy.get(this.ignoreDocListCount).invoke('text').then(($resultCountText)=>{
            cy.log($resultCountText)
            let count = $resultCountText.split("of")
            cy.log(count[1])
            cy.wrap(count[1]).as('recordCount')
        })
    }
    clickOnNext(fda_prod_cat)
    {     
       cy.get(ignoreDocListNextBtn).then(($nextBtn) => {
        ignoreDoc.verifyFilter(fda_prod_cat)
        if (!Cypress.dom.isVisible($nextBtn)) {
            cy.log('You are on the last page')
        }
        else {
            cy.wrap($nextBtn).wait(500).click().wait(4000)
            this.clickOnNext(fda_prod_cat)
        }
    })
    }
    ClickOnNextBtnOnImporterMyDocTable(supplier_name)
    {
       let next_btn_flag = true
        cy.get(importerMyDocTableNextBtn).then(($next)=>{
           // myDocObj.validateSupplierName(supplier_name)  
            if (!Cypress.dom.isVisible($next)) {
                cy.log('You are on the last page')
                next_btn_flag = false
            }
            else {
                cy.wrap($next).wait(500).click().wait(4000)
               // this.ClickOnNextBtnOnImporterMyDocTable(supplier_name)
            }
            cy.wrap(next_btn_flag).as('nextBtnVisibleFlag')
        })
    }
}
export default pagination;
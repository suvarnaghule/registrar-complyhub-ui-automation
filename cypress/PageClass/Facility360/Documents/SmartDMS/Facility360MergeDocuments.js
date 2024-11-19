class MergeDocument
{
    mergeDocIcon = "#mergeDocuments"
    mergeDocModal="#MergeSmartDocument"
    mergeDocModalTableRows = "#MergeSmartDocument table tbody tr"
    mergeDocModalTableFDACatCol="td:nth-child(1) p"
    mergeDocModalTableDocTypeCol="td:nth-child(2)"
    btnOnMergeDocModal="#MergeSmartDocument button"

    smartDMTableFDACatCol="#documentTable tr:first-child td:nth-child(2)"
    smartDMTableProductCodeCol="#documentTable tr:first-child td:nth-child(3)"
    smartDMTableDocCatCol="#documentTable tr:first-child td:nth-child(4)"
    smartDMTableDocTypeCol="#documentTable tr:first-child td:nth-child(5)"
    
    clickOnMergeDocIcon()
    {
        let i=1,j=1
        cy.get(this.mergeDocIcon).click().then(()=>{
            cy.get(this.mergeDocModal).should('exist').and('be.visible')
            cy.get(this.mergeDocModalTableRows).each(($row) =>{
                cy.wrap($row).within(()=>{
                    cy.get(this.mergeDocModalTableFDACatCol).then(($tableFdaCatCol)=>{
                        cy.get('@FdaCat'+i).then((fdaCat)=>{
                        expect($tableFdaCatCol.text().trim()).eq(fdaCat) 
                        i++                  
                        })                      
                    })
                    cy.get(this.mergeDocModalTableDocTypeCol).then(($tableDocTypeCol)=>{
                        cy.get('@DocType'+j).then((docType)=>{
                        expect($tableDocTypeCol.text().trim().toLowerCase()).eq(docType.toLowerCase()) 
                        j++                  
                        })                      
                    })
                })
            })
        })      
    }
    verifyMergedDoc(mergeDocCount)
    {
        for(let i=1;i<=mergeDocCount;i++)
        {
            let fda_cat= this.smartDMTableFDACatCol+" p:nth-child("+i+")"
            cy.get(fda_cat).then(($fda_cat)=>{
                cy.get('@FdaCat'+i).then((FdaCat) =>{
                    expect($fda_cat.text().trim()).eq(FdaCat)
                })             
            })
            let product_code = this.smartDMTableProductCodeCol+" p"
            cy.get(product_code).then(($product_code)=>{
                cy.get('@ProductCode'+i).then((ProductCode)=>{
                    expect($product_code.text().trim()).to.include(ProductCode)
                })
            })
        }

    }
    clickOnSaveBtn()
    {
        cy.get(this.btnOnMergeDocModal).contains('Save').click()
    }
}
export default MergeDocument;
class importerApplyFilter
{
    importerSupplierFilter="select[name='facilityFilter']"

    importerTableDocSupplierCol="td:nth-child(7) p"

    applyFilterBtn="button[class$='apply-button']"

    importerTableDocRows="table[class='uk-table docs'] tr[id^='parent']"
    importerTableMyDoc="div[class='doc-results']"

    importerFilter(filterType,filter,filterValue)
    {
        let select_filter,table_doc_col,filterText
        if(filterType == 'Supplier')
        {
            select_filter=this.importerSupplierFilter
            table_doc_col=this.importerTableDocSupplierCol 
            filterText = filter.split("-")       
        }
        cy.get(select_filter).select(filter).should('have.value',filterValue)
        cy.wait(200)
        cy.get(select_filter+" option:selected").invoke('text').should('eq',filter)  
        cy.wait(1000)      
        cy.get(this.applyFilterBtn).click()
        cy.wait(2000)    
        cy.get(this.importerTableMyDoc).children().invoke('attr','class').then(($attr)=>{
            if($attr.includes("no-doc-results"))
            {
              cy.log("No documents found")
            } 
            else
            {  
                 cy.get(this.importerTableDocRows).each(($row) =>{
                    cy.wrap($row).within(()=>{                
                        cy.get(table_doc_col).each(($col)=>{
                            cy.wrap($col).within(()=>{                                                
                               if(filterType == 'Supplier')
                                expect($col.text().trim()).eq(filterText[0].trim())
                               else
                                expect($col.text().trim()).eq(filter)
                            })                  
                        })                 
                    })
                })  
                
            }         
        })
    }
    
}
export default importerApplyFilter;
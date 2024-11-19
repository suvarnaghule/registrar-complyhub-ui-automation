class filter
{
    facility360TypeFilter="select[name='docTypeFilter']"
    facility360CatFilter="select[name='categoryFilter']"
    facility360ProductFilter="select[name='productFilter']"
    facility360ValidFilter="select[name='validToFilter']"
    
    

    facility360ApplyFilterBtn="button[class$='apply-button']"
    facility360ResetFilter="div[class='doc-search uk-clearfix'] a[href][class^='reset-filters']"
    
    facility360TableDocRows="table[class='uk-table docs'] tr[id^='parent']"
    facility360TableMyDoc="div[class='doc-results']"

    facility360TableDocTypeCol="td:nth-child(3) p"
    facility360TableDocCatCol="td:nth-child(4) p"
    facility360TableDocProductCol="td:nth-child(5) p"
    facility360TableDocStatusCol="td:nth-child(6) p"
    facility360TableDocValidToCol="td:nth-child(7) p"
 
    importerTableDocTypeCol="td:nth-child(5) p"
    importerTableDocCatCol="td:nth-child(6) p"
    importerTableDocFDAProdCatCol="td:nth-child(9)"

    importerSupplierFilter="select[name='facilityFilter']"

    applyFilter(filterType,filterValue,role)
    {
        let select_filter,table_doc_col
        let flag = false
        if(filterType=='Type')
        {
        select_filter = this.facility360TypeFilter
        table_doc_col = this.facility360TableDocTypeCol
            if(role == 'Importer')
            {
                table_doc_col = this.importerTableDocTypeCol
            }        
        }
        else
        {
            if(filterType == 'Category')
            {
            select_filter=this.facility360CatFilter
            table_doc_col=this.facility360TableDocCatCol
                if(role == 'Importer')
                {
                    table_doc_col = this.importerTableDocCatCol
                }
            }
            else
            {
                if(filterType == 'Product')
                {
                    select_filter=this.facility360ProductFilter
                    table_doc_col=this.facility360TableDocProductCol
                    if(role == 'Importer')
                    {
                        table_doc_col = this.importerTableDocFDAProdCatCol
                    }
                }            
            }
        }  
        if(filterType=='Product') 
        {
            cy.get(select_filter).select(filterValue).should('have.value',filterValue.toLowerCase())
            cy.wait(200)
            cy.get(select_filter+" option:selected").invoke('text').should('eq',filterValue)    
        } 
        else
        {                    
            cy.get(select_filter).select(filterValue.toLowerCase()).should('have.value',filterValue.toLowerCase())
            cy.wait(200)
            cy.get(select_filter+" option:selected").invoke('text').should('eq',filterValue.toLowerCase())
            
        }     
        cy.wait(1000)      
        cy.get(this.facility360ApplyFilterBtn).click()
        cy.wait(2000)  
        cy.get(this.facility360TableMyDoc).children().invoke('attr','class').then(($attr)=>{
            if($attr.includes("no-doc-results"))
            {
              cy.log("No documents found")
            } 
            else
            {               
                cy.get(this.facility360TableDocRows).each(($row) =>{
                    cy.wrap($row).within(()=>{                
                        cy.get(table_doc_col).each(($col)=>{
                            cy.wrap($col).within(()=>{                    
                                expect($col.text().trim()).contain(filterValue)
                            })                  
                        })                 
                    })
                })    
            }         
        })   
    }
    clickOnApplyFilter()
    {
        cy.xpath(this.facility360ApplyFilterBtn).click()
        cy.wait(2000)
    }  
    resetFilter(FilterType)
    {
        cy.wait(2000)
        cy.get(this.facility360ResetFilter).click()
        cy.wait(2000)
        cy.get(this.facility360TypeFilter+" option:selected").invoke('text').should('eq','All')
        cy.get(this.facility360CatFilter+" option:selected").invoke('text').should('eq','All') 
        cy.get(this.facility360ProductFilter+" option:selected").invoke('text').should('eq','All') 
        if(FilterType == 'Supplier')
        cy.get(this.importerSupplierFilter+" option:selected").invoke('text').should('eq','All')
    }
} 
export default filter;   
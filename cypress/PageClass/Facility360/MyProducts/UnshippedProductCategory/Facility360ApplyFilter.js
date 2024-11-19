class Filter
{
    productCategoryDD="select[class='dropdown-field category-filter']"
    publishStatusDD="select[class='dropdown-field status-filter']"
    applyFilterBtn="button[class^='blue-button apply-button']"
    resetFilterBtn="a[class='reset-filters']"

    ProductCatName="div[class^='parent-product-container parent-product'] div[class~='parent-product-category']"
    productCatAdvertiseToggle="div[class^='parent-product-container parent-product'] > div:nth-of-type(1) > div:nth-child(7) > i"
    
    applyFilter(filter)
    {
        let select_filter

        if(filter[0] == "productCategory")
            select_filter=this.productCategoryDD
        else    
            select_filter=this.publishStatusDD

        cy.get(select_filter).select(filter[1]).should('have.value',filter[1])
        cy.get(select_filter+" option:selected").invoke('attr','value').should('eq',filter[1])
        cy.get(this.applyFilterBtn).click()
    }
    verifyFilter(filter)
    {
        if(filter[0] == "productCategory")
        {
            cy.get(this.ProductCatName).then(($productCat)=>{
                expect($productCat.text().trim()).to.eq(filter[1].toUpperCase())
            })
        }
        else
        {
           cy.get(this.productCatAdvertiseToggle).invoke('attr','class').should('contain','toggle-on')
        }
            
    }
    resetFilter()
    {
        cy.wait(2000)
        cy.get(this.resetFilterBtn).click()
        cy.wait(2000)
        cy.get(this.productCategoryDD+" option:selected").invoke('text').should('eq','All') 
    }
} 
export default Filter;
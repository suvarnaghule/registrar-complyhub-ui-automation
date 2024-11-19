class marketPlaceSearchFDAProductCategory
{
    searchFDAProdCatTextbox="#marketplaceSearch"
    searchFDAProdCatResult="div[class='productCategorySearchResults'] span[class^='productCategoryName']"
    prodCatFilterSublist="#productCategorySublist"
    firstProductCatEleInFilter="div:nth-child(1) label"
    prodCatCheckbox="input[type='checkbox']"
    prodCatSearchResult="div[class='productCategorySearchResults']"

    fdaProdCatRadioBtn="#byProduct"
    supplierListMarketplaceResult="div[class='marketplace-results']"
    fdaProdCatName="p[class='product-name']"

    searchFDAProductCategory(fdaProductCategory)
    {
       cy.get(this.searchFDAProdCatTextbox).clear({force:true}).as('textbox')
       cy.get('@textbox').type(fdaProductCategory)
    } 
    verifySearchedProductCategory(fdaProductCategory)
    {
        cy.get(this.searchFDAProdCatResult).each(($ele,$index,$list)=>{
            cy.get($ele).should('include.text',fdaProductCategory)
        })
    }
    verifySearchedProductCategoryInFilter(fdaProductCategory)
    {
        cy.get(this.prodCatFilterSublist+" "+"label").each(($ele,$index,$list)=>{
            cy.get($ele).should('include.text',fdaProductCategory)
        })
    }
    applyProdCatFilter()
    {
        cy.get(this.prodCatFilterSublist).should('be.visible')
        cy.get(this.prodCatFilterSublist+" "+this.firstProductCatEleInFilter).as('firstProdCat').invoke('text').then(($prodCatName)=>{
            cy.wrap($prodCatName.trim()).as('FDAProdCatName')
            cy.get(this.prodCatFilterSublist+" "+this.firstProductCatEleInFilter+" "+this.prodCatCheckbox).check().should('be.checked')  
        })      
    }
    clickOnShowMoreOfFirstFDAProduct()
    {
        cy.get(this.searchFDAProdCatResult).first().invoke('text').then((firstProduct)=>{
            cy.wrap(firstProduct.trim()).as('firstProductName')
            cy.log(firstProduct)
            cy.get(this.prodCatSearchResult+" "+"a[data-name='"+firstProduct+"']").click()
        })       
    }
    verifyDefaultProdCatSelection(prodCatText)
    {
        cy.get(this.fdaProdCatRadioBtn).should('be.checked')
        cy.get(this.searchFDAProdCatTextbox).should('have.value',prodCatText.toLowerCase())
        cy.get(this.supplierListMarketplaceResult).find(this.fdaProdCatName).each(($ele,$index,$list)=>{
            cy.get($ele).should('have.text',prodCatText)
        })
    }
}
export default marketPlaceSearchFDAProductCategory;    
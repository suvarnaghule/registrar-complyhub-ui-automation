class SearchSupplier
{
    radioBtnSearchSupplier="input[type='radio']"
    searchSupplierTextBox="#facilitySearch"
    listOfSuppliers="div[class='marketplace-results']"
    moreInfoBtn="div[class$='marketplace-actions'] button[class='more-info']" 

    moreInfoModal="#moreInfoModal div[class='modal-content']"
    moreInfoModalHeader="#moreInfoModal div[class='modal-content'] h1"
    productCatAvailableOnMoreInfoModal="#moreInfoModal div[class~='product-name']"
    prodCatList="#moreInfoModal div[class$='facility-product ']" 
    productNameUnderProdCat="p[class='exporter-product-title']"
   

    selectSearchSupplierOption()
    {
        cy.get(this.radioBtnSearchSupplier).check('byFacility',{force:true}).should('be.checked').and('have.value','byFacility')
    }
    searchSupplier(supplierName)
    {
        cy.get(this.searchSupplierTextBox).clear({force:true}).as('textbox')
        cy.get('@textbox').scrollIntoView().type(supplierName)
    }
    clickOnMoreInfo(supplierName)
    {
        cy.get(this.listOfSuppliers).first().then(($supplier)=>{
            cy.get($supplier).find(this.moreInfoBtn).click().then(()=>{
                cy.get(this.moreInfoModal).should('be.visible')
                cy.get(this.moreInfoModalHeader).should('contain.text',supplierName)

            })
        })
    }
    verifyAdvertisedProductCat(productCategory)
    {     
       cy.get(this.productCatAvailableOnMoreInfoModal).should('contain',productCategory.toUpperCase())
       cy.get(this.productCatAvailableOnMoreInfoModal).then(($productCatList)=>{
        cy.get($productCatList).each(($productCatEle,index,$list)=>{         
                 if($productCatEle.text().trim().includes(productCategory.toUpperCase()))
                {                                                            
                       cy.wrap(index).as('prodCatIndex') 
                      // expect($productCatEle.text().trim()).to.contain('Coming Soon')
                       return false;                                                                                                         
                }         
        }) 
       })
    }
    verifyAdvertisedProduct(productName)
    {
        cy.get('@prodCatIndex').then(($index)=>{
            cy.get(this.prodCatList).eq($index).find(this.productNameUnderProdCat).then(($product_name)=>{
                expect($product_name.text().trim()).eq(productName)            
            })
        })
    }
}
export default SearchSupplier;
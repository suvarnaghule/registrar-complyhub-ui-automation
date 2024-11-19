class AddProductCategory
{
    facility360MyProductsTab="li[class='tab products'] > a"
    facility360UnshippedProdCatTab="#unshipped > a"
    productCatDetails="div[class^='parent-product-container parent-product']"
    productCategory="div[class~='parent-product-category']"
    shipmentDate="div[class~='lastShpmnt']"
   
    expectedShipmentDate="div[class^='parent-product-container parent-product'] div[class~='lastShpmnt']"
    productCatAdvertiseToggle="div[class^='parent-product-container parent-product'] > div:nth-of-type(1) > div:nth-child(7) > i"

    addProductCatBtn="button[class^='unshippedProductCat blue-button product-category']"
    addProductCategoryHeader="#addProductCategoryModal h2"
    addProdCatForm="#addProductCategoryModal div[class='uk-form-row']"
    prodCatTextbox="#addProductCategoryModal #marketplaceSearch"
    shipmentDateTextbox="#addProductCategoryModal #shipmentdate"
    saveProdCatBtn="#addProductCategoryModal #save-category"
    addProductCatFirstOption="div[class='uk-dropdown'] > ul > li:first-child"
    productSearch="div[class^=search-form] input[name='productsSearch']"
    applyFilterBtn="button[class^='blue-button apply-button']"

    selectMyProductsTab()
    {
        cy.get(this.facility360MyProductsTab).click()  
    }
    selectUnshippedProductCategoryTab()
    {
        cy.get(this.facility360UnshippedProdCatTab).click()
    }
    viewProductCategory()
    {        
        cy.get(this.productCatDetails).then((productCat)=>{
            for(let i=0;i<productCat.length;i++)
            {
                cy.get(productCat).eq(i).as('productCat').find(this.productCategory).then(($productCatName)=>{
                    cy.log('The product category : '+$productCatName.text().trim()) 
                        cy.get('@productCat').find(this.shipmentDate).then(($shipmentDate)=>{
                            cy.log('The expected shipment date : '+$shipmentDate.text().trim())
                    })
                })
            }
        })
        cy.get(this.productCatAdvertiseToggle).should('have.attr','class').and('contain','parent-product-active')
    }
    addNewProductcategory(productCategory,shipmentDate)
    {
        cy.get(this.addProductCatBtn).click().then(()=>{
            cy.get(this.addProdCatForm).should('be.visible')
            cy.get(this.addProductCategoryHeader).invoke('text').should('eq','Add Product Category')
            cy.get(this.prodCatTextbox).clear().type(productCategory)
            cy.wait(3000)
            cy.get(this.addProductCatFirstOption).as('productCategoryFirst').click()
           /* cy.get(this.shipmentDateTextbox).then(($date)=>{
                cy.wrap($date).type(shipmentDate)
            })*/
            //clear().type(shipmentDate)
           cy.get(this.saveProdCatBtn).click()
           cy.wait(5000)
        })
    }
    searchProductCategory(searchProductCategory)
    {
        cy.get(this.productSearch).as('productSearch').clear()
        //.click()
        cy.get('@productSearch').type(searchProductCategory)
        cy.wait(2000)
        cy.get(this.applyFilterBtn).click()
        cy.wait(3000)     
    }
    verifyNewProductCategory(productCategory,shipmentDate)
    {
        cy.get(this.productCatDetails+" "+this.productCategory).then(($product_cat)=>{
            cy.get('@productCategoryFirst').then(($prodCatFirst)=>{
                expect($product_cat.text().trim()).to.eq($prodCatFirst.text().trim().toUpperCase())   
            })          
        })
    }
}
export default AddProductCategory;
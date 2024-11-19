class ShippedProductCategory
{
    shippedProdCatTab="#shipped > a"

    productContainerBlock ="div[class='exporter-product-container uk-width-1-2']"
    productTitle="p[class='exporterProductTitle']"
    productDescription="div[class~='exporter-product-description'] p"
    
    editProductBtn="div[class='exporter-product-container uk-width-1-2'] i[class^='edit-product exporter-product-edit exporter-product-edit']"
    editProductName="#expProductEditForm div[class='uk-grid uk-width-1-1 uk-grid-collapse'] div[class$='small exporter-product-info'] input[name='product-title']"
    editProductDesc="#expProductEditForm div[class='uk-grid uk-width-1-1 uk-grid-collapse'] div[class$='small exporter-product-info'] textarea[name='product-description']"

    editProductSave="button[class='blue-button exp-product-save']"
 
    selectShippedProductCategoryTab()
    {
        cy.get(this.shippedProdCatTab).click()  
    } 
    updateShippedProduct(productName,productDesc)
    {
        cy.get('@index').then((i)=>{
            cy.get(this.editProductBtn).eq(i).click().then(()=>{
                cy.get(this.editProductName).clear().as('productName')
                cy.wait(100)
                cy.get('@productName').type(productName,{force:true})
                cy.wait(100)
                cy.get(this.editProductDesc).clear().type(productDesc)
                cy.wait(100)
                cy.get(this.editProductSave).click()
            })
        })                  
    } 
    verifyProductIsUpdated(productName,productDesc)
    {
        cy.get('@index').then((i)=>{
            cy.get(this.productContainerBlock).eq(i).as('productContainerBlk').find(this.productTitle).then(($productTitle)=>{
                expect($productTitle.text().trim()).eq(productName)
                    cy.get('@productContainerBlk').find(this.productDescription).then(($productDescription)=>{
                        expect($productDescription.text().trim()).eq(productDesc)
                })
            })
        })   
    } 
}
export default ShippedProductCategory;
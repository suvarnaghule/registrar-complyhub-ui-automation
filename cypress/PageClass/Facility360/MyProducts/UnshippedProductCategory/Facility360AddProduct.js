class AddProduct
{
    facility360ProductCatName="div[class^='parent-product-container parent-product'] div[class~='parent-product-category']"
    facility360AddProductBtn="div[class^='parent-product-container parent-product'] a[class^='add-product blue-button']"

    facility360AddProductForm ="div[class$='small exporter-product-info']"
    addProductName="input[name='product-title']"                        //div[class$='exporter-product-title']
    productdescription="textarea[name='product-description']"

    addProductSaveBtn="div[class='uk-width-1-1 uk-flex uk-flex-right'] p[class^='btn blue-button exp-add-product-button exp-add-product-button']"
    addProductCancelBtn="div[class='uk-width-1-1 uk-flex uk-flex-right'] p"

    productContainerBlock="div[class='exporter-product-container uk-width-1-2']"
    productTitle="p[class='exporterProductTitle']"
    productDesc="p[class='uk-margin-small-top']"
    newProductLabel="div[class^='new-product']"

    addProductToUnshippedProdCat(product_name,product_desc)
    {
        cy.get(this.facility360ProductCatName).first().then(($product_cat)=>{          
                cy.wrap($product_cat.text().trim()).as('searchedProdCat')
                cy.get(this.facility360AddProductBtn).first().click().then(()=>{
                  cy.get(this.facility360AddProductForm).first().as('addProductForm').should('be.visible') 
                    cy.get('@addProductForm').find(this.addProductName).then((productName)=>{
                        cy.get(productName).type(product_name)
                    })
                    cy.get('@addProductForm').find(this.productdescription).then((productDesc)=>{
                        cy.get(productDesc).type(product_desc)
                    }) 
                    cy.get(this.addProductSaveBtn).first().click()
                    cy.wait(3000)
                    cy.get(this.addProductCancelBtn).contains('Cancel').first().click()
                    cy.wait(5000)
                })                  
        })
    }
    verifyNewProductAdded(product_name,product_desc,product_label)
    {
        cy.get(this.productContainerBlock).last().as('prodContainerBlock').then((prodContainerBlk)=>{
            cy.get(prodContainerBlk).find(this.productTitle).then(($product_title) =>{
                expect($product_title.text().trim()).eq(product_name)
            }) 
            cy.get(prodContainerBlk).find(this.productDesc).then(($desc)=>{
                expect($desc.text().trim()).eq(product_desc)
            }) 
            cy.get(prodContainerBlk).find(this.newProductLabel).then(($new_product_label)=>{
                expect($new_product_label.text().trim()).eq(product_label)
            })        
        })
    }
   
}
export default AddProduct;
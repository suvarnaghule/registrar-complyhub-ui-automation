class EditProduct
{
    //productContainerBlock="div[class='exporter-product-container uk-width-1-2']"
    productTitle="div[class='exporter-product-container uk-width-1-2'] p[class='exporterProductTitle']"
    editProductBtn="div[class='exporter-product-container uk-width-1-2'] i[class^='edit-product exporter-product-edit exporter-product-edit']"

    inputProductName ="div[class$='small exporter-product-info'] input[name='product-title']"   
    inputProductDesc="div[class$='small exporter-product-info'] textarea[name='product-description']"
    inputProductSave="button[class='blue-button exp-product-save']"

    addProductDocumentBtn="div[class='exporter-product-container uk-width-1-2'] div[class='exporter-product-documents'] a" 

    editProductForm="#expProductEditForm"
    closeEditProductFormIcon="#expProductEditForm div[class$='uk-close cros-mark']"

    searchProduct(searchproduct)
    {      
        cy.get(this.productTitle).then(($product_list)=>{
            for(let i=0;i<$product_list.length;i++)
            {          
                if( $product_list.eq(i).text().trim() == searchproduct)
                {
                    cy.wrap(i).as('index')
                    cy.log('Product '+searchproduct+' found') 
                    break;                 
                }
            }
        }) 
    }
    updateProduct()
    {
        cy.get('@index').then((i)=>{
            cy.get(this.editProductBtn).eq(i).click().then(()=>{
              // cy.get(this.inputProductName+"[value='"+product_name+"' ]").as('productName')          
                cy.get(this.inputProductName).eq(i).as('productName')
                cy.get(this.inputProductDesc).eq(i).as('productDesc')
                //.invoke('attr','value').should('eq',searchProduct)      
                cy.get('@productName').clear()
                cy.wait(100)
                cy.get('@productName').type('Update Automation Product',{force:true})
                cy.wait(100)
                cy.get('@productDesc').clear().type('Update product description')
                cy.wait(100)
                cy.get(this.inputProductSave).click()
            })
        })
    }
    closeEditProductForm()
    {
       cy.get(this.closeEditProductFormIcon).click().then(()=>{
        cy.get(this.editProductForm).should('not.be.visible')
       })
    }
}
export default EditProduct;
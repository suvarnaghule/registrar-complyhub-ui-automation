class AdvertisementWorkflow
{
    parentProductContainerBlk = "div[class^='parent-product-container parent-product']"
    productContainerBlk="div[class='exporter-product-container uk-width-1-2']"
    prodCatAdvertiseToggleBtn="i[class~='parent-product-active']"
    productAdvertiseToggleBtn="i[class~='exporter-product-active']"
    
    makeProductCategoryVisible()
    {
        cy.get(this.parentProductContainerBlk).first().then(($parentProduct)=>{
            cy.get($parentProduct).find(this.prodCatAdvertiseToggleBtn).as('prodCatToggle').click().then(()=>{
                cy.wait(1000)
                cy.get('@prodCatToggle').invoke('attr','class').should('contain','toggle-on')
            })
        })
    }
    makeProductVisible()
    {
        cy.get('@index').then((i)=>{
          cy.get(this.productContainerBlk).eq(i).find(this.productAdvertiseToggleBtn).as('productToggle').click().then(()=>{
            cy.wait(1000)
            cy.get('@productToggle').invoke('attr','class').should('contain','toggle-on')
          }) 
        })
    }
}
export default AdvertisementWorkflow;
class ImporterMarketPlace
{
    importerMarketPlaceTab="li[class^='marketplace-nav-link new-view'] a"
    marketPlaceRadioBtn="input[type='radio']"
    prodCatFilterHeader="div[class='filter-container'] h3[class*='productCat-filter']" 
    showMoreLink="a"
    monitorNowBtns="div[class*='marketplace-result'] div[class*='marketplace-actions'] button[class='monitor-now']"

    selectImporterMarketPlaceTab()
    {
        cy.get(this.importerMarketPlaceTab).click()
    }
    selectSearchFDAProdCatOption()
    {
        cy.get(this.marketPlaceRadioBtn).check('byProduct',{force:true}).should('be.checked').and('have.value','byProduct') 
    }  
    clickOnShowMoreOfFirstFDAProduct()
    {
        cy.get(this.searchFDAProdCatResult).first().invoke('text').then((firstProduct)=>{
            cy.wrap(firstProduct.trim()).as('firstProductName')
            cy.log(firstProduct)
            cy.get(this.prodCatSearchResult+" "+"a[data-name='"+firstProduct+"']").click()
        })       
    }
    clickOnMonitorNowBtn()
    {
        let shouldStop = false
        cy.get(this.monitorNowBtns).each(($ele, $index, $list) => {
            cy.then(() => {
                if (shouldStop) {
                    return
                }
                cy.get($ele).invoke('text').then(($monitorText) => {
                    // return $monitorText =='MONITOR NOW' ? false : true
                    if ($monitorText == 'MONITOR NOW') {
                        cy.get($ele).parent().siblings('.facility-name').invoke('text').then(($monitorNowFacility)=>{
                            cy.wrap($monitorNowFacility.trim()).as('monitorNowFacilityName')
                            cy.get($ele).click()
                            cy.wait(4000)
                            shouldStop = true
                        })                       
                    }
                })
            })
        })
    }
}
export default ImporterMarketPlace;
class marketPlaceApplyFilter
{
    countryFilterList ="div[class^='sublist country-filter']"
    countryFilterName="div[class^='sublist country-filter'] label"
    countryFilterNameCheckbox="input[type='checkbox']"
    marketplaceResultCountryName="div[class='marketplace-results'] div[class$='facility-data'] span[class='country-info'] span[class='country-name']"

    noOfShipmentsFilterHeader="#filterBy h3[class*='total-shipped-filter-title ']"
    monthLastShipmentFilterHeader="#filterBy h3[class*='shipment-filter-title']"
    lastShipmentFilter="#filterBy div[class*='last-shipped-filter']"
    noOfShipmentsFilter="#filterBy div[class*='slider shipments-slider']"
    sliderLabel="span[class^='ui-slider-label']"
    productDataInfo="div[class='marketplace-results'] div[class$='product-data']"
    shipmentInfo="p[class='shipment-title']"
    shipmentData="span[class='shipment-data']"

    marketplaceDataResult="div[class='marketplace-results'] "

    applyCountryFilter(countryFilter)
    {
        cy.get(this.countryFilterList).should('be.visible')
        cy.get(this.countryFilterName).contains(countryFilter).find(this.countryFilterNameCheckbox).check().should('be.checked')
    }
    verifyCountryFilter(countryFilter)
    {
        cy.get(this.marketplaceResultCountryName).each(($country,$index,$list)=>{
            cy.get($country).invoke('text').then(($country_name)=>{
                expect($country_name.trim()).eq(countryFilter)
            })
        })
    }
    applyNoOfShipmentsFilter(no_of_shipments_filter)
    {
        cy.get(this.noOfShipmentsFilterHeader).click().then(()=>{
        cy.get(this.noOfShipmentsFilter).should('be.visible')
        cy.get(this.noOfShipmentsFilter+" "+this.sliderLabel).contains(no_of_shipments_filter).click()
        cy.wait(2000)
       })
    }
    verifyNoOfShipmentsFilter(no_of_shipments)
    {
        cy.get(this.marketplaceDataResult).children().invoke('attr','class').then(($attr)=>{
            if($attr.includes("no-marketplace-results"))
            {
              cy.log("No results found")
            } 
            else
            {
                cy.get(this.productDataInfo).each(($productData)=>{
                    cy.get($productData).find(this.shipmentInfo).contains('Shipments Last 5 Years').then(($shipmentTitle)=>{
                        cy.get($shipmentTitle).find(this.shipmentData).then(($shipmentDataCount)=>{
                            cy.get($shipmentDataCount).invoke('text').then(($count)=>{
                                expect(parseInt($count)).to.be.greaterThan(parseInt(no_of_shipments))
                               }) 
                        })
                    })
                })          
            }
        })        
        
    }
    applyMonthSinceLastShipmentFilter(monthLastShipmentFilter)
    {
        cy.get(this.monthLastShipmentFilterHeader).click().then(()=>{
        cy.get(this.lastShipmentFilter).should('be.visible') 
        cy.get(this.lastShipmentFilter+" "+this.sliderLabel).contains(monthLastShipmentFilter).click()
        cy.wait(2000)           
        })
    }
    verifyMonthSinceLastShipmentFilter(monthLastShipmentFilter) {
        const cur_date = new Date()
        const cur_year = cur_date.getFullYear()
        const lastShipment = cur_date.getFullYear() - parseInt(monthLastShipmentFilter / 12)
        cy.get(this.marketplaceDataResult).children().invoke('attr','class').then(($attr)=>{
            if($attr.includes("no-marketplace-results"))
            {
              cy.log("No results found")
            } 
            else
            {
                cy.get(this.productDataInfo).each(($productData) => {
                cy.get($productData).find(this.shipmentInfo).contains('Last Shipped').then(($shipmentTitle) => {
                    cy.get($shipmentTitle).find(this.shipmentData).then(($shipmentDate) => {
                        cy.get($shipmentDate).invoke('text').then(($date) => {
                            const d = new Date($date)
                            expect(d.getFullYear()).to.be.within(lastShipment, cur_year)
                        })
                    })
                })
            })        
            }
        })           
    }
}
export default marketPlaceApplyFilter;
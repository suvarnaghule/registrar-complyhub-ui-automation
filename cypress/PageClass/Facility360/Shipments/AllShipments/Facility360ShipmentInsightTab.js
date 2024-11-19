
class AllShipment
{
    
    facility360shipmentTab=".shipments > .tab-link"
    facility360allShipmentTab="#exp-insight-tab > a"
    facility360selectProdCat="select[name='insightsProduct']"
    facility360applyFilterBtn=".insights-form > .uk-text-right > .blue-button"
    facility360topCountriesTab="#top-countries-tab"
    facility360topExportersTab="#top-exporters-tab"
    facility360topCountriesPieChart="#insightCountries"
    facility360topCountriesTable="div[class='uk-overflow-container uk-width-1-2 country-table-block'] table tbody tr"
    facility360totalShipment="div[class='uk-overflow-container uk-width-1-2 country-table-block'] table tfoot tr"
    facility360countryName="td:nth-child(2)"
    facility360countryShipment="td:nth-child(3)"
    facility360countryShipmentPerc="td:nth-child(4)"
    facility360topExporterTable="div[class*='insight-exporters-container'] div[class^='uk-overflow-container'] table tbody tr"
    facility360DefaultProdCat="div[id='productShipmentsLegendData'] > ul > li:first-child"
    facility360AllShipmentDefaultProdCat="select[name='insightsProduct'] option:selected"
    facility360ShowTop100="div[class='insight-results'] a"
    facility360ShowTop100Header="#top100ExportersModal div[class='modal-content'] > h3"
    facility360CloseShowTop100Modal="#top100ExportersModal button[class='uk-modal-close uk-close']"
    facility360exporterName=""
    facility360exporterShipment=""

    shipmentInsightsTab="ul[class='uk-tab shipments-insights'] li[id='insights']"
    importerShipmentSupplierName="td:nth-child(3)"
    importerSupplierShipmentCount="td:nth-child(5)"
    importerSupplierShipmentPerc="td:nth-child(6)"
    gotoMarketplaceButton="div[class='insights-summary'] button"

    top100ExporterTable="#top100ExportersModal div[class^='uk-overflow-container'] table tbody tr"
    top100SupplierName="td:nth-child(2)"
    top100SupllierShipmentCount="td:nth-child(4)"
    top100SupplierShipmentPerc="td:nth-child(5)"
    
    selectShipmentTab()
    {
        cy.get(this.facility360shipmentTab).click()
    }
    selectInsightsTab()
    {
        cy.get(this.shipmentInsightsTab).click().wait(500)
    }
    clickOnGotoMarketplaceButton()
    {    
        cy.window().then(win => {
            cy.stub(win, 'open').callsFake((url, target) => {
                expect(target).to.be.eq('_blank')
                // call the original `win.open` method
                // but pass the `_self` argument
                return win.open.wrappedMethod.call(win, url, '_self')
            }).as('open')
        })
        cy.get(this.gotoMarketplaceButton).click()
        cy.get('@open').should('be.called')
    }
    verifyDefaultProductCat()
    {
        cy.get(this.facility360DefaultProdCat).invoke('text').then(text => {
            // cy.log('Default Product category : '+text)
            cy.get(this.facility360AllShipmentDefaultProdCat).should('have.text', text);
         })
    }
    openTop100ExportersModal()
    {
        cy.get(this.facility360ShowTop100).click().should('be.visible').then(() => {
            cy.get(this.facility360AllShipmentDefaultProdCat).invoke('text').then(productCat => {
                cy.get(this.facility360ShowTop100Header).invoke('text').then((header_text)=>{
                    expect(header_text.toLowerCase().trim()).to.include(productCat.toLowerCase())
                })
            })             
        })
    }
    closeShowTop100Modal()
    {
        cy.get(this.facility360CloseShowTop100Modal).click().should('not.be.visible')
    }
    selectAllShipmentTab()
    {
        cy.get(this.facility360allShipmentTab).click()
    }
    selectTopCountriesTab()
    {
        cy.get(this.facility360topCountriesTab).click()
    }
    selectTopExportersTab()
    {
        cy.get(this.facility360topExportersTab).click();
    }
    selectProductCategory(productCatText)
    {
        cy.get(this.facility360selectProdCat).select(productCatText).should('have.value',productCatText.toLowerCase())
    }
    applyFilter()
    {
        cy.get(this.facility360applyFilterBtn).click()
    }
    verifyTop10Countries(countryName,countryShipment,totalShipmentCnt)
    {
        let i=0             
        cy.get(this.facility360topCountriesTable).each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.facility360countryName).then(($name)=>{                 
                        expect($name.text().trim()).eq(countryName[i].countryName)
                        cy.get(this.facility360countryShipment).then(($shipment)=>{               
                            expect(parseInt($shipment.text().trim())).eq(countryShipment[i].shipment)
                                cy.get(this.facility360countryShipmentPerc).then(($shipmentPerc)=>{                                  
                                    expect(parseFloat(($shipment.text().trim()*100/totalShipmentCnt).toFixed(1))).eq(parseFloat($shipmentPerc.text().trim()))
                                })
                         i=i+1 
                        })                                                                                                                                     
                })                              
            })
        })      
    } 
   /* verifyTop10Exporters(exporterName,exporterShipment,totalShipmentCnt,role)  
    {
        let i=0 
        let  supplier_or_country_name, supplier_shipment_count,supplier_shipment_perc
        if(role == 'Importer') 
        {
            supplier_or_country_name = this.importerShipmentSupplierName 
            supplier_shipment_count=this.importerSupplierShipmentCount
            supplier_shipment_perc=this.importerSupplierShipmentPerc
        }
        else
        {
            supplier_or_country_name = this.facility360countryName
            supplier_shipment_count=this.facility360countryShipment
            supplier_shipment_perc = this.facility360countryShipmentPerc
        }
                    
        cy.get(this.facility360topExporterTable).each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(supplier_or_country_name).then(($name)=>{                 
                        expect($name.text().trim()).eq(exporterName[i].exporterName)
                        cy.get(supplier_shipment_count).then(($shipment)=>{
                            expect(parseInt($shipment.text().trim())).eq(exporterShipment[i].shipment)
                            cy.get(supplier_shipment_perc).then(($shipmentPerc)=>{                                  
                                expect(parseFloat(($shipment.text().trim()*100/totalShipmentCnt).toFixed(1))).eq(parseFloat($shipmentPerc.text().trim()))
                        })
                         i=i+1 
                        })                                                                                                                                     
                })                              
            })
        })      

    } */
    verifyTop10ExportersThroughAPI(topExporters,totalShipmentCnt,role)
    {
        let i,shipment_count,ship_count_API,ship_count_GUI
        let  supplier_or_country_name, supplier_shipment_count,supplier_shipment_perc
        let topSupplierCountryName, supplierShipmentCount,supplierShipmentPerc

        if(role == 'Importer') 
        {
            supplier_or_country_name = this.importerShipmentSupplierName 
            supplier_shipment_count=this.importerSupplierShipmentCount
            supplier_shipment_perc=this.importerSupplierShipmentPerc
        }
        else
        {
            supplier_or_country_name = this.facility360countryName
            supplier_shipment_count=this.facility360countryShipment
            supplier_shipment_perc = this.facility360countryShipmentPerc
        }        
        for (let i = 1; i <= topExporters.length; i++) 
        {
            topSupplierCountryName = this.facility360topExporterTable + ":nth-child(" + i + ") " + supplier_or_country_name
            supplierShipmentCount = this.facility360topExporterTable + ":nth-child(" + i + ") " + supplier_shipment_count
            supplierShipmentPerc = this.facility360topExporterTable + ":nth-child(" + i + ") " + supplier_shipment_perc

            cy.get(topSupplierCountryName).then(($name) => {
                expect($name.text().trim().toLowerCase()).to.eq(topExporters[i - 1].name.toLowerCase())
            })
            cy.get(supplierShipmentCount).then(($shipment) => {
                shipment_count = $shipment
                expect(parseInt($shipment.text().trim())).eq(topExporters[i - 1].count)
            })
            cy.get(supplierShipmentPerc).then(($shipmentPerc) => {
                ship_count_API = parseFloat(shipment_count.text().trim() * 100 / totalShipmentCnt).toFixed(1)
                ship_count_GUI = parseFloat($shipmentPerc.text().trim()).toFixed(1)
                // expect(parseFloat(shipment_count.text().trim() * 100 / totalShipmentCnt).toFixed(1)).eq(parseFloat($shipmentPerc.text().trim()))
                expect(ship_count_API).eq(ship_count_GUI.toString())
            })                  
        }                      
    }
    verifyTop100ExportersThroughAPI(top100Exporters,totalShipmentCnt,role)
    {
        let i,shipment_count,ship_count_API,ship_count_GUI
        let  supplier_or_country_name, supplier_shipment_count,supplier_shipment_perc
        let topSupplierCountryName, supplierShipmentCount,supplierShipmentPerc

        if(role == 'Importer') 
        {
            supplier_or_country_name = this.top100SupplierName 
            supplier_shipment_count=this.top100SupllierShipmentCount
            supplier_shipment_perc=this.top100SupplierShipmentPerc
        }
      /*  else                                                                
        {
            supplier_or_country_name = this.facility360countryName
            supplier_shipment_count=this.facility360countryShipment
            supplier_shipment_perc = this.facility360countryShipmentPerc
        }  */       
        for (let i = 1; i <= top100Exporters.length; i++) 
        {
            topSupplierCountryName = this.top100ExporterTable + ":nth-child(" + i + ") " + supplier_or_country_name
            supplierShipmentCount = this.top100ExporterTable + ":nth-child(" + i + ") " + supplier_shipment_count
            supplierShipmentPerc = this.top100ExporterTable + ":nth-child(" + i + ") " + supplier_shipment_perc

            cy.get(topSupplierCountryName).then(($name) => {
                expect($name.text().trim().toLowerCase()).to.eq(top100Exporters[i - 1].name.toLowerCase())
            })
            cy.get(supplierShipmentCount).then(($shipment) => {
                shipment_count = $shipment
                expect(parseInt($shipment.text().trim())).eq(top100Exporters[i - 1].count)
            })
            cy.get(supplierShipmentPerc).then(($shipmentPerc) => {
                ship_count_API = parseFloat(shipment_count.text().trim() * 100 / totalShipmentCnt).toFixed(1)
                ship_count_GUI = parseFloat($shipmentPerc.text().trim()).toFixed(1)
                // expect(parseFloat(shipment_count.text().trim() * 100 / totalShipmentCnt).toFixed(1)).eq(parseFloat($shipmentPerc.text().trim()))
                expect(ship_count_API).eq(ship_count_GUI.toString())
            })                  
        }                      
    }
    verifyTotalShipmentCount(totalShipmentCount)
    { 
      let totalShipment;     
        cy.get(this.facility360totalShipment).each(($row)=>{
            cy.wrap($row).within(()=>{
                cy.get(this.facility360countryShipment).then(($shipmentCnt)=>{ 
                    totalShipment = parseInt($shipmentCnt.text().trim())              
                    expect(totalShipment).eq(totalShipmentCount) 
                    cy.wrap(totalShipment).as('TotalShipmentCnt')
                })
            })
        })
        
    } 
   

}
export default AllShipment;
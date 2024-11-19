import DateUtils from "../../../CommonPages/DateUtils"

const dateUtilObj = new DateUtils()

class Facility360Shipment{


    facilityShipmentTab=".shipments > .tab-link"
    facilityMyShipmentSubtab="My Shipments"
    facilitySelectProductCatagoery="select[name='shipmentsProduct']"
    facilityApplyFilterBtn="Apply Filter"
    facilityShipmentAll="div[class='shipments-summary'] span[class*='summary all'] span[class='number']"
    facilityShipmentCleared = "div[class='shipments-summary'] span[class*='summary cleared'] span[class='number']"
    facilityShipmentDetained = "div[class='shipments-summary'] span[class*='summary detained'] span[class='number']"
    facilityShipmentRefused = "div[class='shipments-summary'] span[class*='summary refused'] span[class='number']"

    shipmentTable="table[class^='shipments-table'] tbody tr"
    shipmentTableProductName=" td[class='product']"
    shipmentTableArrivalDate="td:nth-child(3)"
    doughNutChartTooltip="span[class='circleGraphToolTip']"
    legendTooltip="#legendToolTip"
    doughNutChartCanvas="#productShipmentsExporter"

    arrivalStartDate="input[name='shipmentsStart']"
    arrivalEndDate="input[name='shipmentsEnd']"
    datePicker="div[class$='datepicker']"
    navigateBackDatePicker="a[class='uk-datepicker-previous']"
    navigateForwardDatePicker="a[class='uk-datepicker-next']"
    monthYearDatePicker="div[class='uk-datepicker-heading']"
    daysDatePicker="table[class='uk-datepicker-table'] a[class=''],a[class='uk-active']"

    selectShipmentTab(){
        cy.get(this.facilityShipmentTab).click()
    }

     selectShipmentSubTab(){
        cy.contains(this.facilityMyShipmentSubtab).click().should('be.visible')     
    }

    selectShipmentProductCategory(productcategory){
        cy.get(this.facilitySelectProductCatagoery).as('fdaProdCatDD').wait(200)
        cy.get('@fdaProdCatDD').select(productcategory,{force:true})
        cy.get(this.facilitySelectProductCatagoery+" option:selected").invoke('text').should('eq',productcategory)
        cy.contains(this.facilityApplyFilterBtn).click().should('be.visible')
    }
    clickOnDatePicker(date)
    {
        let date_picker
        if (date == "Arrival Start Date") {
            date_picker = this.arrivalStartDate
        }
        else {
            date_picker = this.arrivalEndDate
        }
        cy.get(date_picker).click().then(() => {
            cy.get(this.datePicker).should('be.visible')
        })    
    }
    getMonthYearOfDatePicker()
    {
        let cal_month_year,cal_month,cal_year
        cy.get(this.monthYearDatePicker).invoke('text').then((month_year) => {
            cal_month_year = month_year.trim().split(" ")
            cal_month = cal_month_year[0]
            cal_year = cal_month_year[1]
            cy.wrap(cal_month).as('calMonth')
            cy.wrap(cal_year).as('calYear')
        })    
    }
    selectArrivalStartYear(date)
    {
        let cal_month_year,cal_month,cal_year         
                //select Year First
                this.getMonthYearOfDatePicker()
                cy.get('@calYear').then((cal_year)=>{
                    if (cal_year == date.year) {
                        cy.log('Year is selected')
                        return
                    }
                    else {
                        if (cal_year < date.year) {
                            cy.get(this.navigateForwardDatePicker).click()
                        }
                        else if (cal_year > date.year) {
                            cy.get(this.navigateBackDatePicker).click()
                        }
                    }     
                this.selectArrivalStartYear(date)
              })
                
    }
    selectArrivalStartMonth(date)
    {
        let cal_month_index,date_month_index 
        this.getMonthYearOfDatePicker()
        cy.get('@calMonth').then((cal_month)=>{
            cal_month_index = dateUtilObj.getMonthIndexFromName(cal_month)
            date_month_index = dateUtilObj.getMonthIndexFromName(date.month)
            if (cal_month_index == date_month_index) {
                cy.log('Month is selected')
                return
            }
            else {
                if (cal_month_index < date_month_index) {
                    cy.get(this.navigateForwardDatePicker).click()
                }
                else if (cal_month_index > date_month_index) {
                    cy.get(this.navigateBackDatePicker).click()
                }
            }     
        this.selectArrivalStartMonth(date)
      })   
    }
    selectArrivalStartDay(date)
    {
        cy.get(this.daysDatePicker).contains(date.day).click()
    }
    clickOnApplyFilterButton()
    {
        cy.contains(this.facilityApplyFilterBtn).click().should('be.visible')
    }
    verifyShippingDetailsSummary(all,cleared,detained,refused){

        cy.get(this.facilityShipmentAll).should('contain.text',all)
        cy.get(this.facilityShipmentCleared).should('contain.text',cleared)
        cy.get(this.facilityShipmentDetained).should('contain.text',detained)
        cy.get(this.facilityShipmentRefused).should('contain.text',refused)
    }
    verifyProductCategoryInShipmentTable(productcategory,all)
    {
        cy.get(this.shipmentTable).each(($row)=>{
           cy.wrap($row).within(()=>{
            cy.get(this.shipmentTableProductName).then(($productName)=>{
                expect($productName.text().trim()).eq(productcategory)
            })
           })
        })
        cy.get(this.shipmentTable).then((row)=>{
            expect(row.length).eq(all)
        })
    }
    verifyArrivalDateColInShipmentTable()
    {  
        let arrival_start_date, arrival_end_date
        cy.get(this.arrivalStartDate).invoke('val').then((start_date)=>{
             arrival_start_date = new Date(start_date)                 
        })      
        cy.get(this.arrivalEndDate).invoke('val').then((end_date)=>{
             arrival_end_date = new Date(end_date)
        })
        cy.get(this.shipmentTable).each(($row)=>{
            cy.wrap($row).within(()=>{
             cy.get(this.shipmentTableArrivalDate).invoke('text').then(($arrival_date)=>{
                const retrievedDate = new Date($arrival_date); 
                expect(retrievedDate).to.be.within(arrival_start_date,arrival_end_date)
             })
            })
         })  
    }
    verifyShippingDetailsOnDoughNutChart(productcategory)
    {
        cy.get(this.doughNutChartCanvas).then($canvas => {
            const canvasWidth = $canvas.width()
            const canvasHeight = $canvas.height()
            const canvasCenterX = canvasWidth / 2 ;
            const canvasCenterY = canvasHeight / 2 ;
            
           // const buttonX = canvasCenterX + ( ( canvasCenterX / 3 ) * 2 );
           // const buttonY = canvasCenterY + ( ( canvasCenterY / 3 ) * 2 );

            cy.wrap($canvas).scrollIntoView().trigger('mouseover').click(canvasCenterX,canvasCenterY).then(()=>{
                cy.get(this.doughNutChartTooltip).then(($doughNutChartTooltip)=>{
                    expect($doughNutChartTooltip.text().trim()).eq("BUTTER/BUTTER FLAVORED PREPARED DRY COOKIE MIX WITH MILK OR EGG: 100%,  count: 4")   
                })
            })          
            
            /*cy.get(this.legendTooltip).then(($legendTooltip)=>{
                let product_legend_tooltip = $legendTooltip.text().trim()
                expect($doughNutChartTooltip.text().trim()).eq(product_legend_tooltip)
                let tooltip=product_legend_tooltip.split(":")
                cy.log(tooltip[0])
            })*/
        })       
    }
}
export default Facility360Shipment;
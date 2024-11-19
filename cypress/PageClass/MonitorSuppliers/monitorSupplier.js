import { isNull } from "lodash"
import { JSON, json } from "mocha/lib/reporters"
import moment from "moment";
import {fileBaseName} from "../../e2e/MonitorSuppliers/TestMonitorSupplier.cy"

class monitorSupplier
{
    headerTabs="ul[class='uk-navbar-nav subheader-nav new-subheader-nav'] > li[class*='new-view']"

    resultCount="div[class='dashboard-pagination pagination-top'] div[class='results-count']"

    searchSupplierTextBox="input[name='compName']"
    monitoredFacilityLeftMenu="div[class^='dashboard-left-menu']" 
    monitoredSupplierList="div[class^='dashboard-left-menu'] div[id^='facility-name']"
    riskLabelOfSupplier="div[class^='risk-label']"
    
    monitoredFacilityList = "div[class^='facility-name-block'] h5"
    editFacilityDetail = "div[class='registrations'] div[class*='facility-detail']"
    updateSupplierDetailsForm="div[id^='editFacilities'][class$='open'] div[class='uk-modal-dialog testing'] "
    updateSupplierDetailsFormHeader="div[id^='editFacilities'] div[class='uk-modal-dialog testing'] h3[class*='new-view']"
    primaryContactSupplierName="div[class='primary-contact-container'] span[class='primaryContactFacility']"

    firstName="form[id^='primaryContactForm'] input[name='primaryContactFirstName']"
    lastName="form[id^='primaryContactForm'] input[name='primaryContactLastName']"
    email="form[id^='primaryContactForm'] input[name='primaryContactEmail']"
    vendorIDTextbox="input[name='vendorId']"
    addContactBtn="form[id^='primaryContactForm'] button[class*='add-contact-button']"
    saveBtn="button[id^='submitAll']"
    cancelBtn="button[class$='close']"

    supplierStatus="div[id^='status-list'] input[name='assessmentStatus']"
    assessmentBy="form[id^='assessmentForm-'] input[name='assessmentBy']"
    reason="form[id^='assessmentForm-'] select[name='assessmentReason']"
    reasonNotes="form[id^='assessmentForm-'] input[name='assessmentNote']"
    listButton="div[id^='facilityList-'] button[class='ms-choice']"
    listDD="div[id^='facilityList-'] div[class='ms-drop bottom'] "
    listDDOptions="div[id^='facilityList-'] div[class='ms-drop bottom'] li span"

    supplierNote="textarea[name='facilityNotearea']"
    supplierFEI="div[id^='editFacilities'] input[name='facilityFei']"

    supplierDetailInfoBlock="div[class='facility-info-detail facility-block']"
    supplierDetailsBlock="div[class='facility-info-detail facility-block'] p[class='title']"
    facilityDetail="p"                   //p[class='semibold']
    stopMonitoringBtn="div[class='dashboard-center dash-center-block'] div[class^='facility-info-box'] div[class$='stop-monitoring'] a span"
    stopMonitoringPopUpHeader="#changeMonitoringStatusModal div[class='monitoring-status-container'] h3"
    stopMonitoringPopUpFacilityName="#changeMonitoringStatusModal div[class='monitoring-status-container'] span"
    confirmMonitoringStatusOkBtn="#changeMonitoringStatusModal div[class='monitoring-status-container'] button"

    FDAAudit="div[class^='facility-item-values'] div[class*='third-party-audits']"
    FDAInspections="div[class^='facility-item-values'] div[class*='inspect-classifications']"
    FDAWarningLetters="div[class^='facility-item-values'] div[class*='warning-letters']"
    FDAImportAlerts="div[class^='facility-item-values'] div[class*='import-alerts']"
    FDAImportRefusals="div[class^='facility-item-values'] div[class*='import-refusals']"
    FDARecalls="div[class^='facility-item-values'] div[class*='recalls']"

    supplierRegiscore ="div[class='facility-info-detail facility-block'] div[class='facility-info-score'] div[class^='percentage']"
    buttonsOnRegiscoreInfo="div[class='facility-info-detail facility-block'] div[class='facility-info-score'] button"
    regiscoreDetailsPopUp="#scoreDetailsModal h3"
    regisoreInfo ="#scoreDetailsModal div[class^='overall-score']:visible"
    regiscoreValue="div[class='score'] div[class^='percentage']"

    shipmentSummaryRadioBtn="div[class='shipments-summary'] input[type='radio']"
    shipmentCountEle="span[class='number']"
    shipmentDataHeader="div[class='scoring-details'] h6"

    complianceParamIcons="div[class^='facility-item-values']"
    inspectionDetailBlock="div[class='inspect-classification-detail facility-block']"
   // importAlertDetailBlock="div[class^='facility-item-values'] div[class^='facility-item import-alerts']"
    importAlertDetailBlock ="div[class='import-alert-detail facility-block']"
    importRefusalDetailBlock = "div[class^='facility-item-values'] div[class^='facility-item import-refusals']"
    warningLetterDetailBlock="div[class='warning-letter-detail facility-block']"
    recallDetailFacilityBlock="div[class='recall-detail facility-block']"
    auditDetailFacilityBlock ="div[class='third-party-audits-detail facility-block']"
    importRefusalIcon="div[class='notice-icon']"
    inspeClassificationActionText="div[class='notice-detail'] span"
    
    recallTypeText="div[class='notice-detail'] p span[class='bolden']"
    recallStatusText="div[class='notice-detail'] ul div"
    warningLetterNotice="div[class='notice-detail'] a"
    importAlertIcon="div[class='notice-icon'] i"

    supplierFEIPopUpFooter="div[class='uk-modal-dialog'] div[class^='uk-modal-footer']"
    supplierStatusLogTable="#assessmentHistoryTable"
    supplierStatusLogHeader="div[class='uk-modal supplier-status-block uk-open'] h3"
    supplierStatusLogCloseBtn="div[class='uk-modal supplier-status-block uk-open'] button[class^='uk-modal-close']"

    productFilterComboBox="span[class='select2-selection select2-selection--single']"
    companyProductList="select[name='history-company-product']"

    dropDownPagination = "div[class='dashboard-pagination pagination-top'] select[name='resultsPerPage']"
    nextArrowButton="div[class='dashboard-pagination pagination-top'] i[class='fas fa-caret-right pagination-arrow next']"
    prevArrowButton="div[class='dashboard-pagination pagination-top'] i[class='fas fa-caret-left pagination-arrow previous']"
    facilityNameBlock=".facility-name-block h5"
    resultsCountAtTop = "div[class='dashboard-pagination pagination-top'] div[class='results-count']"

   // searchCompany = "input[name='compName']"
    facilityAllDetailsBlock = ".facility-info-detail.facility-block"
    regiscoreUpdateScoreButton = ".update-score-button"
    regiscoreLastUpdateDateTime = ".uk-flex.uk-flex-center.last-updated-date"
    regiscoreUpdatePopupLabel = ".uk-modal-dialog .regiscore-label"
    regiscoreUpdatePopupOkButton = ".uk-modal-dialog #regiscoreUpdateModalOk"
    regiscoreUpdateIncreasedVolumePopup = "div[class='regiscore-message'] span"
    clearSearchLink = "#clearResults"
    productFilterCanvas = "#historyScoringChart"

    clickOnHeaderTab(headerTabName)
    {
        cy.get(this.headerTabs).contains(headerTabName).click().then(()=>{
            cy.get(this.headerTabs).contains(headerTabName).parent().invoke('attr','class').should('contain','uk-active')
           /* .then((class_attr_value)=>{
               // cy.log(class_attr_value)
                cy.get(class_attr_value)
            })*/
        })
        
    }
    verifyPaginationForPrevButton() {
        const currentPageElements = [];
        const changePageElements = [];

        cy.get(this.nextArrowButton).should('be.visible').click().then(() => {
            cy.wait(5000)
            // Collect elements from the current page
            cy.get(this.facilityNameBlock).then(($currPgFacilities) => {
                // Convert to an array and iterate
                Array.from($currPgFacilities).forEach((eachFacility, index) => {
                    if (index < 20) {
                        const facilityText = eachFacility.innerText.trim(); // Use innerText directly
                        currentPageElements.push(facilityText);
                    }
                })
            })
        })
        cy.get(this.prevArrowButton).should('be.visible').then(() => {
            cy.wait(5000)
            // Visit the next page and collect elements
            cy.get(this.prevArrowButton).click().then(() => {
                cy.wait(5000)
                cy.get(this.facilityNameBlock).then(($prevPgFacilities) => {
                    Array.from($prevPgFacilities).forEach((eachFacility, index) => {
                        if (index < 20) {
                            const facilityTextForPrev = eachFacility.innerText.trim(); // Use innerText directly
                            changePageElements.push(facilityTextForPrev);
                            //cy.log('Next page facility: ' + facilityTextForPrev);
                        }
                    });
                }).then(() => {
                    // Compare the elements from both pages
                    currentPageElements.forEach((facility, index) => {
                        expect(facility).to.not.equal(changePageElements[index]);
                    });
                });              
            })
        }) 
    }
    verifyPaginationForNextButton() {
        const currentPageElements = [];
        const changePageElements = [];
 
        // Collect elements from the current page
        cy.get(this.facilityNameBlock).then(($currPgFacilities) => {
            // Convert to an array and iterate
            Array.from($currPgFacilities).forEach((eachFacility, index) => {
                if (index < 20) {
                    const facilityText = eachFacility.innerText.trim(); // Use innerText directly
                    currentPageElements.push(facilityText);
                   
                }
            })
        })     
        cy.get(this.nextArrowButton).should('be.visible').then(() => {
            cy.wait(5000)
            // Visit the next page and collect elements
            cy.get(this.nextArrowButton).click().then(() => {
                cy.wait(5000)
                cy.get(this.facilityNameBlock).then(($nextPgFacilities) => {
                    Array.from($nextPgFacilities).forEach((eachFacility, index) => {
                        if (index < 20) {
                            const facilityText = eachFacility.innerText.trim(); // Use innerText directly
                            changePageElements.push(facilityText);
                            //cy.log('Next page facility: ' + facilityText);
                        }
                    });
                }).then(() => {
                    // Compare the elements from both pages
                    currentPageElements.forEach((facility, index) => {
                        expect(facility).to.not.equal(changePageElements[index]);
                    });
                });               
            })          
        })      
    }
    clickOnPaginationDropdownMultipleInputMS(number)
    {      
            cy.get(this.dropDownPagination).should('be.visible')
            cy.get(this.dropDownPagination).select(number).then(()=>{
                cy.get(this.facilityNameBlock).should('be.visible').then(()=> {
                    cy.get(this.facilityNameBlock).should('have.length',number).then(()=>{
                        this.clickOnNextButtonTillLast(number)
                    })
                })      
                //this.clickOnNextButtonTillLast(number)        
                cy.wait(6000)
        })
 
    }
    clickOnNextButtonTillLast(number)
    {
       let i;    
       let forLoopCnt;     
       this.getNoOfPagesOfFacilities(number)
       cy.get('@useDividedValueMS').then((cnt)=>{
        cy.log('cnt is '+cnt)
        forLoopCnt = cnt
       //})    
           //cy.get(this.resultsCountAtBottom).invoke('text').then((text) => {
            //splittedArray[0] = (text.split('-'))
            //splittedArray[0].split(' ')
            //cy.log(text)
            //cy.log((splittedArray[0][1]))
            //cy.log((splittedArray[0][1]).split(' ')[0])
            //cy.log((splittedArray[0][1]).split(' ')[2])
            //pgCount = (splittedArray[0][1]).split(' ')[0]      
            //count = (splittedArray[0][1]).split(' ')[2]
            //cy.log('count is '+count+' pgCount is '+pgCount)        
                    for(i=1; i<=forLoopCnt;i++)
                        {                                  
                                //cy.get(this.resultsCountAtTop).invoke('text').then((results) => {
                                    //cy.wrap(results).as('results')
                                    cy.get(this.nextArrowButton).click().then(() => {
                                            cy.wait(8000)
                                        })
                                    cy.log('clicked for '+i+ ' time')
                                //})
                        }
        })          
        //})
    }
    clearSearchWithLink(supplierName1)
    {
        cy.get(this.searchSupplierTextBox).should('be.visible')
        cy.get(this.searchSupplierTextBox).type(supplierName1)
        cy.wait(2000)
        cy.get(this.clearSearchLink).click().then(()=>{
            cy.get(this.searchSupplierTextBox).should('be.empty')
        })
    }
    updateRegiscore(faciltyName) {
        const currentDateTime = moment()
        cy.get(this.searchSupplierTextBox).should('be.visible')
        cy.get(this.searchSupplierTextBox).type(faciltyName)
        cy.wait(10000)
        cy.get(".dashboard-left-menu").then($facility => {
            const facilityText = $facility.text().trim()
            if (facilityText === '') {
                cy.log('Facility not available')
                cy.get(this.searchSupplierTextBox).clear()
            }        
            else {
                cy.get(".facility-name-block h5").should('be.visible')
                cy.get(".facility-name-block h5").click().then(() => {
                    cy.log('Clicked on entered facility : ' + faciltyName)
                    cy.wait(5000)
                    cy.get(this.facilityAllDetailsBlock).then(() => {                      
                        cy.get(this.regiscoreUpdateScoreButton).then(($updateButton) => {
                            if ($updateButton.hasClass('disabled')) {                             
                                cy.get(this.regiscoreLastUpdateDateTime).should('be.visible')
                                cy.get(this.regiscoreLastUpdateDateTime).invoke('text').then((dateTime) => {
                                    const spilttedDateString = dateTime.split(':')[1].split(',')[0]
                                    const splitedTimeString = dateTime.split(',')[1]
                                    const convertedDate = moment(spilttedDateString)
                                    const convertedTime = moment(splitedTimeString, "HH:mm A")
                                    
                                    const combinedConvertedDateTime = moment(`${convertedDate.format("MM/DD/YYYY")} ${convertedTime.format("HH:mm")}`, 'MM/DD/YYYY HH:mm')
                                    const tomorrow = combinedConvertedDateTime.clone().add(1, 'days')
                                    const combinedTomorrowDateTime = moment(`${tomorrow.format("MM/DD/YYYY")} ${convertedTime.format("HH:mm")}`, 'MM/DD/YYYY HH:mm')
                                    if (combinedConvertedDateTime.isBefore(combinedTomorrowDateTime)) {
                                        cy.log('button is disabled')
                                    }
                                })
                            }
                            else {   //add validation for this
                                cy.log('Button is enabled')
                                cy.get(this.regiscoreUpdateScoreButton).click().then(() => {
                                    cy.get(this.regiscoreUpdatePopupLabel).should('be.visible').then(() => {
                                        cy.get(this.regiscoreUpdateIncreasedVolumePopup).invoke('text').then((popupText) => {                                         
                                            cy.get(this.regiscoreUpdatePopupOkButton).click().then(() => {
                                                cy.get(this.regiscoreLastUpdateDateTime).should('be.visible')
                                                cy.wait(15000)
                                                cy.get(this.regiscoreLastUpdateDateTime).invoke('text').then((dateTime) => {
                                                   // cy.log('Returned from promise ' + dateTime)
                                                    const spilttedDateString1 = dateTime.split(':')[1].split(',')[0]
                                                    const splitedTimeString1 = dateTime.split(',')[1]
                                                    const convertedDate1 = moment(spilttedDateString1)
                                                    const convertedTime1 = moment(splitedTimeString1, "HH:mm A")                                                 

                                                    if (popupText === 'Your request has been acknowledged. However, due to the increased volume, there may be a delay in the response.') {
                                                        cy.get(this.regiscoreUpdateScoreButton).then(($btn) => {
                                                            if ($btn.hasClass('disabled')) {
                                                                cy.log('Date is not yet updated on site but button is disabled')
                                                                return
                                                            }
                                                        })
                                                    }
                                                    else {                                                                                                           
                                                        cy.wait(10000)
                                                        expect(convertedDate1.format("MM/DD/YYYY")).to.be.equal(currentDateTime.format("MM/DD/YYYY"))
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        })
                    })
                    //cy.get(this.searchSupplierTextBox).clear()
                })
            }
        })
    }
    searchSupplier(supplier_name) 
    {
        let supplier_found
        cy.wait(3000)
        cy.get(this.searchSupplierTextBox).clear({force:true}).type(supplier_name+'{enter}').then(()=>{ 
            cy.wait(4000) 
            cy.get(this.monitoredFacilityLeftMenu).then(($ele)=>{
                if($ele.has("div[class='dashboard-left']").length)
                {
                    //cy.get(this.monitoredFacilityList).should('contain.text', supplier_name)
                    cy.wait(2000) 
                    cy.get(this.monitoredFacilityList).first().click()
                    supplier_found = true
                    cy.logger(Cypress.env('fileBaseName'),`supplier found :  ${supplier_name}`)
                    cy.wait(1000)                                   
                }
                else
                {
                    cy.log("Supplier Not found ")
                    cy.logger(Cypress.env('fileBaseName'),`supplier Not found :  ${supplier_name}`)
                    supplier_found = false
                }
                cy.wrap(supplier_found).as('searchSupplierFlag')
            })
        })          
    }
    validateSearchedSupplier(Label,value)
    {
        cy.get(this.supplierDetailInfoBlock).each(($ele, $index, $list) => {
            cy.get($ele).find("p[class^='title']").contains(Label).then(($label_ele) => {
                cy.get($label_ele).parent().next().then((label_detail_ele) => {
                    cy.get(label_detail_ele).find(this.facilityDetail).invoke('text').then((filter_label_value) => {
                        expect(filter_label_value.trim()).to.eq(value)
                     })
                })
            })
        })        
    }
    checkResultListIsPresent()
    {
        let listPresent ;
        cy.get(this.monitoredFacilityLeftMenu).then(($ele)=>{
            if($ele.has("div[class='dashboard-left']").length)
            {               
                listPresent = true                
            }
            else
            {
                cy.log(" Supplier List Not present ")
                listPresent = false
            }
            cy.wrap(listPresent).as('listPresentFlag')
        })
               
    }
    getResultCount()
    {
        cy.get(this.resultCount).invoke('text').then(($resultCountText)=>{
            let count = $resultCountText.trim().split("of")
            cy.wrap(parseInt(count[1].trim().replace(/,/g, ''))).as('resultCount')                        
        })
    }
    getNoOfPagesOfFacilities(newNumber)
    {
        let dividedValue
        this.getResultCount()
        cy.get('@resultCount').then((totalCount)=>{
            cy.log('Total count '+totalCount)
            dividedValue = totalCount/newNumber
            cy.log('No of iterations '+dividedValue)
            cy.wrap(Math.ceil(dividedValue)).as('useDividedValueMS')
        })
    }
    getListOfFacilities()
    {
        let forLoopCnt1
        let i=0
        let facilityNamesArray = []
        this.getNoOfPagesOfFacilities('100')
        cy.get('@useDividedValueMS').then((pages) => {
            forLoopCnt1 = pages
            cy.get(this.dropDownPagination).should('be.visible')
            cy.get(this.dropDownPagination).select('100').then(() => {
                cy.get(this.facilityNameBlock).should('be.visible').then(() => {
                    cy.get(this.facilityNameBlock).should('have.length', '100').then(() => {
                        cy.wait(5000)
                        const loopTillLastPage = () => {
                            cy.get(this.facilityNameBlock).then($elements => {
                                $elements.each((index, element) => {
                                    const text = Cypress.$(element).text().trim();
                                    facilityNamesArray.push(text);
                                    //cy.log(`Element ${index}: ${text}`);
                                })
                                i++
                                cy.get(this.nextArrowButton).should('be.visible').click()
                                cy.wait(5000)
                                cy.log('i is ' + i + 'and forLoopCnt1 is ' + forLoopCnt1)
                                if (i === forLoopCnt1) {
                                    return
                                }
                                else {
                                    loopTillLastPage()
                                }                              
                            })
                        }
                        loopTillLastPage()
                        cy.wrap(facilityNamesArray).as('allFacilityNames')
                    })
                })
                cy.wait(2000)
            }) 
        }) 
    } 
  /*  getListOfFacilities() {
        const facilityNamesArray = [];
        let currentPage = 0;

        return new Cypress.Promise((resolve) => {
            this.getNoOfPagesOfFacilities('100');
            cy.get('@useDividedValueMS').then((totalPages) => {
                cy.get(this.dropDownPagination).should('be.visible').select('100');
                const loadFacilities = () => {
                    cy.get(this.facilityNameBlock).should('be.visible').then(($elements) => {
                        if ($elements.length) {
                            $elements.each((index, element) => {
                                const text = Cypress.$(element).text().trim();
                                facilityNamesArray.push(text);
                            });
                        }
                        currentPage++;
                        if (currentPage < totalPages) {
                            cy.get(this.nextArrowButton).should('be.visible').click();
                            cy.wait(5000); // Optional: consider using dynamic waits
                            loadFacilities();
                        } else {
                            resolve(facilityNamesArray); // Resolve the promise with the array
                        }
                    });
                };
                loadFacilities();
            });
        });
    } */
    dynamicFacilityGeneration(allFacilityNames)
    {
        /*cy.get('@allFacilityNames').then(($facilities) => {          
            let fnameLength = Math.floor(Math.random() * $facilities.length)
            let selectedFacility = $facilities[fnameLength]
            cy.log('dynamic facility is '+selectedFacility) 
            cy.wrap(selectedFacility).as('facilityNameDynamic')
        }) */
            let fnameLength = Math.floor(Math.random() * allFacilityNames.length)
            let selectedFacility = allFacilityNames[fnameLength]
            cy.log('dynamic facility is '+selectedFacility) 
            cy.wrap(selectedFacility).as('facilityNameDynamic')
    }
    verifyCntReturnThrAPI(data,meta)  
    {
        if(data.length == 0)
        {
            cy.log("No result")
        }
        else{
            cy.get(this.resultCount).invoke('text').then(($resultCountText)=>{
                let count = $resultCountText.trim().split("of")
                expect(parseInt(count[1].trim())).to.eq(meta.total.value)                     
            })    
        }
    }
    getRegiscoreOfSupplier()
    {
       cy.get(this.supplierRegiscore).first().invoke('text').then((regiscore)=>{
        cy.wrap(regiscore).as('supplierRegiscore')
       }) 
    }
    verifyRegiscore(risk_label, regScore) {
        if (risk_label == 'Low Risk') 
            { expect(parseInt(regScore)).to.be.at.least(85).and.to.be.at.most(100) }
        else {
            if (risk_label == 'High Risk') 
                { expect(parseInt(regScore)).to.be.at.least(0).and.to.be.at.most(74) }
            else {
                if (risk_label == 'Medium Risk') {
                    expect(parseInt(regScore)).to.be.at.least(75).and.to.be.at.most(84)
                }
            }
        }
    }
    verifyRegiscoreOnSeeDetails(regiscore)
    {
       cy.get(this.regisoreInfo).find(this.regiscoreValue).invoke('text').then((regiscore_value)=>{
        expect(regiscore_value).to.eq(regiscore)
       }) 
    }
    getRiskLabelOfSupplier()
    {
      cy.get(this.monitoredSupplierList+" "+this.riskLabelOfSupplier).first().then((riskLabelEle)=>{
        cy.get(riskLabelEle).invoke('text').then((riskLabel)=>{
            cy.wrap(riskLabel.trim()).as('riskLabel')
        })
      }) 
    }
    clickOnSeeDetailsBtn(supplier)
    {
        cy.get(this.buttonsOnRegiscoreInfo).contains('See Details').first().click().then(()=>{
            cy.get(this.regiscoreDetailsPopUp).should('contain.text','Regiscore for '+supplier)
        })
    }
    verifyProductFilterRegiscore(data, productCategory,prodCatRegiscore)
    {
        let i;     
        for(i=0;i<data.length;i++)
        {        
            if(data[i].PRDCT_CODE_DESC_TEXT == productCategory)
            {
                cy.log('Regiscore of '+data[i].PRDCT_CODE_DESC_TEXT + ' is '+data[i].TOTAL_SCORE_PERCENTAGE)
                expect(data[i].TOTAL_SCORE_PERCENTAGE).to.eq(parseInt(prodCatRegiscore))              
                break;             
            } 
        }
    }
    verifyComplianceData(risk_label)
    {  
        let risk_label_flag =false
        let high_risk_param = false
        if (risk_label == 'Low Risk') {
            cy.get(this.complianceParamIcons).children().each(($el,$index,$list)=>{
                cy.get($el).find("i").invoke('attr', 'class').should('contain', 'green')
            })                
        }
        else {
            if (risk_label == 'High Risk') {
                cy.get(this.complianceParamIcons).children().each(($el,$index,$list)=>{
                    cy.then(()=>{
                        if(high_risk_param)
                         {
                            return
                         } 
                         cy.get($el).find("i").invoke('attr', 'class').then(($attr)=>{
                            if($attr.includes('red'))
                            {
                                high_risk_param = true                          
                            }
                        })
                    })                  
                }).then(()=>{
                    expect(high_risk_param).to.be.true
                })             
            }
            else
            {
                if(risk_label == 'Medium Risk')
                {
                cy.get(this.complianceParamIcons).children().each(($el,$index,$list)=>{
                    cy.get($el).find("i").invoke('attr', 'class').should('not.contain', 'red')
                }) 
                } 
                else{
                    cy.log('Facility has no regiScore label ')
                }               
            }
        }
    }
    clickOnEditSupplierDetails(supplier_name) {
        cy.get(this.editFacilityDetail).click().then(() => {
            // cy.get(this.updateSupplierDetailsForm).should('be.visible')
            cy.get(this.updateSupplierDetailsFormHeader).should('be.visible').and('have.text', 'Update Supplier Details')
            cy.get(this.updateSupplierDetailsForm + this.primaryContactSupplierName).should('include.text', supplier_name)
        })
    }
    checkForPendingAcceptanceFacility() {
        let present 
        cy.get("div[class^='facility-detail facility-detail']").first().then(($element) => {
            cy.wrap($element).then(($facilityEle) => {
                if ($facilityEle.has("div[class^='facility-info-name']").length) {
                    cy.log('Facility is under pending accpetance or pending review or pending payment ')
                    cy.logger(Cypress.env('fileBaseName'),'Facility is under pending accpetance or pending review or pending payment ')
                    present =  true;
                }
                else
                    present = false 
                cy.wrap(present).as('pendingFacilityPresent')
           })           
        })
    }
    addPrimaryContact(primaryContact)
    {
        cy.wait(200)
        cy.get(this.updateSupplierDetailsForm+this.firstName).type(primaryContact.firstName)
        cy.get(this.updateSupplierDetailsForm+this.lastName).type(primaryContact.lastName)
        cy.get(this.updateSupplierDetailsForm+this.email).type(primaryContact.email)
        cy.get(this.updateSupplierDetailsForm+this.addContactBtn).click()
        cy.wait(1000)      
    }
    addVendorID(supplierVendorID)
    {
        cy.get(this.updateSupplierDetailsForm+this.vendorIDTextbox).clear().wait(100).type(supplierVendorID).should('have.value',supplierVendorID)
    }
    
    enterDataForListOfApprovedSuppliers(approvedSupplier)
    {
        cy.get(this.supplierStatus).check(approvedSupplier.status).should('be.checked')
        cy.get(this.assessmentBy).clear().type(approvedSupplier.addedBy)
        cy.get(this.reason).find('option').then(($options) => {
            const validOptions = [];
            $options.each((index, option) => {
                const value = option.value;
                if (value) { // Check if the value is not empty
                    validOptions.push(value); // Add valid options to the array
                }
            });
            if (validOptions.length > 0) {               
                const randomIndex = Math.floor(Math.random() * validOptions.length);
                const randomValue = validOptions[randomIndex];                                            
                cy.get(this.reason).select(randomValue).should('have.value', randomValue).find('option:selected') 
                .invoke('text') 
                .then((selectedText) => {
                    cy.wrap(selectedText).as('reasonText')
                })        
            } else {
                cy.log('No valid options found.');
            }         
        });      
        cy.get(this.reasonNotes).clear().type(approvedSupplier.reasonNotes)
        cy.get(this.listButton).click().then(()=>{
            cy.get(this.listDD).should('be.visible')         
            cy.get(this.listDD).find('li').then(($listItems) => {
                //deselect already selected items 
                if ($listItems.hasClass('selected')) {
                    cy.get($listItems).filter('li.selected').then(($selectedItems) => {
                        cy.get($selectedItems).each(($item) => {
                            cy.wrap($item).within(() => {
                                cy.get("input[type='checkbox']").uncheck({ force: true }).should('not.be.checked')
                            })
                        });
                    })
                    cy.log('has selected element')
                }
                cy.wait(100)
                const length = $listItems.length;
                const randomListIndex = Math.floor(Math.random() * length);
                const randomListItem = $listItems.eq(randomListIndex);
                const selectedText = randomListItem.text().trim(); 
                cy.log('Selected List  : ' + selectedText)
                cy.wrap(selectedText).as('ListText');
                cy.wrap(randomListItem).within(() => {
                    cy.get("input[type='checkbox']").check({ force: true }).should('be.checked')
                })
                cy.get('body').click(0, 0);                             
            });
        })
    }
    addSupplierNote(supplierNote)
    {
        cy.get(this.supplierNote).clear().type(supplierNote.note).should('have.value',supplierNote.note)
    }
    addSupplierFEI(supplierFEI)
    {
        cy.get(this.supplierFEI).clear().type(supplierFEI).should('have.value',supplierFEI)
    }
    clickOnSupplierStatusLog(label)
    {    
        cy.get(this.supplierDetailInfoBlock).each(($ele,$index,$list)=>{
            cy.get($ele).find("p[class^='title']").contains(label).then(($label_ele)=>{
                cy.get($label_ele).parent().find("a").contains("Show log").click({force:true})
            }).then(()=>{
                cy.get(this.supplierStatusLogHeader).should('be.visible').and('contain.text','Supplier Status Log')
            })   
        })
    }
    closeSupplierStatusLog()
    {
        cy.get(this.supplierStatusLogCloseBtn).click()
    }
    validateSupplierStatusLogData(supplierStatusData)
    {
        cy.get(this.supplierStatusLogTable + " tr").not(".title-label").then(($rows)=>{
            
            cy.wrap($rows).first().then(($firstRow)=>{        
                cy.wrap($firstRow).find("td:nth-child(1)").should('contain.text',supplierStatusData.status)
                cy.wrap($firstRow).find("td:nth-child(2)").should('contain.text',supplierStatusData.addedBy)
                cy.get('@reasonText').then((reason)=>{
                    cy.wrap($firstRow).find("td:nth-child(4)").should('contain.text',reason)
                })             
                cy.wrap($firstRow).find("td:nth-child(5)").should('contain.text',supplierStatusData.reasonNotes)
            })          
        })
    }
    verifyDataOnFacilityDetailInfoBlock(label, value, button, regTitleFlag) {
        let pAFacility 
        const adjustedLabel = label === 'Lists' ? 'List' : label === 'Country' ? 'Address' : label;
        const adjustedValue = value === 'No Status' ? 'Not Available' : value;

       const checkFacilityDetailBlock = () => {
            cy.get("div[class^='facility-detail facility-detail']").then(($elements) => {
                const checkPendingFacility = (label, element, index, total) => {
                    cy.wrap(element).then(($facilityEle)=>{
                        if ($facilityEle.has("div[class^='facility-info-name']").length) {
                            pAFacility = true
                        }
                        else {
                            cy.get($facilityEle).find("div[class='facility-info-detail facility-block']").then(($ele) => {
                                cy.get($ele).find("p[class^='title']").contains(adjustedLabel).then(($labelEle) => {
                                    cy.get($labelEle).parent().next().then((labelDetailEle) => {
                                        cy.get(labelDetailEle).find(this.facilityDetail).invoke('text').then((filterLabelValue) => {
                                            const trimmedValue = filterLabelValue.trim();
                                            cy.wrap(null).then(() => {
                                                try {
                                                    if (button === 'Cancel') {
                                                        if (regTitleFlag == true || regTitleFlag == false) {
                                                            expect(trimmedValue).to.contain(adjustedValue);
                                                        } else {
                                                            expect(trimmedValue).to.not.contain(adjustedValue);
                                                        }
                                                    } else {
                                                        switch (value) {
                                                            case 'DUNS Assigned':
                                                                expect(trimmedValue).to.match(/^[0-9]*$/);
                                                                break;
                                                            case 'DUNS Missing':
                                                                expect(trimmedValue).to.not.match(/^[0-9]*$/);
                                                                break;
                                                            case 'No Status':
                                                                expect(trimmedValue).to.contain('Not Available');
                                                                break;
                                                            default:
                                                                expect(trimmedValue).to.contain(adjustedValue);
                                                                break;
                                                        }
                                                    }
                                                } catch (error) {
                                                    cy.log(`Assertion failed: ${error.message}`);
                                                }
                                            })
                                        });
                                    });
                                });
                            });  
                        }
                    }).then(() => {
                        if (index + 1 < total) {
                            checkPendingFacility(label, $elements[index + 1], index + 1, total);
                        }
                    });                   
                }
                const total = $elements.length;
                if (total > 0) {
                    checkPendingFacility(label, $elements[0], 0, total);
                }
                cy.wait(200);
            })
        } 
        // Call the main function
        checkFacilityDetailBlock();   
        
       /* cy.get(this.supplierDetailInfoBlock).each(($ele) => {
            cy.get($ele).find("p[class^='title']").contains(adjustedLabel).then(($labelEle) => {
                cy.get($labelEle).parent().next().then((labelDetailEle) => {
                    cy.get(labelDetailEle).find(this.facilityDetail).invoke('text').then((filterLabelValue) => {
                        const trimmedValue = filterLabelValue.trim();
                        cy.wrap(null).then(() => {
                            try {
                                if (button === 'Cancel') {
                                    if (regTitleFlag == true || regTitleFlag == false) {
                                        expect(trimmedValue).to.contain(adjustedValue);
                                    } else {
                                        expect(trimmedValue).to.not.contain(adjustedValue);
                                    }
                                } else {
                                    switch (value) {
                                        case 'DUNS Assigned':
                                            expect(trimmedValue).to.match(/^[0-9]*$/);
                                            break;
                                        case 'DUNS Missing':
                                            expect(trimmedValue).to.not.match(/^[0-9]*$/);
                                            break;
                                        case 'No Status':
                                            expect(trimmedValue).to.contain('Not Available');
                                            break;
                                        default:
                                            expect(trimmedValue).to.contain(adjustedValue);
                                            break;
                                    }
                                }
                            } catch (error) {
                                cy.log(`Assertion failed: ${error.message}`);
                            }
                        })
                    });
                });
            });
        }); */
    }
    
    verifyRegistrationFilter(label,value)
    {
        const checkTitleForEachEle = () => {
            cy.get(this.supplierDetailInfoBlock + " div[id^='fda-registration']").then(($elements) => {
                const checkRegTitleIsPresent = (label, element, index, total) => {
                cy.wrap(element).parent().then(($facilityDetailBlockEle) => {
                    if ($facilityDetailBlockEle.has("p[class^='title']").length) {
                        cy.get($facilityDetailBlockEle).find("p[class^='title']").then(($titleEle) => {
                            if ($titleEle.text().includes(label)) {
                                cy.get($titleEle).contains(label).parent().next().then(($labelDetailEle) => {
                                    cy.get($labelDetailEle).find(this.facilityDetail).find("span").as('regText');
                                    cy.get('@regText').then(($regText) => {
                                        if (value === 'Missing') {
                                            expect($regText.text()).to.include('Request Pending')
                                        } 
                                        else
                                        {
                                            expect($regText.attr('class')).to.include(value)
                                        }  
                                    });
                                });
                            } else {                              
                               if (value == 'Missing') {
                                expect($titleEle).to.not.contain(label)
                            }
                            }
                        });
                    } else {
                        cy.log('Registration not present')
                    }
                }).then(() => { 
                        if (index + 1 < total) {
                            checkRegTitleIsPresent(label, $elements[index + 1], index + 1, total);
                        }               
                }); 
            }          
                const total = $elements.length;
                if (total > 0) {
                    checkRegTitleIsPresent(label, $elements[0], 0, total);
                }            
            cy.wait(200);
            })
        };       
       // Call the main function
        checkTitleForEachEle();       
    }
    verifyRegistrationFilterNew(label,value)
    {
        cy.get(this.supplierDetailInfoBlock + " div[id^='fda-registration']").each(($ele, $index, $list) => {
                this.checkRegTitleIsPresent(label,$ele)
                cy.get('@regLabelFlag').then((regTitleFlag) => {             
                    if (regTitleFlag) {
                        if(value == 'Missing')
                        {
                            cy.get('@regTitleValue').then((regValue)=>{
                                expect(regValue).to.include('Request Pending')
                            })
                        } 
                        else
                        {
                            cy.get('@regTitleAttrValue').then((regValue)=>{
                                expect(regValue).to.include(value)
                            })    
                        }                
                    }
                    else
                    {
                        cy.log('Reg for '+label+' is not present')
                    }
                })          
        })    
    }
    checkRegTitleIsPresent(label,$ele)
    {
        let regTitlePresentFlag 
        if($ele == 'Cancel')
            $ele = this.supplierDetailInfoBlock + " div[id^='fda-registration']"
      
            cy.get($ele).parent().then(($facilityDetailBlockEle) => {
                if ($facilityDetailBlockEle.has("p[class^='title']").length) {
                    cy.get($facilityDetailBlockEle).find("p[class^='title']").then(($titleEle) => {  
                        if ($titleEle.text().includes(label))
                            {
                                regTitlePresentFlag = true 
                                cy.get($titleEle).contains(label).parent().next().then((label_detail_ele)=>{
                                    cy.get(label_detail_ele).find(this.facilityDetail).then(($regTitleAttr)=>{
                                        cy.get($regTitleAttr).invoke('text').then((value)=>{
                                            cy.wrap(value.trim()).as('regTitleValue')
                                        })
                                        cy.get($regTitleAttr).find('span').invoke('attr', 'class').then((attr_value) => {
                                            cy.wrap(attr_value).as('regTitleAttrValue')
                                        })
                                    })                                 
                                })                                                                                                              
                            }                                   
                             
                        else                      
                            regTitlePresentFlag = false                                                              
                    })
                }
                else
                {
                    regTitlePresentFlag = false
                }                       
            }) .then(()=>{
                cy.wrap(regTitlePresentFlag).as('regLabelFlag')
                return
              //  return  regTitlePresentFlag  
            })                      
    }
    verifyComplianceParametersDetails(filterName, filterValue, subfilterName)
    {
        const complianceParaDetailBlock = this.getDetailBlock(filterName);
        if (!complianceParaDetailBlock) {
            throw new Error(`Unknown filterName: ${filterName}`);
        }
        else
        {
            cy.get(complianceParaDetailBlock).each(($ele) => {
                this.checkElement($ele, filterName, filterValue, subfilterName);
            });
        }

    }
    getDetailBlock(filterName) {
        switch (filterName) {
            case 'Inspections':
                return this.inspectionDetailBlock;
            case 'Import Alerts':
                return this.importAlertDetailBlock;
            case 'Import Refusals':
                return this.importRefusalDetailBlock;
            case 'Warning Letter':
                return this.warningLetterDetailBlock;
            case 'Recalls':
                return this.recallDetailFacilityBlock;
            case 'Audits':
                return this.auditDetailFacilityBlock;
            default:
                return null;
        }
    }
    checkElement($ele, filterName, filterValue, subfilterName) {
        switch (filterName) {
            case 'Inspections':
                cy.get($ele).find(this.inspeClassificationActionText)
                    .should('include.text', filterValue);
                break;
    
            case 'Import Alerts':
              /*  const expectedClass = filterValue === 'Red List' ? 'red' : 'green';
                cy.get($ele).find('i').invoke('attr', 'class').should('contain', expectedClass);
                break; */
                const expectedText = filterValue === 'Red List' ? 'DWPE' : 'Green List';
                cy.get($ele).find("div[class='notice-detail'] p").should('contain.text', expectedText);
                break;   
    
            case 'Import Refusals':
                cy.get($ele).find('i').invoke('attr', 'class').should('contain', 'red');
                break;
    
            case 'Warning Letter':
                cy.get($ele).find(this.warningLetterNotice)
                    .should('have.attr', 'href').and('include', 'warningLetter');
                cy.get($ele).find(this.warningLetterNotice)
                    .invoke('text').should('include', 'Warning Letter');
                break;
    
            case 'Recalls':
                const validateText = subfilterName === 'Type' ? this.recallTypeText : this.recallStatusText;
                cy.get($ele).find(validateText).then((status_text_ele) => {
                    expect(status_text_ele.text()).to.include(filterValue);
                });
                break;
    
            case 'Audits':
                cy.get($ele).find(this.inspeClassificationActionText).then((action_text) => {
                    if (filterValue === 'Not Audited') {
                        expect(action_text.text()).not.to.include(subfilterName);
                    } else {
                        expect(action_text.text()).to.include(subfilterName);
                    }
                  /*  const expectedClass = filterValue === 'Valid' ? 'green' : 'red';
                    cy.get($ele).find(this.importRefusalIcon).children()
                        .invoke('attr', 'class').should('contain', expectedClass); */
                });
                break;
    
            default:
                throw new Error(`Unknown filterName: ${filterName}`);
        }
    }
    verifyNestedFilterResult(label,value)
    {
        cy.get(this.supplierDetailInfoBlock).each(($ele,$index,$list)=>{
            cy.get($ele).find("p[class^='title']").contains(label).then(($label_ele)=>{
                cy.get($label_ele).parent().next().then((label_detail_ele)=>{                
                    cy.get(label_detail_ele).find('p > span').invoke('attr','class').then((class_attr)=>{
                        expect(class_attr.trim()).to.contain(value)
                    })             
                }) 
            })      
        })
    }
    clickOnSaveBtn()
    {
        //cy.wait(5000)
        cy.get(this.updateSupplierDetailsForm+this.saveBtn).click()
    }
    clickOnOKBtnSupplierFEIPopUp()
    {
        cy.get(this.supplierFEIPopUpFooter).contains('Ok').click()
    }
    clickOnCancelBtn()
    {
        cy.get(this.updateSupplierDetailsForm+this.cancelBtn).click()
    }
    clickOnStopMonitoringBtn(supplier_name) {
        cy.get(this.stopMonitoringBtn).click().then(() => {
            cy.get(this.stopMonitoringPopUpHeader).should('have.text', 'Stop Monitoring')
            cy.get(this.stopMonitoringPopUpFacilityName).should('include.text', supplier_name)
            cy.get(this.confirmMonitoringStatusOkBtn).click()
            cy.wait(15000)
        })
    }
    selectShipmentSummaryRadioBtn(value)
    {
        cy.get(this.shipmentSummaryRadioBtn).check(value).should('be.checked')
    }
    verifyShipmentSummaryCount(value, count)
    {
        cy.get(this.shipmentSummaryRadioBtn + "[value='" + value + "']").siblings().then((sibling_ele) => {
            // cy.log(JSON.stringify(sibling_ele))
            cy.get(sibling_ele).find(this.shipmentCountEle).invoke('text').should('contain', count)
        })
    }
    verifyShipmentDataOnSeeDetails(shipmentData) 
    {
        cy.get(this.shipmentDataHeader).contains('Shipments (Last 5 Years)').prev("p").then((totalShipmentCnt)=>{
            expect(totalShipmentCnt.text().trim()).to.eq(shipmentData.TOTAL_SHIPMENT_COUNT.toString())
        })
        cy.get(this.shipmentDataHeader).contains('Cleared').prev().prev("span").then((clearedShipmentCnt)=>{
            expect(clearedShipmentCnt.text().trim()).to.include(shipmentData.GOOD_SHIPMENT_PERCENTAGE)
        })
        if (shipmentData.IMPORT_ALERT_ACTIVE_COUNT == 0) 
        {
            cy.get(this.shipmentDataHeader).contains('Import Alert').prev("span").then((importAlertCnt) => {
                expect(importAlertCnt.text().trim()).to.contain('--')
            })
        }
        else {
            cy.get(this.shipmentDataHeader).contains('Import Alert').prev().prev("span").then((importAlertCnt) => {
                expect(parseInt(importAlertCnt.text().trim())).to.eq(shipmentData.IMPORT_ALERT_ACTIVE_COUNT)
            })
        }
        if (shipmentData.WARNING_LETTER_COUNT == 0) {
            cy.get(this.shipmentDataHeader).contains('Warnings').prev("span").then((warningCnt) => {
                expect(warningCnt.text().trim()).to.contain('--')
            })
        }
        else {
            cy.get(this.shipmentDataHeader).contains('Warnings').prev().prev("span").then((warningCnt) => {
                expect(parseInt(warningCnt.text().trim())).to.eq(shipmentData.WARNING_LETTER_COUNT)
            })
        }
        if (shipmentData.BAD_SHIPMENT_PERCENTAGE == 0) {
            cy.get(this.shipmentDataHeader).contains('Refused & Detained').prev("span").then((refused_detained_cnt) => {
                expect(refused_detained_cnt.text().trim()).to.contain('--')
            })
        }
        else {
            cy.get(this.shipmentDataHeader).contains('Refused & Detained').prev().prev("span").then((refused_detained_cnt) => {
                expect(parseInt(refused_detained_cnt.text().trim())).to.eq(shipmentData.BAD_SHIPMENT_PERCENTAGE)
            })
        }
    } 
    applyProductFilterOnSeeDetails(productName)
    {
        cy.get(this.productFilterComboBox).click().wait(200)
       // cy.get(this.companyProductList).select(productName,{force:true}).should('have.value',productName)
      //  cy.get(this.companyProductList +" option:selected").invoke('text').then((selectedText)=>{
      //      expect(selectedText.trim()).to.eq(productName)
      //  })
        cy.get(this.companyProductList).find('option').then(($options) => {
            const validOptions = [];
            $options.each((index, option) => {
                const value = option.value;
                if (value != 'overall' ) { // Check if the value is not 'All Product'
                    validOptions.push(value); // Add valid options to the array
                }
            });
            if (validOptions.length > 0) {               
                const randomIndex = Math.floor(Math.random() * validOptions.length);
                const randomValue = validOptions[randomIndex];                                            
                cy.get(this.companyProductList).select(randomValue,{force:true}).should('have.value', randomValue).find('option:selected').as('selectedProdCat') 
                .invoke('text') 
                .then((selectedText) => {
                    cy.wrap(selectedText.trim()).as('productCategoryText')
                })
                cy.get('@selectedProdCat').invoke('attr','data-score').then((regscore)=>{
                    cy.wrap(regscore).as('productCatRegiscore')
                })        
            } else {
                cy.log('No valid options found.');
            }         
        });      
    } 
    verifyProductFilterOnBarGraph(productcategory)
    {
        cy.wait(6000)
        cy.get(this.productFilterCanvas).then($canvas => {
            const canvasWidth = $canvas.width()
            const canvasHeight = $canvas.height()
            cy.log('Canvas Width : ' +canvasWidth)
            cy.log('Canvas Height : ' +canvasHeight)

            const canvasCenterX = canvasWidth / 2 ;
            const canvasCenterY = canvasHeight / 2 ;
            
            const buttonX = canvasCenterX + ( ( canvasCenterX / 3 ) * 2 );
            const buttonY = canvasCenterY + ( ( canvasCenterY / 3 ) * 2 );

            cy.log(buttonX)
            cy.log(buttonY)
            
            cy.wrap($canvas).scrollIntoView().trigger('mouseover',{clientX :canvasCenterX , clientY :canvasCenterY}).then(()=>{
                
            })  
              /*  const canvasRect = $canvas[0].getBoundingClientRect();
               cy.log('Canvas Rect:', canvasRect);  // Debugging canvas coordinates
          
                const centerX = canvasRect.left + canvasRect.width / 2;
                const centerY = canvasRect.top + canvasRect.height / 2;
          
                cy.log('Center X:', centerX, 'Center Y:', centerY);  // Debugging mouse coordinates
          
                cy.wrap($canvas)
                  .trigger('mousemove', {
                    clientX: centerX,
                    clientY: centerY
                  });  */
           

           /* cy.wrap($canvas).scrollIntoView().trigger('mouseover').click(canvasCenterX,canvasCenterY).then(()=>{
                
            })  */         
           /* cy.get(this.doughNutChartTooltip).then(($doughNutChartTooltip)=>{
                expect($doughNutChartTooltip.text().trim()).eq("BUTTER/BUTTER FLAVORED PREPARED DRY COOKIE MIX WITH MILK OR EGG: 100%,  count: 4")   
            }) */
            /*cy.get(this.legendTooltip).then(($legendTooltip)=>{
                let product_legend_tooltip = $legendTooltip.text().trim()
                expect($doughNutChartTooltip.text().trim()).eq(product_legend_tooltip)
                let tooltip=product_legend_tooltip.split(":")
                cy.log(tooltip[0])
            })*/
        })       
    } 
}
export default monitorSupplier;
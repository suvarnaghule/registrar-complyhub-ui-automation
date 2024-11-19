import monitorSupplier from "../../PageClass/MonitorSuppliers/monitorSupplier";
import FDARegistration from "../../PageClass/Facility360/FacilityDetails/Facility360AddFDARegistration";
import monitorSupplierFilter from "../../PageClass/MonitorSuppliers/applyFilterMonitorSupplier";
import monitorSupplierReport from "../../PageClass/MonitorSuppliers/monitorSupplierReports";
import ShareDoc from "../../PageClass/Facility360/Documents/MyDocuments/Facility360ShareDocument";
import history from "../../PageClass/OtherTab/History/history";

import randomData from "../../PageClass/MonitorSuppliers/generateRandomData";

const FDARegFixture = require('../../fixtures/MonitorSuppliers/monitorSupplierFDAReg.json')
const monitorSuppObject = new monitorSupplier()


let allFacilityNames = []

describe('Validate Monitor Supplier Tab', {
    viewportWidth: 1280,
    viewportHeight: 800
}, () => {
    let supplierData, randomFacilityData  
    const fileBaseName = Cypress.spec.name.split('.cy.js')[0];
    Cypress.env('fileBaseName', fileBaseName);
    beforeEach(function() {     
        cy.logger(fileBaseName,`${this.currentTest.title} : Test execution started`)
        cy.fixture('./MonitorSuppliers/monitorSupplier').then((data) => {
            supplierData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)
            cy.visit('/')
        })          
    }); 
    afterEach(function (){
        const title = this.currentTest.title        
        const status = this.currentTest.state === 'passed' ? 'passed' : 'failed';
        const message = status === 'failed' ? this.currentTest.err.message : 'Test passed successfully.'; 
        const logMessage = `[${title} | Status: ${status} | Message: ${message}\n`
        cy.logger(fileBaseName,logMessage)
        
       /* const msg = 'supplier found'       
        cy.task('checkLogFileForMessage',{baseName:fileBaseName,message:msg}).then((flag)=>{
            if(flag)
            {
                cy.log('How to retry test execution')
                cy.exec('npx cypress run --spec "cypress/integration/your_test_spec.js" --env grep="the current number of todo items"').then((result) => {
                    if (result.code !== 0) {
                        cy.log('Test execution failed again.');
                    } else {
                        cy.log('Test case rerun successfully.');
                    }
                }); 
            }
        })  */
    })
    before(()=>{    
      /* const randomdataObj = new randomData()
        const randomPrimaryContact = randomdataObj.generatePrimaryContact()
        const vid = randomdataObj.generateVendorID()
        const { registrationNumbers, regPin } = randomdataObj.generateRegNoandPin()
        const fei = randomdataObj.generateSupplierFEI()
               
        const combinedData = {
            primaryContact: randomPrimaryContact,
            supplierVendorID: vid,
            registrationNumbers: registrationNumbers,
            regPin : regPin,
            supplierFEI: fei
        };
        cy.log(JSON.stringify(combinedData, null, 2))
        cy.writeFile('cypress/fixtures/MonitorSuppliers/randomUser.json', combinedData)
            .then(() => {
                cy.log('Random user data saved as JSON file.');
                cy.fixture('./MonitorSuppliers/randomUser').then((data) => {
                    randomFacilityData = data
                })
            }); */  
        cy.task('deleteLogFile')
        cy.fixture('./MonitorSuppliers/monitorSupplier').then((data) => {
            supplierData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)
            cy.visit('/')
        })
       monitorSuppObject.getListOfFacilities()
        cy.get('@allFacilityNames').then((facilityNames)=>{
            allFacilityNames = facilityNames
            cy.log(allFacilityNames.length)
        }) 
    }) 
    it('Clear search',()=>{
        const monitorSuppObj = new monitorSupplier()
        supplierData.supplierByName.forEach((sn) => {
            monitorSuppObj.clearSearchWithLink(sn.supplierName)
        })
    })
    it('Update regiscore',()=>{
        const monitorSuppObj = new monitorSupplier()
        supplierData.facilityNameForUpdateRegiscore.forEach((facility) => {
            monitorSuppObj.updateRegiscore(facility.facilityName)
        })
    })
    it('Monitor Supplier - > Pagination from top buttons',()=>{
        const monitorSuppObj = new monitorSupplier()
        monitorSuppObj.verifyPaginationForPrevButton()
        monitorSuppObj.verifyPaginationForNextButton()        
        supplierData.recordNumberDetailsPaginationDropdown.forEach((pageDDValue) => {
            monitorSuppObj.clickOnPaginationDropdownMultipleInputMS(pageDDValue.recordsPerPageDD)
        })                  
    })
    it( 'Pagination count ',()=>{
        const inputString = "1-10 of 3,741";
        let newNumber=100

        const parts = inputString.split('of');       
        const numberWithCommas = parts[1].trim();     
        const numberWithoutComma = numberWithCommas.replace(/,/g, '');
        cy.log(numberWithoutComma); // Output: "3741"
        let  dividedValue = numberWithoutComma/newNumber
            cy.log(Math.ceil(dividedValue))       
    })
    it.only('Monitor Suppliers Tab -> Search Supplier and verify it\'s Regiscore', () => {
        const MAX_RETRIES = 3; 
        let retries = 0; 
        const monitorSuppObj = new monitorSupplier()
       /* monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.get('@searchSupplierFlag').then((supplier_found) => {
                if (supplier_found) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                            monitorSuppObj.getRiskLabelOfSupplier()
                            cy.get('@riskLabel').then((risk_label) => {
                               // monitorSuppObj.verifyComplianceData(risk_label)
                               if(risk_label != 'No RegiScore')
                               {
                                monitorSuppObj.getRegiscoreOfSupplier()
                                cy.get('@supplierRegiscore').then((regScore) => {
                                monitorSuppObj.verifyRegiscore(risk_label,regScore)
                                })
                               }                              
                            })
                        }
                    })
                }
            })
        })  */
        function verifyRegiScore() {
            monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
            cy.get('@facilityNameDynamic').then((selectedFacility) => {
                monitorSuppObj.searchSupplier(selectedFacility)
                cy.get('@searchSupplierFlag').then((supplier_found) => {
                    if (supplier_found) {
                        monitorSuppObj.checkForPendingAcceptanceFacility()
                        cy.get('@pendingFacilityPresent').then((present) => {
                            if (!present) {
                                monitorSuppObj.getRiskLabelOfSupplier()
                                cy.get('@riskLabel').then((risk_label) => {
                                    // monitorSuppObj.verifyComplianceData(risk_label)
                                    if (risk_label != 'No RegiScore') {
                                        monitorSuppObj.getRegiscoreOfSupplier()
                                        cy.get('@supplierRegiscore').then((regScore) => {
                                            monitorSuppObj.verifyRegiscore(risk_label, regScore)
                                        })
                                        return;
                                    }
                                    else {
                                        if (retries < MAX_RETRIES) {
                                            cy.log(`No regiscore facility found. Retrying... Attempt ${retries + 1}/${MAX_RETRIES}`);
                                            cy.logger(fileBaseName, `No regiscore facility found. Retrying... Attempt ${retries + 1}/${MAX_RETRIES}`)
                                            retries++;
                                            verifyRegiScore(); // Recursive call to retry
                                        } else {
                                            cy.log('Max retry attempts reached. Stopping retries.');
                                            cy.logger(fileBaseName, 'Max retry attempts reached. Stopping retries.')
                                        }
                                    }
                                })
                            }
                            else {
                                if (retries < MAX_RETRIES) {
                                    cy.log(`Pending facility found. Retrying... Attempt ${retries + 1}/${MAX_RETRIES}`);
                                    cy.logger(fileBaseName, `Pending facility found. Retrying... Attempt ${retries + 1}/${MAX_RETRIES}`)
                                    retries++;
                                    verifyRegiScore(); // Recursive call to retry
                                } else {
                                    cy.log('Max retry attempts reached. Stopping retries.');
                                    cy.logger(fileBaseName, 'Max retry attempts reached. Stopping retries.')
                                }
                            }
                        })
                    }
                })
            })
        }
        verifyRegiScore();                          
    })
    it('Monitor Suppliers Tab -> Search Supplier by DUNS', { tags: '@smokeTag' }, () => {
        const monitorSuppObj = new monitorSupplier()
        const msf = new monitorSupplierFilter()
        monitorSuppObject.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((facilityDynamic) => {
           // msf.getDataFromNetwork(facilityDynamic)
            monitorSuppObj.searchSupplier(facilityDynamic)
            cy.get('@searchSupplierFlag').then((supplier_found) => {
                if (supplier_found) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                           /* cy.wait('@data').then(({ request, response }) => {                               
                                monitorSuppObj.validateSearchedSupplier(supplierData.supplierDUNSLabel, response.body.data[0].DUNS)
                            }) */
                           cy.log('Working')
                        }
                    })
                }
            })
        })  
    })              
    it('Monitor Suppliers Tab -> Search Supplier by Vendor ID', () => {
        const monitorSuppObj = new monitorSupplier()
        const msf = new monitorSupplierFilter()
        monitorSuppObject.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((facilityDynamic) => {
           // msf.getDataFromNetwork(facilityDynamic)
            monitorSuppObj.searchSupplier(facilityDynamic)
            cy.get('@searchSupplierFlag').then((supplier_found) => {
                if (supplier_found) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                           /* cy.wait('@data').then(({ request, response }) => {
                                monitorSuppObj.validateSearchedSupplier(supplierData.supplierVendorIDLabel, response.body.data[0].VENDORID)
                            }) */
                           cy.log('working')
                        }
                    })
                }
            })
        })
    })
    it('Monitor Suppliers Tab -> See Details of facility', () => {
        const monitorSuppObj = new monitorSupplier()
      // monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
      // cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
           /* cy.intercept({
                method: 'GET',
                path: '/dev/reg/scoring/company/*',
            }
            ).as('SeeDetailsData') */
            cy.get('@searchSupplierFlag').then((supplier_found) => {
                if (supplier_found) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                            monitorSuppObj.getRegiscoreOfSupplier()
                            cy.get('@supplierRegiscore').then((regScore) => {
                                if (regScore === '--')
                                    cy.log("Supplier has no regiscore")
                                else {
                                    monitorSuppObj.clickOnSeeDetailsBtn(selectedFacility)
                                    monitorSuppObj.verifyRegiscoreOnSeeDetails(regScore)
                                    cy.wait('@SeeDetailsData').then(({ request, response }) => {
                                        monitorSuppObj.verifyShipmentDataOnSeeDetails(response.body.data)
                                        monitorSuppObj.applyProductFilterOnSeeDetails(supplierData.productFilterName)
                                       // monitorSuppObj.verifyProductFilterOnBarGraph()

                                    }) 
                                }
                            })
                        }
                    })
                }
            })
      // })
    })
    it('Monitor Suppliers Tab -> See Details of facility with bar graph', () => {
        const monitorSuppObj = new monitorSupplier()
        monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.intercept({
                method: 'GET',
                path: '/dev/reg/scoring/company/*'
            }
            ).as('SeeDetailsData')
            cy.get('@searchSupplierFlag').then((supplier_found) => {
                if (supplier_found) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                            monitorSuppObj.getRegiscoreOfSupplier()
                            cy.get('@supplierRegiscore').then((regScore) => {
                                if (regScore === '--')
                                    cy.log("Supplier has no regiscore")
                                else {
                                    cy.intercept({
                                        method: 'GET',
                                        path: '/dev/reg/scoring/company/product/search*'
                                        //query: qparam
                                    }
                                    ).as('ProductCategoryRegiscore')
                                    monitorSuppObj.clickOnSeeDetailsBtn(selectedFacility)
                                    monitorSuppObj.verifyRegiscoreOnSeeDetails(regScore)
                                    cy.wait('@SeeDetailsData').then(({ request, response }) => {
                                        monitorSuppObj.verifyShipmentDataOnSeeDetails(response.body.data)
                                    })
                                    cy.wait('@ProductCategoryRegiscore').then(({ request, response }) => {
                                        monitorSuppObj.applyProductFilterOnSeeDetails()
                                        cy.get('@productCategoryText').then((productCategory) => {
                                            //monitorSuppObj.verifyProductFilterOnBarGraph(productCategory)
                                            cy.get('@productCatRegiscore').then((prodCatRegiscore) => {
                                                monitorSuppObj.verifyProductFilterRegiscore(response.body.data, productCategory, prodCatRegiscore)
                                            })
                                        })
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    })
    it('Monitor Suppliers Tab -> Edit Facility details(Add reg manually) with dynamic data ', () => {
      
        const monitorSuppObj = new monitorSupplier()
        const fdaRegObj = new FDARegistration()

        monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.get('@searchSupplierFlag').then((supplier_found) => {
                if (supplier_found) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                            FDARegFixture.registrationType.forEach((regType, index) => {
                                cy.wrap(null).then(() => {
                                    try {
                                        monitorSuppObj.clickOnEditSupplierDetails(selectedFacility)
                                        monitorSuppObj.addPrimaryContact(randomFacilityData.primaryContact)
                                        monitorSuppObj.addVendorID(randomFacilityData.supplierVendorID.vid[index])
                                        fdaRegObj.enterdetailsOfReg(FDARegFixture.registrationMethod, regType.Reg, randomFacilityData.primaryContact.email, randomFacilityData.registrationNumbers[index], randomFacilityData.regPin, 'Importer')
                                        cy.wait(5000)
                                        monitorSuppObj.enterDataForListOfApprovedSuppliers(FDARegFixture.approvedSuppliersData[index])
                                        monitorSuppObj.addSupplierNote(FDARegFixture.supplierNote[index])
                                        monitorSuppObj.addSupplierFEI(randomFacilityData.supplierFEI.fei[index])
                                        monitorSuppObj.clickOnSaveBtn()
                                        monitorSuppObj.clickOnOKBtnSupplierFEIPopUp()
                                        cy.wait(2000)
                                        cy.reload()
                                        monitorSuppObj.searchSupplier(selectedFacility)
                                        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(supplierData.supplierInfoLabel, randomFacilityData.primaryContact.email)
                                        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(regType.Reg, 'Request Pending')
                                        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierStatusLabel, FDARegFixture.approvedSuppliersData[index].status + " by " + FDARegFixture.approvedSuppliersData[index].addedBy)
                                        monitorSuppObj.clickOnSupplierStatusLog(FDARegFixture.supplierStatusLabel)
                                        monitorSuppObj.validateSupplierStatusLogData(FDARegFixture.approvedSuppliersData[index])
                                        cy.wait(500)
                                        monitorSuppObj.closeSupplierStatusLog()
                                        cy.wait(500)
                                        cy.get('@ListText').then((selectedListText) => {
                                            monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierListLabel, selectedListText)
                                        })
                                        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierNoteLabel, FDARegFixture.supplierNote[index].note)
                                        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierFEILabel, randomFacilityData.supplierFEI.fei[index])
                                        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierVendorIDLabel, randomFacilityData.supplierVendorID.vid[index])
                                        index++;
                                    }
                                    catch (error) {
                                        cy.log(`Error processing ${regType}: ${error.message}`);
                                    }
                                })
                            })
                        }
                    })
                }
            })
        })
    })
    it('Monitor Suppliers Tab -> Edit Facility details (Add reg through request supplier)', () => {
        let i = 0
        const monitorSuppObj = new monitorSupplier()
        const fdaRegObj = new FDARegistration()
        const shareDocObj = new ShareDoc()
        monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.get('@searchSupplierFlag').then((supplier_found) => {
                if (supplier_found) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                            FDARegFixture.registrationType.forEach(regType => {                               
                                monitorSuppObj.clickOnEditSupplierDetails(selectedFacility)
                                monitorSuppObj.addPrimaryContact(randomFacilityData.primaryContact)
                                fdaRegObj.reqSupplierForRegNumber(regType.Reg, randomFacilityData.primaryContact.email, 'Importer')
                                cy.wait(500)
                                monitorSuppObj.enterDataForListOfApprovedSuppliers(FDARegFixture.unApprovedSuppliersData[i])
                                monitorSuppObj.clickOnSaveBtn()
                                cy.wait(2000)
                                cy.reload()
                                monitorSuppObj.searchSupplier(selectedFacility)
                                monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(supplierData.supplierInfoLabel, randomFacilityData.primaryContact.email)
                                monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(regType.Reg, 'Request Pending')
                                monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierStatusLabel, FDARegFixture.unApprovedSuppliersData[i].status + " by " + FDARegFixture.unApprovedSuppliersData[i].addedBy)
                                cy.get('@ListText').then((selectedListText) => {
                                    monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierListLabel, selectedListText)
                                })
                                shareDocObj.verifyDocIsShared(randomFacilityData.primaryContact.email, FDARegFixture.regEmailSub)
                                shareDocObj.verifyRegNoRequestEmailContent(regType.Reg, selectedFacility)
                                fdaRegObj.verifySuppliersFDARegForm(regType.Reg, randomFacilityData.registrationNumbers[i], randomFacilityData.regPin)
                                i++;
                                cy.visit('/')
                            })
                        }
                    })
                }
            })
        })
    })
    it('Monitor Suppliers Tab -> Edit Facility details and Cancel', () => {
        let i = 0
        const monitorSuppObj = new monitorSupplier()
        const fdaRegObj = new FDARegistration()
        const regType = FDARegFixture.registrationType[i]
        monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.get('@searchSupplierFlag').then((supplier_found) => {
                if (supplier_found) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                            monitorSuppObj.checkRegTitleIsPresent(regType.Reg, 'Cancel')
                            monitorSuppObj.clickOnEditSupplierDetails(selectedFacility)
                            monitorSuppObj.addPrimaryContact(randomFacilityData.primaryContact)
                            monitorSuppObj.addVendorID(randomFacilityData.supplierVendorID.vid[i])
                            fdaRegObj.enterdetailsOfReg(FDARegFixture.registrationMethod, regType.Reg, randomFacilityData.primaryContact.email, randomFacilityData.registrationNumbers[i], randomFacilityData.regPin, 'Importer')
                            cy.wait(500)
                            monitorSuppObj.enterDataForListOfApprovedSuppliers(FDARegFixture.approvedSuppliersData[i])
                            monitorSuppObj.addSupplierNote(FDARegFixture.supplierNote[i])
                            monitorSuppObj.addSupplierFEI(randomFacilityData.supplierFEI.fei[i])
                            cy.wait(3000)
                            monitorSuppObj.clickOnCancelBtn()
                            cy.reload()
                            monitorSuppObj.searchSupplier(selectedFacility)
                            monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(supplierData.supplierInfoLabel, randomFacilityData.primaryContact.email, 'Cancel')
                            cy.get('@regLabelFlag').then((regTitleFlag) => {
                                cy.log(regTitleFlag)
                                if (regTitleFlag) {
                                    cy.get('@regTitleValue').then((regValue) => {
                                        monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(regType.Reg, regValue, 'Cancel', regTitleFlag)
                                    })
                                }
                                else {
                                    monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(regType.Reg, 'Request Pending', 'Cancel', regTitleFlag)
                                }
                            })
                            monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierStatusLabel, FDARegFixture.approvedSuppliersData[i].status + " by " + FDARegFixture.approvedSuppliersData[i].addedBy, 'Cancel')
                            monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierNoteLabel, FDARegFixture.supplierNote[i].note, 'Cancel')
                            monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierFEILabel, randomFacilityData.supplierFEI.fei[i], 'Cancel')
                            monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierVendorIDLabel, randomFacilityData.supplierVendorID.vid[i], 'Cancel')
                            cy.get('@ListText').then((selectedListText) => {
                                monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(FDARegFixture.supplierListLabel, selectedListText, 'Cancel')
                            })
                        }
                    })
                }
            })
        })
    })
    
    it('Monitor Suppliers Tab -> Filter Lists -> Add List', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => { 
            filterObj.clickOnFilterName(filterData.ListFilterName)
            filterObj.clickOnAddAList()
            filterObj.enterListName(filterData.listItemName)
            filterObj.verifyListNameInList(filterData.listItemName)
        }) 
    })
    it('Monitor Suppliers Tab -> Filter Lists -> Edit List', () => {   
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => { 
            filterObj.clickOnFilterName(filterData.ListFilterName)
            filterObj.clickOnEditList(filterData.listItemName)
            filterObj.enterNewListName(filterData.newListItemName)       
            filterObj.verifyListNameInList(filterData.newListItemName)
        }) 
    })
    it('Monitor Suppliers Tab -> Filter Lists -> Delete List', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => { 
            filterObj.clickOnFilterName(filterData.ListFilterName)
            filterObj.clickOnDeleteList(filterData.newListItemName)  
            filterObj.verifyListNameNotInList(filterData.newListItemName)
        }) 
    })

    it('Monitor Suppliers Tab -> Download spreadsheet for all facilities', () => {
        let found = false
        const missingFacilities = [];
        const monitorSuppObj = new monitorSupplier()
        const monSuppReportObj = new monitorSupplierReport()
        cy.wait(1000)
        cy.get('@allFacilityNames').then((facilityNames) => {
            monSuppReportObj.clickOnDownloadSpreadSheetIcon()
            cy.wait(8000)
            const excelFilePath = 'cypress/downloads/MyFDA_Compliance_Status_Report.xlsx'
            const sheetName = 'Report'
            cy.task('parseXlsx', excelFilePath).then((jsonData) => {
                for (let i = 0; i < jsonData.worksheets[0].data[0].length; i++) {
                    if (jsonData.worksheets[0].data[0][i].value == 'Facility Name') {
                        found = true
                        cy.wrap(i).as('index')
                        break;
                    }
                }
                cy.get('@index').then((facilityNameIndex) => {
                    let m = 0
                    const excelFacilityNames = jsonData.worksheets[0].data.map(innerArray => innerArray[facilityNameIndex].value)
                    const newArray = [];
                    excelFacilityNames.slice(1).forEach(value => {
                        newArray.push(value);
                    });
                    //  cy.log(JSON.stringify(newArray))                   
                    facilityNames.forEach(facility => {
                        if (!newArray.includes(facility)) {
                            missingFacilities.push(facility);
                        }
                    });
                    cy.log('Number of missing facilities' + missingFacilities.length)
                    if (missingFacilities.length > 0) {
                        cy.log('Missing facilities: ')
                        missingFacilities.forEach(facilityMissing => {
                            cy.log('missing facility name : ' + facilityMissing)
                        })
                    }
                    else {
                        cy.log('all facilities are present')
                        //expect(missingFacilities.length).to.eq(0)
                    }
                })
            })
        })   
    })
    it('Monitor Suppliers Tab -> Download spreadsheet for searched facility', () => {
        let excelData
        const monitorSuppObj = new monitorSupplier()
        const monSuppReportObj = new monitorSupplierReport()
        monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.get('@searchSupplierFlag').then((flag) => {
                if (flag) {
                    monSuppReportObj.clickOnDownloadSpreadSheetIcon()
                    cy.wait(10000)
                    const excelFilePath = 'cypress/downloads/MyFDA_Compliance_Status_Report.xlsx'
                    const sheetName = 'Report'
                    cy.task('parseXlsx', excelFilePath).then((jsonData) => {

                        console.log('Data from Excel:', JSON.stringify(jsonData, null, 2))
                        excelData = jsonData.worksheets[0].data
                        const rowlength = Cypress.$(jsonData.worksheets[0].data).length
                        console.log(rowlength)
                        // console.log(JSON.stringify(jsonData.worksheets[0].data[0]))
                        // console.log(JSON.stringify(jsonData.worksheets[0].data[1]))
                        expect(jsonData.worksheets[0].name).eq(sheetName)
                        let jsondata1 = jsonData.worksheets[0].data[0]
                        let jsondata2 = jsonData.worksheets[0].data[1]
                        cy.writeFile('cypress/fixtures/xlsxDataSingleFacility.json', { headerName: jsondata1, headerValue: jsondata2 })
                    })
                    cy.fixture('./xlsxDataSingleFacility').then((data) => {
                        for (let i = 0; i < data.headerName.length; i++) {
                            if (data.headerName[i].value == 'Facility Name') {
                                expect(data.headerValue[i].value).to.include(selectedFacility)
                                break;
                            }
                        }
                    })
                }
            })
        })
    })

    it('Monitor Suppliers Tab -> Generate PDF for searched supplier', () => {
        const monitorSuppObj = new monitorSupplier()
        const monSuppReportObj = new monitorSupplierReport()
        monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.get('@searchSupplierFlag').then((flag) => {
                if (flag) {
                    monSuppReportObj.clickOnGeneratePDFIcon()
                    cy.wait(3000)
                    cy.task('readPdf', 'cypress/downloads/MyFDA_Compliance_Status_Report.pdf').then((data) => {
                        cy.log(data.text)
                        expect(data.text).to.contain(selectedFacility)
                    })
                }
            })
        })
    })
    it('Monitor Suppliers Tab -> Generate PDF for all facilities', () => {
        const monitorSuppObj = new monitorSupplier()
        const monSuppReportObj = new monitorSupplierReport()
        cy.wait(1000)
        monSuppReportObj.clickOnGeneratePDFIcon()
        cy.wait(3000)
        cy.task('readPdf', 'cypress/downloads/MyFDA_Compliance_Status_Report.pdf').then((data) => {
            cy.get('@allFacilityNames').then((checkFacilityNames) => {
                const pdfText = data.text
                const cleanedFacilityNames = checkFacilityNames.map(name => name.trim().toLowerCase());
                const cleanedPdfText = pdfText.replace(/\s+/g, ' ').toLowerCase();
              
                const missingFacilities = [];
                cleanedFacilityNames.forEach(facility => {
                    if (!cleanedPdfText.includes(facility)) {
                        missingFacilities.push(facility);
                    }
                });
                cy.log('Number of missing facilities' + missingFacilities.length)
                if (missingFacilities.length > 0) {
                    cy.log('Missing facilities: ')
                    missingFacilities.forEach(facilityMissing => {
                        cy.log('missing facility name' + facilityMissing)
                    })
                }
                else {
                    cy.log('all facilities are present')
                }
                expect(missingFacilities.length).to.eq(0)
                //cy.log('Final facilityNamesArray: ' + JSON.stringify(checkFacilityName));            
            })
        })
    })
    it.skip('Monitor Suppliers Tab -> Generate Printable Report for searched facility',()=>{
        const monitorSuppObj = new monitorSupplier()
        const monSuppReportObj = new monitorSupplierReport()
        monitorSuppObj.searchSupplier(supplierData.supplier)      
        monSuppReportObj.clickOnGeneratePrintableReportIcon()
        // cy.wait(3000)
        // cy.task('readPdf','cypress/downloads/MyFDA_Compliance_Status_Report.pdf').then((data)=>{
        //     cy.log(data.text)
        //     expect(data.text).to.contain(supplierData.supplier)
        //     })              
    })
    it('Monitor Suppliers Tab -> Share Report', () => {
        const monitorSuppObj = new monitorSupplier()
        const monSuppReportObj = new monitorSupplierReport()
        const shareDocObj = new ShareDoc()
        monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.get('@searchSupplierFlag').then((flag) => {
                if (flag) {
                    monSuppReportObj.clickOnShareReportIcon()
                    monSuppReportObj.selectSupplierShareReport()
                    monSuppReportObj.enterShareReportRecipientsMail(randomFacilityData.primaryContact.email)
                    shareDocObj.verifyDocIsShared(randomFacilityData.primaryContact.email, 'MyFDA Compliance Status Report')
                    cy.get('@supplierName').then((supplier_name) => {
                        shareDocObj.verifyMonitorSupplierShareReport(supplier_name)
                    })
                }
            })
        })
    }) 
    it('Monitor Suppliers Tab -> Stop Monitoring', () => {
        const monitorSuppObj = new monitorSupplier()
        const otherTabObj = new history()
        monitorSuppObj.dynamicFacilityGeneration(allFacilityNames)
        cy.get('@facilityNameDynamic').then((selectedFacility) => {
            monitorSuppObj.searchSupplier(selectedFacility)
            cy.get('@searchSupplierFlag').then((flag) => {
                if (flag) {
                    monitorSuppObj.checkForPendingAcceptanceFacility()
                    cy.get('@pendingFacilityPresent').then((present) => {
                        if (!present) {
                            monitorSuppObj.clickOnStopMonitoringBtn(selectedFacility)
                            monitorSuppObj.searchSupplier(supplierData.supplierName)
                            cy.get('@searchSupplierFlag').then((after_stop_monitoring_flag) => {
                                expect(after_stop_monitoring_flag).to.be.false
                            })
                            otherTabObj.selectSubTabFromOtherTab("History")
                            otherTabObj.clickOnPreviouslyMonitoredSuppliers()
                            otherTabObj.searchSupplierInPrevMonitoredSuppTable(supplierData.supplierName)
                            cy.get('@supplierFoundInPrevMonListFlag').then((flag) => {
                                expect(flag).to.be.true
                            })
                        }
                    })
                }
            })
        })
    })
})    
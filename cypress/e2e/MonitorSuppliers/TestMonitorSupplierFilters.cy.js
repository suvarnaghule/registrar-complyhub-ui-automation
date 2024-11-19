import monitorSupplier from "../../PageClass/MonitorSuppliers/monitorSupplier";
import monitorSupplierFilter from "../../PageClass/MonitorSuppliers/applyFilterMonitorSupplier";

describe('Validate Monitor Supplier Tab', {
    viewportWidth: 1280,
    viewportHeight: 800
}, () => {
    let supplierData
    beforeEach(() => {
        cy.fixture('./MonitorSuppliers/monitorSupplier').then((data) => {
            supplierData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)
            cy.visit('/')
        })
    });  
    it('Monitor Suppliers Tab -> Apply RegiScore Filter', () => {
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.RegiScoreFilterName.filterName)
            filterData.RegiScoreFilterName.filterLabel.forEach(filterValue => {
                filterObj.applyNestedFilter(filterData.RegiScoreFilterName.filterName, filterValue.filterLabel)
                cy.wait(5000)
                filterObj.verifyFilter(filterData.RegiScoreFilterName.filterName, filterValue.filterLabel)
                cy.wait(500)
                filterObj.clickOnClearAllFilter()
            })          
        })   
    })
    it('Monitor Suppliers Tab -> Apply List Filter', () => {       
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.ListFilterName)
            filterObj.applyNestedFilter(filterData.ListFilterName, filterData.ListFilterValue)
            cy.wait(5000)
            monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(filterData.ListFilterName, filterData.ListFilterValue)        
        }) 
    })  
    it('Monitor Suppliers Tab -> Apply Country Filter', () => {       
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.CountryFilterName)
            filterObj.selectFilter(filterData.CountryFilterName, filterData.CountryFilterValue)
            cy.wait(5000)
            monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(filterData.CountryFilterName, filterData.CountryFilterValue)       
        })   
    })
    it('Monitor Suppliers Tab -> Apply Approval Status filter ', () => {    
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.ApprovalStatusFilterName.filterName)
            filterData.ApprovalStatusFilterName.filterLabel.forEach(filterValue => {
                filterObj.applyNestedFilter(filterData.ApprovalStatusFilterName.subFilterName, filterValue.filterLabel)
                cy.wait(5000)
                monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(filterData.ApprovalStatusFilterName.subFilterName, filterValue.filterLabel)
                cy.wait(500)
            })      
        })
    })
    it('Monitor Suppliers Tab -> Apply DUNS filter ', () => {      
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.DunsFilterName.filterName)
            filterData.DunsFilterName.filterLabel.forEach(filterValue => {
                filterObj.applyNestedFilter(filterData.DunsFilterName.filterNameText, filterValue.filterLabel)
                cy.wait(5000)
                monitorSuppObj.verifyDataOnFacilityDetailInfoBlock(filterData.DunsFilterName.filterNameText, filterValue.filterLabel)
                cy.wait(500)
            })
        })
    })
    it('Monitor Suppliers Tab -> Supplier Feed Filter -> Manual', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            let manualFilterName = filterData.SupplierFeedFilterName.manualFilterName
            filterObj.clickOnFilterName(filterData.SupplierFeedFilterName.filterName)
            filterObj.interceptNetworkFilterRequest(manualFilterName)
            filterObj.applyNestedFilter(manualFilterName, manualFilterName)
            cy.wait(5000)
            cy.wait('@FilterData').then(({ request, response }) => {
                monitorSuppObj.verifyCntReturnThrAPI(response.body.data, response.body.meta)
                filterObj.verifySupplierFeedFilter(manualFilterName, manualFilterName, response.body.data)
            })                     
        })
    })
    it('Monitor Suppliers Tab -> Supplier Feed Filter -> Automated', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {           
            let automatedFilterName = filterData.SupplierFeedFilterName.automatedFilterName  
            filterObj.clickOnFilterName(filterData.SupplierFeedFilterName.filterName)        
            filterData.SupplierFeedFilterName.automatedFilterLabel.forEach(filterValue => {
                filterObj.interceptNetworkFilterRequest(automatedFilterName, filterValue.filterLabel)
                filterObj.applyNestedFilter(automatedFilterName, filterValue.filterLabel)
                cy.wait(5000)
                cy.wait('@FilterData').then(({ request, response }) => {
                    monitorSuppObj.verifyCntReturnThrAPI(response.body.data, response.body.meta)
                    filterObj.verifySupplierFeedFilter(automatedFilterName, filterValue.filterLabel, response.body.data)
                    cy.wait(500)
                })
            })                      
        })
    })  
    it('Monitor Suppliers Tab -> Supplier Feed Filter -> Pending Review', () => {
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {  
            filterObj.clickOnFilterName(filterData.SupplierFeedFilterName.filterName)       
            filterObj.applyNestedFilter(filterData.SupplierFeedFilterName.pendingFilterName, filterData.SupplierFeedFilterName.pendingFilterLabel)
            cy.wait(8000)
            filterObj.verifyPendingReviewFacility(filterData.SupplierFeedFilterName.pendingFilterName, filterData.SupplierFeedFilterName.pendingFilterLabel)
            cy.wait(200)                           
            filterObj.clickOnClearAllFilter()      
        })
    }) 
    it('Monitor Suppliers Tab -> Supplier Feed Filter -> Pending Acceptance', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {        
            filterObj.clickOnFilterName(filterData.SupplierFeedFilterName.filterName)         
            filterData.SupplierFeedFilterName.pendingAcceptanceFilterLabel.forEach(filterValue => {
                filterObj.interceptNetworkFilterRequest(filterData.SupplierFeedFilterName.pendingAcceptanceFilterName, filterValue.filterLabel)
                cy.wait(2000)
                filterObj.applyNestedFilter(filterData.SupplierFeedFilterName.pendingAcceptanceFilterName, filterValue.filterLabel)
                cy.wait(5000)
                cy.wait('@FilterData').then(({ request, response }) => {
                    monitorSuppObj.verifyCntReturnThrAPI(response.body.data, response.body.meta)
                    filterObj.verifyPendingReviewFacility(filterData.SupplierFeedFilterName.pendingAcceptanceFilterName, filterValue.filterLabel, response.body.data)
                    cy.wait(500)
                    filterObj.verifySupplierFeedFilter(filterData.SupplierFeedFilterName.pendingAcceptanceFilterName, filterValue.filterLabel, response.body.data)
                })

            })
        })
    })             
    it('Monitor Suppliers Tab -> Compliance Filter -> Inspections', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.ComplianceFilterName.filterName)
            filterData.ComplianceFilterName.inspFilterLabel.forEach(filterValue => {
                filterObj.applyNestedFilter(filterData.ComplianceFilterName.inspFilterName, filterValue.filterLabel)
                cy.wait(5000)
                monitorSuppObj.verifyComplianceParametersDetails(filterData.ComplianceFilterName.inspFilterName, filterValue.filterLabel)
                cy.wait(500)
            })          
        })
    })
    it('Monitor Suppliers Tab -> Compliance Filter -> Warning Letter', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.ComplianceFilterName.filterName)
            filterObj.applyNestedFilter(filterData.ComplianceFilterName.warningLetterFilterName, filterData.ComplianceFilterName.warningLetterFilterName)
            cy.wait(5000)
            monitorSuppObj.verifyComplianceParametersDetails(filterData.ComplianceFilterName.warningLetterFilterName, filterData.ComplianceFilterName.warningLetterFilterName)          
            cy.wait(500)
        })
    })    
    it('Monitor Suppliers Tab -> Compliance Filter -> Import Alert', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.ComplianceFilterName.filterName)
            filterData.ComplianceFilterName.importAlfilterLabel.forEach(filterValue => {
                filterObj.applyNestedFilter(filterData.ComplianceFilterName.importAlfilterName, filterValue.filterLabel)
                cy.wait(5000)
                monitorSuppObj.verifyComplianceParametersDetails(filterData.ComplianceFilterName.importAlfilterName, filterValue.filterLabel)
                cy.wait(500)
            })           
        })
    })
    it('Monitor Suppliers Tab -> Compliance Filter -> Import Refusals', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.ComplianceFilterName.filterName)           
            filterObj.applyNestedFilter(filterData.ComplianceFilterName.importReFilterName, filterData.ComplianceFilterName.importReFilterName)
            cy.wait(5000)
            monitorSuppObj.verifyComplianceParametersDetails(filterData.ComplianceFilterName.importReFilterName, filterData.ComplianceFilterName.importReFilterName)
            cy.wait(500)          
        })
    })    
    it('Monitor Suppliers Tab -> Compliance Filter -> Recall', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.ComplianceFilterName.filterName)
            filterData.ComplianceFilterName.recallSubFilterLabel1.forEach(filterValue => {
                filterObj.applyRecallFilter(filterData.ComplianceFilterName.recallFilterName, filterData.ComplianceFilterName.recallSubFilterName1, filterValue.filterLabel)
                cy.wait(5000)
                    monitorSuppObj.verifyComplianceParametersDetails(filterData.ComplianceFilterName.recallFilterName, filterValue.filterLabel, filterData.ComplianceFilterName.recallSubFilterName1)
                    cy.wait(500)             
            })
            filterData.ComplianceFilterName.recallSubFilterLabel2.forEach(filterValue => {
                filterObj.applyRecallFilter(filterData.ComplianceFilterName.recallFilterName, filterData.ComplianceFilterName.recallSubFilterName2, filterValue.filterLabel)
                cy.wait(5000).then(()=>{
                    monitorSuppObj.checkResultListIsPresent()
                    cy.get('@listPresentFlag').then((flag) => {
                        if (flag) {
                            monitorSuppObj.verifyComplianceParametersDetails(filterData.ComplianceFilterName.recallFilterName, filterValue.filterLabel, filterData.ComplianceFilterName.recallSubFilterName2)
                            cy.wait(500)
                        }
                    })
                })               
            })
        })
    })
    it('Monitor Suppliers Tab -> Registration Filter -> Food', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
        filterObj.clickOnFilterName(filterData.RegistrationFilterName.filterName)      
            filterData.RegistrationFilterName.subFilterLabel.forEach(subfilterValue => {
                filterObj.applyRegistrationFilter(filterData.RegistrationFilterName.FoodRegFilterName,subfilterValue.filterLabel)
                cy.wait(5000)
                monitorSuppObj.verifyRegistrationFilterNew(filterData.RegistrationFilterName.FoodRegFilterName,subfilterValue.filterLabel)                              
                cy.wait(2000)
            })            
        })
    })
    it('Monitor Suppliers Tab -> Registration Filter -> Drug', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.RegistrationFilterName.filterName)
            filterData.RegistrationFilterName.subFilterLabel.forEach(subfilterValue => {
                filterObj.applyRegistrationFilter(filterData.RegistrationFilterName.DrugRegFilterName, subfilterValue.filterLabel)
                cy.wait(5000)
                monitorSuppObj.checkResultListIsPresent()
                cy.get('@listPresentFlag').then((flag) => {
                    if (flag) {
                        monitorSuppObj.verifyRegistrationFilter(filterData.RegistrationFilterName.DrugRegFilterName, subfilterValue.filterLabel)
                        cy.wait(2000)
                    }
                })
            })
        })
    })
    it('Monitor Suppliers Tab -> Registration Filter -> Medical', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.RegistrationFilterName.filterName)
            filterData.RegistrationFilterName.subFilterLabel.forEach(subfilterValue => {
                filterObj.applyRegistrationFilter(filterData.RegistrationFilterName.MedicalFilterName, subfilterValue.filterLabel)
                cy.wait(5000)
                monitorSuppObj.checkResultListIsPresent()
                cy.get('@listPresentFlag').then((flag) => {
                    if (flag) {
                        monitorSuppObj.verifyRegistrationFilter(filterData.RegistrationFilterName.MedicalFilterName, subfilterValue.filterLabel)
                        cy.wait(2000)
                    }
                })
            })
        })
    }) 
    it.skip('Monitor Suppliers Tab -> Filter -> Test Registration Filter', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        monitorSuppObj.searchSupplier("Agricola Santa") 
        monitorSuppObj.verifyRegistrationFilter("Food","Missing")   
    })   
    it('Monitor Suppliers Tab -> Audits Filter -> FSSC 22000', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.AuditsFilterName.filterName)           
                filterData.AuditsFilterName.FSSCFilterLabel.forEach(filterValue => {
                    cy.wait(5000)
                    filterObj.applyNestedFilter(filterData.AuditsFilterName.FSSCFilterName, filterValue.filterLabel)
                        cy.wait(8000)
                        monitorSuppObj.checkResultListIsPresent()
                        cy.get('@listPresentFlag').then((flag) => {
                            if (flag) {
                                monitorSuppObj.verifyComplianceParametersDetails(filterData.AuditsFilterName.filterName, filterValue.filterLabel, filterData.AuditsFilterName.FSSCFilterName)
                                cy.wait(1000)                            
                                filterObj.clickOnClearAllFilter()
                            }
                        })                                      
                })           
        })
        

    })    
    it('Monitor Suppliers Tab -> Audits Filter -> BRC', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.AuditsFilterName.filterName)
            filterData.AuditsFilterName.BRCFilterLabel.forEach(filterValue => {
                cy.wait(5000)
                filterObj.applyNestedFilter(filterData.AuditsFilterName.BRCFilterName, filterValue.filterLabel)
                cy.wait(8000)
                monitorSuppObj.checkResultListIsPresent()
                cy.get('@listPresentFlag').then((flag) => {
                    if (flag) {
                        monitorSuppObj.verifyComplianceParametersDetails(filterData.AuditsFilterName.filterName, filterValue.filterLabel, filterData.AuditsFilterName.BRCFilterName)
                        cy.wait(1000)                      
                        filterObj.clickOnClearAllFilter()
                    }
                })
            })
        })
        
    })  
    it('Monitor Suppliers Tab -> Audits Filter -> SQF', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData) => {
            filterObj.clickOnFilterName(filterData.AuditsFilterName.filterName)
            filterData.AuditsFilterName.SQFfilterLabel.forEach(subfilterValue => {
                cy.wait(5000)
                filterObj.applyNestedFilter(filterData.AuditsFilterName.SQFFilterName, subfilterValue.filterLabel)
                cy.wait(8000)
                monitorSuppObj.checkResultListIsPresent()
                cy.get('@listPresentFlag').then((flag) => {
                    if (flag) {
                        monitorSuppObj.verifyComplianceParametersDetails(filterData.AuditsFilterName.filterName, subfilterValue.filterLabel, filterData.AuditsFilterName.SQFFilterName)
                        cy.wait(1000)                      
                        filterObj.clickOnClearAllFilter()
                    }
                })
            })
        })
        
    })        
    it.skip('Monitor Suppliers Tab -> Apply Nested Filter', () => {
        const monitorSuppObj = new monitorSupplier()
        const filterObj = new monitorSupplierFilter()
        filterObj.clickOnFilterIcon()
        cy.fixture('./MonitorSuppliers/monitorSupplierFilter').then((filterData)=>{      
           // filterObj.applyNestedFilter(filterData.RegistrationFilterName,filterData.RegistrationFilterValue)
           // cy.wait(5000)
           // monitorSuppObj.verifyNestedFilterResult(filterData.RegistrationFilterValue.SubFilterName,filterData.RegistrationFilterValue.SubFilterValue)       
            filterObj.applyNestedFilter(filterData.SupplierFeedFilterName,filterData.SupplierFeedFilterValue)
        })
    }) 
})    


class SmartDM{
    facility360documentTab=".documents > .tab-link"
    faclity360SmartDMTab="a[class^='smartDMS']"                                    //.smartDMS
    facility360SmartDMDocCount="a[class^='smartDMS'] > #countOfDoc"                           //.smartDMS > #countOfDoc
    faclity360ProductCodeFilter=".ProdCodeSmartDMS"
    facility360DocumentCategory =".docCat_smartDms"
    facility360SmartDMTable = "div[class='uk-overflow-auto'] table tbody tr"
    facility360SmartDMTableFdaCatColAll="td:nth-child(2)"
    facility360SmartDMTableDocCatColAll="td:nth-child(4)"
    facility360SmartDMTableDocTypeColAll="td:nth-child(5)"
    facility360SmartDMTableProductCodeColAll="td:nth-child(3)"
    facility360SmartDMStatus = "td:nth-child(7)"

    importerSmartDMTableDocCatColAll="td:nth-child(5)"
    importerSmartDMTableDocTypeColAll="td:nth-child(6)"
    importerSmartDMTableSupplierNameColAll="td:nth-child(4)"
    importerSupplierNamePopUp="div[class='vendorFacility_smartDms_popUp uk-accordion-content uk-box-shadow-large uk-text-capitalize']"

    
    facility360SmartDMTableAddFile="tbody[id$='Table'] tr:first-child i[class*='uploadDocument']"             //"#documentTable tr:first-child td:nth-child(10) i[class='uk-margin-right svg-color uploadDocuments']"
   
    facility360SmartDMUploadDocModal="div[id*='uploadDocModal' i]"                                           //"#smartDMSExpDocModal #uploadDocModal #smartDMSExpDocForm"
    facility360SmartDMUploadDocHeader="div[id*='uploadDocModal' i] h2"                                       //"#smartDMSExpDocModal #uploadDocModal h2"
   
    facility360SmartDMDocTypeName="#select2-docType-zg-container"

    facility360SmartDMResetFilter="a[id^='reset'][id$='SmartDmsFilter']"               //#resetSmartDmsFilter

    facility360ViewIgnoredList="#viewIgnoredList"
    ignoreDocListMainModal="div[id^='ignoredList'][id$='Modal']"
    facility360IgnoredDocListModal="#IgnoredDocumentList"
    facility360IgnoredDocListHeader="#IgnoredDocumentList h2"
  

    facility360CloseIgnoredDocListIcon="#IgnoredDocumentList > button > i"

    facility360TypeOfFilter="div[class^='smartDMS'][class$='Table'] table tr[class='header'] p"   //.smartDMSDocumentTable table tr[class='header'] p 
    facility360FDACatPopUp="div[class='fdaCat_popUp uk-accordion-content uk-box-shadow-large uk-text-capitalize']"
    facility360DocCatPopUp="div[class='docCat_smartDms_popUp uk-accordion-content uk-box-shadow-large uk-text-capitalize']"
    facility360DocTypePopUp="div[class='docType_smartDms_popUp uk-accordion-content uk-box-shadow-large uk-text-capitalize']"
    facility360ProductCodePopUp="div[class='ProdCode_SmartDms_popUp uk-accordion-content uk-box-shadow-large uk-text-capitalize']"
    facility360FilterBtn=" button"  
    facility360FilterCheckbox = " input[type='checkbox']"

    // importerSmartDMTableAddFile="#importerSmartDmsTable tr:first-child td:nth-child(12) i[class$='uploadDocument']"
    // importerSmartDMSUploadDocModal="#singleUploadDocModal"
    // importerSmartDMSUploadDocHeader="#singleUploadDocModal h2"

    
    selectDocumentTab()
    {
        cy.get(this.facility360documentTab).click()
    }

    selectSmartDMTab(){
        cy.get(this.faclity360SmartDMTab).click()
    
    }
    getSmartDMSDocCount()
    {
        cy.get(this.facility360SmartDMDocCount).then(($count)=>{
            cy.wrap(parseInt($count.text())).as('SmartDMSDocCnt')
        })
    }
    applyFilter(TypeOfFilter,FilterValue)
    {
        let popUp,facility360FilterValueCheckbox
        cy.get(this.facility360TypeOfFilter).contains(TypeOfFilter).click().then(()=>{
            if(TypeOfFilter == 'FDA Product Category '|| TypeOfFilter == 'FDA Category')                                  //FDA Category
            {
                popUp = this.facility360FDACatPopUp  
            }                                      
            else
            {
                if(TypeOfFilter == 'Document Category') 
                {
                    popUp=this.facility360DocCatPopUp
                }                                
                else
                {
                    if(TypeOfFilter == 'Document Type')
                    {
                        popUp=this.facility360DocTypePopUp
                    }                        
                    else
                    {
                        if(TypeOfFilter == 'Supplier Name')
                            popUp=this.importerSupplierNamePopUp
                        else
                            popUp=this.facility360ProductCodePopUp
                    }                   
                }
            } 
            cy.get(popUp).should('be.visible')
            facility360FilterValueCheckbox=popUp+this.facility360FilterCheckbox
            cy.get(facility360FilterValueCheckbox).check(FilterValue,{force:true}).should('be.checked').and('have.value',FilterValue)
            cy.get(popUp+this.facility360FilterBtn).contains('Ok').click()
        })
    }
    verifyFilter(TypeOfFilter,FilterValue,role)
    {
        let smartDMFilterTable
        cy.get(this.facility360SmartDMTable).each(($row) =>{
            cy.wrap($row).within(()=>{
                if(TypeOfFilter == 'FDA Product Category ' || TypeOfFilter == 'FDA Category')                                            //FDA Category
                    smartDMFilterTable = this.facility360SmartDMTableFdaCatColAll
                else
                {
                    if(TypeOfFilter == 'Document Category')
                    {
                        if(role == 'Importer')
                            smartDMFilterTable = this.importerSmartDMTableDocCatColAll
                        else
                            smartDMFilterTable = this.facility360SmartDMTableDocCatColAll
                    }    
                    else
                    {
                        if(TypeOfFilter == 'Document Type')
                        {
                            if(role == 'Importer')
                                smartDMFilterTable = this.importerSmartDMTableDocTypeColAll
                            else
                                smartDMFilterTable = this.facility360SmartDMTableDocTypeColAll
                        }    
                        else
                        {
                            if(TypeOfFilter == 'Supplier Name')                           
                                smartDMFilterTable = this.importerSmartDMTableSupplierNameColAll              
                            else
                                smartDMFilterTable = this.facility360SmartDMTableProductCodeColAll
                        } 
                            
                    }
                }
                cy.get(smartDMFilterTable).then(($filter_value_text)=>{           
                        expect($filter_value_text.text().trim().toLowerCase()).to.include(FilterValue) 
                                                                                                                                                                      
                })                              
            })
        })
    }
    resetFilter()
    {
        cy.get(this.facility360SmartDMResetFilter).click()
    }
    verifyStatusOfDocument(status){
            
        cy.get(this.facility360SmartDMTable).each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.facility360SmartDMStatus).then(($name)=>{                 
                        expect($name.text().trim()).eq(status)
                                                                                                                                                             
                })                              
            })
        })
    }
    clickOnAddFile()
    {  
        cy.get(this.facility360SmartDMTableAddFile).click().then(()=>{                
        cy.get(this.facility360SmartDMUploadDocModal).should('exist').and('be.visible')
        cy.get(this.facility360SmartDMUploadDocHeader).should('have.text','Upload Document')
       }) 
    } 
    clickOnViewIgnoredList() 
    {
        let flag=false
        cy.get(this.facility360ViewIgnoredList).click().wait(4000)
        cy.get(this.ignoreDocListMainModal).then(($el) => {
            if (!Cypress.dom.isVisible($el)) {
                cy.log('No doc suggestions present in list')
            }
            else {
                cy.get(this.facility360IgnoredDocListModal).should('exist')
                cy.get(this.facility360IgnoredDocListHeader).should('have.text', 'Ignored Document List')
                flag = true
                cy.wrap(flag).as('IgnoreDocListFlag')
            }
        })
    }  
    closeIgnoredDocList()
    {
        cy.get(this.facility360CloseIgnoredDocListIcon).click().then(()=>{
            cy.get(this.facility360IgnoredDocListModal).should('not.be.visible')
        })
    }
    
    


}

export default SmartDM;
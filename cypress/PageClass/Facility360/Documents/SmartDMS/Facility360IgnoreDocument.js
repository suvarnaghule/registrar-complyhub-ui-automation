class IgnoreDocument
{
    facility360SmartDMTableFDACatCol="td:nth-child(2)"
    facility360SmartDMTableDocCatCol="td:nth-child(4)"
    facility360SmartDMTableDocTypeCol="td:nth-child(5)"

    facility360IgnoredDocListTableRows="#ignoreList_smartDMS_table tr"
    facility360IgnoredDocListTableFDACatCol="td:nth-child(2) p"
    facility360IgnoredDocListTableDocCatCol="td:nth-child(3)"
    facility360IgnoredDocListTableDocTypeCol="td:nth-child(4)"
    facility360IgnoredDocListTableDocStatusCol="td:nth-child(5)"
    facility360IgnoredDocListTableDocRetrieveCol="td[class*='singleRevertIgnore']"
    facility360ViewIgnoredDocListTableFDACatCol="td:nth-child(2)"

    smartDMSTable="div[class='uk-overflow-auto'] table tbody tr"
    ignoreDocumentIcon="i[class*='ignoreDocument']"
    FdaProductCatDDBtn="div[class$='ignorePodCList']"
    FdaProdCatDD="div[class='ms-drop bottom']"
    FdaProdCatCheckbox="input[type='checkbox']"
    BtnsOnIgnoredDocList="#IgnoredDocumentList button"

    importerSmartDMTableDocCatCol="td[class^='impSmartDms_Doc_DocCategory'] p"
    importerSmartDMTableDocTypeCol="td[class^='impSmartDms_Doc_DocType'] p"


    clickOnIgnoredDocument()
    {
        cy.get(this.smartDMSTable+":first-child "+this.ignoreDocumentIcon).click().then(()=>{

        })
    }
    verifyIgnoredDoc()
    {
        let i=1;
       cy.get(this.facility360IgnoredDocListTableRows+":last-child").then(($row)=>{
            cy.wrap($row).within(()=>{
                cy.get('@FdaCat'+i ).then((fda_cat)=>{                                        
                    cy.get(this.facility360IgnoredDocListTableFDACatCol).then(($fda_cat_ignored)=>{ 
                        expect(fda_cat.toUpperCase()).eq($fda_cat_ignored.text().trim().toUpperCase())
                    })              
                })
                cy.get('@DocCat'+i).then((doc_cat)=>{                                   
                    cy.get(this.facility360IgnoredDocListTableDocCatCol).then(($doc_cat_ignored)=>{                      
                        expect($doc_cat_ignored.text().trim()).eq(doc_cat)
                    })
                })
                cy.get('@DocType'+i).then((doc_type)=>{                                    
                    cy.get(this.facility360IgnoredDocListTableDocTypeCol).then(($doc_type_category)=>{                    
                        expect($doc_type_category.text().trim().toLowerCase()).eq(doc_type.toLowerCase())
                    })
                })
                
            })
       }) 
    }
    retrieveSingleDoc()
    {
        cy.get(this.facility360IgnoredDocListTableRows+":last-child").then(($row)=>{
            cy.wrap($row).within(()=>{
                cy.get(this.facility360IgnoredDocListTableFDACatCol).then(($fda_cat)=>{
                    cy.wrap($fda_cat.text().trim().toUpperCase()).as('fdaCatTobeIgnored')                                  
                })
                cy.get(this.facility360IgnoredDocListTableDocCatCol).then(($doc_cat_ignored)=>{                      
                    cy.wrap($doc_cat_ignored.text().trim()).as('docCatTobeignored')
                })
                cy.get(this.facility360IgnoredDocListTableDocTypeCol).then(($doc_type_category)=>{                    
                    cy.wrap($doc_type_category.text().trim()).as('docTypeTobeIgnored')
                })
                cy.get(this.facility360IgnoredDocListTableDocRetrieveCol).click()
            })
        })
    }
    verifyRetrivedSingleDoc(role)
    {
        let smartDMTableDocCatCol, smartDMTableDocTypeCol
        cy.get('@fdaCatTobeIgnored').then((fdaCat)=>{
            cy.get(this.smartDMSTable+":first-child "+this.facility360SmartDMTableFDACatCol).then(($FdaCat)=>{
                expect($FdaCat.text().trim().toLowerCase()).eq(fdaCat.toLowerCase())
            })
        })
        cy.get('@docCatTobeignored').then((docCat)=>{
            if(role == 'Importer')
                smartDMTableDocCatCol = this.smartDMSTable+":first-child "+this.importerSmartDMTableDocCatCol
            else
                smartDMTableDocCatCol = this.smartDMSTable+":first-child "+this.facility360SmartDMTableDocCatCol

            cy.get(smartDMTableDocCatCol).then(($DocCat)=>{
                expect($DocCat.text().trim()).eq(docCat)
            })
        })
        cy.get('@docTypeTobeIgnored').then((docType)=>{
            if(role == 'Importer')
                smartDMTableDocTypeCol = this.smartDMSTable+":first-child "+this.importerSmartDMTableDocTypeCol
            else
              smartDMTableDocTypeCol = this.smartDMSTable+":first-child "+this.facility360SmartDMTableDocTypeCol  
            
              cy.get(smartDMTableDocTypeCol).then(($DocType)=>{
                expect($DocType.text().trim().toLowerCase()).eq(docType.toLowerCase())
            })
        })

    }
    viewIgnoredList()
    {
        cy.get(this.facility360IgnoredDocListTableRows).each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.facility360ViewIgnoredDocListTableFDACatCol).should('have.attr','class').and('contain','product_category_ignoreList')
                cy.get(this.facility360IgnoredDocListTableDocCatCol).should('have.attr','class').and('contain','document_category_ignoreList')
                cy.get(this.facility360IgnoredDocListTableDocTypeCol).should('have.attr','class').and('contain','document_type_ignoreList')              
                cy.get(this.facility360IgnoredDocListTableDocStatusCol).should('have.attr','class').and('contain','document_status_ignoreList')
                cy.get(this.facility360IgnoredDocListTableDocStatusCol).children().invoke('text').should('eq','ignored')
                           
            })
        })
    }
    applyFilter(fda_prod_cat)
    {     
        cy.get(this.FdaProductCatDDBtn).click().then(()=>{   
        cy.get(this.FdaProdCatDD).should('be.visible')
        cy.get(this.FdaProdCatDD+" "+this.FdaProdCatCheckbox).check(fda_prod_cat).should('be.checked').and('have.value',fda_prod_cat)
        cy.get(this.BtnsOnIgnoredDocList).contains('Submit').click()
        cy.wait(4000)
      })  
    }
    verifyFilter(fda_prod_cat)
    {
        cy.get(this.facility360IgnoredDocListTableRows).each(($row) =>{
            cy.wrap($row).within(()=>{
               cy.get(this.facility360IgnoredDocListTableFDACatCol).then(($FDAProductCat)=>{
                expect($FDAProductCat.text().trim().toLowerCase()).eq(fda_prod_cat.toLowerCase())
               })                        
            })
        }) 
    }  
} 
export default IgnoreDocument;
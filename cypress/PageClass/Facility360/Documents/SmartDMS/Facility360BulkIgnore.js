class BulkIgnoreIcon
{
    smartDMTable = "div[class='uk-overflow-auto'] table tbody tr"
    fdaCatCol=" td:nth-child(2) p"
    docCatCol=" td:nth-child(4)"
    docTypeCol=" td:nth-child(5)"

    facility360BulkIgnoreIcon="i[id^='ignore']"
    facility360IgnoredDocListTableRows="#ignoreList_smartDMS_table tr"
    facility360IgnoredDocListTableFDACatCol="td:nth-child(2) p"
    facility360IgnoredDocListTableDocCatCol="td:nth-child(3)"
    facility360IgnoredDocListTableDocTypeCol="td:nth-child(4)"
    bulkRetrieveDocCheckbox="#IgnoredDocumentList input[class='uk-checkbox selectAllIgnoreListCheckbox']"
    bulkRetrieveDocIcon="#retrieveDocumentsBtn"

    
    importerTableDocTypeCol=" td:nth-child(6) p"
    importerTableDocCatCol=" td:nth-child(5) p"
    
    
    clickOnBulkIgnoreIcon()
    {    
        cy.get(this.facility360BulkIgnoreIcon).click()
    
    }  
     verifyBulkIgnoredDoc()
    {
        let i=1,j=1,k=1
        cy.get(this.facility360IgnoredDocListTableRows).each(($row)=>{
            cy.wrap($row).within(()=>{               
                    cy.get(this.facility360IgnoredDocListTableFDACatCol).then(($fda_cat_ignored)=>{                 
                        cy.get('@FdaCat'+i).then((fda_cat)=>{
                            expect($fda_cat_ignored.text().trim().toUpperCase()).eq(fda_cat.toUpperCase()) 
                            i++
                         })                                                
                    }) 
                    cy.get(this.facility360IgnoredDocListTableDocCatCol).then(($doc_cat_ignored)=>{                             
                        cy.get('@DocCat'+j).then((doc_cat)=>{                                       
                        expect($doc_cat_ignored.text().trim()).eq(doc_cat)
                        j++
                         })
                    })
                    cy.get(this.facility360IgnoredDocListTableDocTypeCol).then(($doc_type_category)=>{  
                        cy.get('@DocType'+k).then((doc_type)=>{                                    
                        expect($doc_type_category.text().trim().toLowerCase()).eq(doc_type.toLowerCase())
                        k++
                        })
                    })                                 
            })
       }) 
    }
    /*verifyBulkIgnoredDoc(Count)
    {
        let i,m
        let fda_cat,doc_cat,doc_type
        cy.get(this.facility360IgnoredDocListTableRows).then((row)=>{
            m = row.length
        })
        for(m,i=Count;m>=Count;m--,i--)
        {
            fda_cat= this.facility360IgnoredDocListTableRows+":nth-child("+m+")"+this.fdaCatCol
            cy.get(fda_cat).then(($fdaCat)=>{
                cy.get('@FdaCat'+i).then((fda_cat)=>{
                    expect(fda_cat).eq($fdaCat.text().trim())                    
                 })                                                      
            })
            doc_cat = this.facility360IgnoredDocListTableRows+":nth-child("+m+")"+this.docCatCol 
            cy.get(doc_cat).then(($docCat)=>{
                cy.get('@DocCat'+i).then((doc_cat)=>{
                    expect(doc_cat).eq($docCat.text().trim())                   
                 })                                                      
            })
            doc_type = this.facility360IgnoredDocListTableRows+":nth-child("+m+")"+this.docTypeCol 
            cy.get(doc_type).then(($docType)=>{
                cy.get('@DocType'+i).then((doc_type)=>{
                    expect(doc_type).eq($docType.text().trim())                    
                 })                                                      
            })
        }      
    }*/
    retrieveBulkIgnoredDoc()
    {
        cy.get(this.bulkRetrieveDocCheckbox).check().should('be.checked').then(()=>{
            cy.get(this.bulkRetrieveDocIcon).click()
        })
    } 
    verifyRetrievedBulkIgnoredDoc(bulkIgnoreCount,role)
    {
        let doc_cat, fda_cat, doc_type
        for (let i = 1; i <= bulkIgnoreCount; i++) {
            fda_cat = this.smartDMTable + ":nth-child(" + i + ")" + this.fdaCatCol
            cy.get(fda_cat).then(($fdaCat) => {
                cy.get('@FdaCat' + i).then((fda_cat) => {
                    expect(fda_cat).eq($fdaCat.text().trim())
                })
            })
            if (role == 'Importer') {
                doc_cat = this.smartDMTable + ":nth-child(" + i + ")" + this.importerTableDocCatCol
                doc_type = this.smartDMTable + ":nth-child(" + i + ")" + this.importerTableDocTypeCol
            }
            else {
                doc_cat = this.smartDMTable + ":nth-child(" + i + ")" + this.docCatCol
                doc_type = this.smartDMTable + ":nth-child(" + i + ")" + this.docTypeCol
            }
            cy.get(doc_cat).then(($docCat) => {
                cy.get('@DocCat' + i).then((doc_cat) => {
                    expect(doc_cat).eq($docCat.text().trim())
                })
            })
            cy.get(doc_type).then(($docType) => {
                cy.get('@DocType' + i).then((doc_type) => {
                    expect(doc_type).eq($docType.text().trim())
                })
            })
        }
    }
}
export default BulkIgnoreIcon;

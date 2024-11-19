class BulkUpload
{
    smartDMTable = "div[class='uk-overflow-auto'] table tbody tr"
    filterCheckbox = " input[type='checkbox']"
    bulkUploadIcon="i[id^='add']"                               //"#addPlaceholder"
    bulkUploadModal ="#bulkUpload "
    btnOnBulkUploadModal = "#bulkUpload button"
    fdaCatCol=" td:nth-child(2) p"
    productCodeCol=" td:nth-child(3)"
    docCatCol=" td:nth-child(4)"
    docTypeCol=" td:nth-child(5)"
    bulkUploadModalTable="#bulkUpload #documentTableModal tr"
    bulkUploadModalfdaCatCol=" td:nth-child(2)"
    bulkUploadModaldocCatCol=" td:nth-child(3)"
    bulkUploadModaldocTypeCol=" td:nth-child(4)"

    facility360TableDocRows="table[class='uk-table docs'] tr[id^='parent']"
    facility360TableDocNameCol=" td:nth-child(2) p"
    facility360TableDocTypeCol=" td:nth-child(3) p"
    facility360TableDocCatCol=" td:nth-child(4) p"
    facility360TableDocProductCol=" td:nth-child(5) p"

    importerdocCatCol=" td:nth-child(5)"
    importerdocTypeCol=" td:nth-child(6)"
    importerSupplierNameCol=" td:nth-child(4) p"
    importerBulkUploadModaldocCatCol=" td:nth-child(4)"
    importerBulkUploadModaldocTypeCol=" td:nth-child(5)"
    importerBulkUploadModalSupplierNameCol=" td:nth-child(3)"

    importerTableDocNameCol=" td:nth-child(4) p"
    importerTableDocTypeCol=" td:nth-child(5) p"
    importerTableDocCatCol=" td:nth-child(6) p"
    importerTableSupplierNameCol=" td:nth-child(7) p"
    importerTableDocProductCol=" td:nth-child(9) p"
    
    verifyBulkUploadIconIsDisabled()
    {
        cy.get(this.bulkUploadIcon).should('be.disabled')
    }
    verifyBulkUploadIconIsEnabled()
    {
        cy.get(this.bulkUploadIcon).should('not.be.disabled')
    }
    selectDocuments(bulkUploadCount,role)
    {
        let doc_cat, doc_type,supplier_name;
        for(let i=1;i<=bulkUploadCount;i++)
        {          
            let doc_checkbox = this.smartDMTable+":nth-child("+i+")"+this.filterCheckbox
            cy.get(doc_checkbox).check().should('be.checked')
            let fda_cat= this.smartDMTable+":nth-child("+i+")"+this.fdaCatCol
            cy.get(fda_cat).then(($fda_cat)=>{
                cy.wrap($fda_cat.text().trim()).as('FdaCat'+i)
            })
            let product_code= this.smartDMTable+":nth-child("+i+")"+this.productCodeCol
            cy.get(product_code).then(($product_code)=>{
                cy.wrap($product_code.text().trim()).as('ProductCode'+i)
            })
            if(role == 'Importer')
            {
                doc_cat = this.smartDMTable+":nth-child("+i+")"+this.importerdocCatCol 
                doc_type = this.smartDMTable+":nth-child("+i+")"+this.importerdocTypeCol 
                supplier_name = this.smartDMTable+":nth-child("+i+")"+this.importerSupplierNameCol 
                cy.get(supplier_name).then(($supplier_name)=>{
                    cy.wrap($supplier_name.text().trim()).as('SupplierName'+i)
                })         
            }      
            else
            {
                doc_cat = this.smartDMTable+":nth-child("+i+")"+this.docCatCol 
                doc_type = this.smartDMTable+":nth-child("+i+")"+this.docTypeCol 
            }
            cy.get(doc_cat).then(($doc_cat)=>{
                cy.wrap($doc_cat.text().trim()).as('DocCat'+i)
            })         
            cy.get(doc_type).then(($doc_type)=>{
                cy.wrap($doc_type.text().trim()).as('DocType'+i)
            })              
        }
    }
    verifyBulkAddDoc(addCount,role)
    {
        let j = 1;
        let flag;
        let doc_name,doc_cat,doc_type,doc_product,product_name,supplier_name;       
        for(let i=1;i<=addCount;i++)
        {
            if (role == 'Importer') {
                doc_name = this.facility360TableDocRows + ":nth-child(" + j + ")" + this.importerTableDocNameCol
                doc_cat = this.facility360TableDocRows+":nth-child("+j+")"+this.importerTableDocCatCol
                doc_type = this.facility360TableDocRows+":nth-child("+j+")"+this.importerTableDocTypeCol
                product_name = this.facility360TableDocRows+":nth-child("+j+")"+this.importerTableDocProductCol
                supplier_name = this.facility360TableDocRows+":nth-child("+j+")"+this.importerTableSupplierNameCol
                cy.get(supplier_name).then(($supplier)=>{
                    cy.get('@SupplierName'+i).then((SupplierName)=>{
                        expect($supplier.text().trim()).to.eq(SupplierName)
                        flag = 'Importer'                 
                    })
                })             
            }
            else {
                doc_name = this.facility360TableDocRows + ":nth-child(" + j + ")" + this.facility360TableDocNameCol
                doc_cat = this.facility360TableDocRows+":nth-child("+j+")"+this.facility360TableDocCatCol
                doc_type = this.facility360TableDocRows+":nth-child("+j+")"+this.facility360TableDocTypeCol
                product_name = this.facility360TableDocRows+":nth-child("+j+")"+this.facility360TableDocProductCol
                flag='Exporter'
            }
            cy.wrap(flag).as('acc_role')           
            cy.get(doc_name).then(($doc_name)=>{
                cy.get('@DocType'+i).then((DocType) =>{
                    expect($doc_name.text().trim()).eq(DocType)
                })             
            })          
            cy.get(doc_cat).then(($doc_cat)=>{
                cy.get('@DocCat'+i).then((DocCat) =>{
                    expect($doc_cat.text().trim()).eq(DocCat)
                })             
            })          
            cy.get(doc_type).then(($doc_type)=>{
                cy.get('@DocType'+i).then((DocType) =>{
                    expect($doc_type.text().trim()).eq(DocType)
                })             
            })
            cy.get(product_name).then(($product_name)=>{
                cy.get('@FdaCat'+i).then((FdaCat)=>{
                    expect($product_name.text().trim().toLowerCase()).to.include(FdaCat.toLowerCase())
                   
                })
            })         
            j=j+2;           
        }
    }
    clickOnBulkUploadIcon(role)
    {
        let i=1,j=1,k=1,l=1
        let bulkUploadDocCatCol, bulkUploadDocTypeCol
        cy.get(this.bulkUploadIcon).click().then(()=>{
         cy.get(this.bulkUploadModal).should('exist').and('be.visible')
          cy.get(this.bulkUploadModalTable).each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.bulkUploadModalfdaCatCol).then(($bulkUploadModalfdaCatCol)=>{
                    cy.get('@FdaCat'+i).then((fdaCat)=>{
                    expect($bulkUploadModalfdaCatCol.text().trim()).eq(fdaCat) 
                    i++                  
                    })                      
                })
                if(role == 'Importer')
                {
                    bulkUploadDocCatCol = this.importerBulkUploadModaldocCatCol
                    bulkUploadDocTypeCol =this.importerBulkUploadModaldocTypeCol
                    cy.get(this.importerBulkUploadModalSupplierNameCol).then(($supplierName)=>{
                        cy.get('@SupplierName'+l).then((supplier_name)=>{
                        expect($supplierName.text().trim()).eq(supplier_name) 
                        l++                               
                        })                      
                    })
                }              
                else
                {
                    bulkUploadDocCatCol =this.bulkUploadModaldocCatCol
                    bulkUploadDocTypeCol = this.bulkUploadModaldocTypeCol
                }
                    
                cy.get(bulkUploadDocCatCol).then(($bulkUploadModaldocCatCol)=>{
                    cy.get('@DocCat'+j).then((docCat)=>{
                    expect($bulkUploadModaldocCatCol.text().trim()).eq(docCat) 
                    j++                               
                    })                      
                })
                cy.get(bulkUploadDocTypeCol).then(($bulkUploadModaldocTypeCol)=>{
                    cy.get('@DocType'+k).then((docType)=>{
                    expect($bulkUploadModaldocTypeCol.text().trim()).eq(docType) 
                    k++                               
                    })                      
                })                       
            })
          })       
        })
    }
    clickOnSaveBtn()
    {
        cy.get(this.btnOnBulkUploadModal).contains('Save').click()
    }

}
export default BulkUpload;
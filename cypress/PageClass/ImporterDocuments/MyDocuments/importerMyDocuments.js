class importerMyDocuments
{
    importerDocumentsTab = "li[class^='repo-nav-link new-view'] a[href='/documents']"
    importerMyDocumentsTab="div[class='documents-tab'] a[class='importerSmartDMSMyDoc']"
    
    addDocBtnSection="div[class$='add-doc-buttons'] a"
    newDocForm="#newDocForm"
    selectfacilityDD="select[class^='doc-facility']"
    selectProductDD="div[class='ms-parent doc-products'] span[class='placeholder']"
    productDDListCheckbox="div[class='ms-parent doc-products'] li input[type='checkbox']"
    productCatNumber="input[name='prodNum']"
    productName="input[name='prodName']"
    nextBtn="#newDocForm button[class$='next-step']"

    facility360DocName="input[name='docName']"                   
    facility360DocDesc="textarea[class ='input-field doc-desc']"         
    facility360DocCat="select[name='docCat']"                                        
    facility360DocVi="input[name='docInterval']"                    
    facility360DocVp="select[name='docPeriod']" 
    docSaveWithLabelNextBtn="#newDocForm button[class$='doc-save-button']"

    uploadFileFromComputer="div[class='doc-successful-save'] div[class$='add-doc-file']"
    uploadDocInput="input[type='file'][class='doc-file']"
    uploadDocSubmitBtn="button[class*='submit-add-or-req-file-button']"

    skipForNowBtn="#newDocForm button[class$='cancel-doc']"

    facility360TableDocRows="table[class='uk-table docs'] tr[id^='parent']"
    importerMyDocTableDocName="p[class='doc-name'] a"
    docDetailDelDocLink ="div[class='doc-info'] a[class='doc-delete']"
    delDocConfirmationText="div[class='uk-modal-dialog'] div[class='uk-margin uk-modal-content']"
    delDocConfirmationBtn="div[class='uk-modal-dialog'] div[class^='uk-modal-footer'] button"
    table_doc_col="td:nth-child(7) p"
    
    importerMyDocTableReqStatusCol="td[class$='requestType'] p"

    importerTableMyDoc="div[class='doc-results']"
    myDocTableResultCount="div[class='results-count']"

    selectImporterDocumentsTab()
    {
        cy.get(this.importerDocumentsTab).click()
    }
    selectImporterMyDocumentsTab()
    {
     cy.get(this.importerMyDocumentsTab).click()   
    }
    clickOnAddDocuments()
    {
        cy.get(this.addDocBtnSection).contains('Add Documents').click().then(()=>{
            cy.get(this.newDocForm).should('be.visible')
        })
    }
    enterFacilityProductDetails(docInput)
    {
        cy.get(this.selectfacilityDD).select(docInput.SupplierName,{force:true}).then(()=>{
            cy.get(this.selectfacilityDD+" option:selected").invoke('text').should('eq',docInput.SupplierName)
        })
        cy.wait(2000)
        cy.get(this.selectProductDD).click().then(()=>{
            cy.get(this.productDDListCheckbox).check(docInput.ProductCategory).should('be.checked').type('{enter}')
        })
        cy.get(this.productCatNumber).type(docInput.ProductCatNumber)
        cy.get(this.productName).type(docInput.Product)
        cy.get(this.nextBtn).click()
    }
    enterDocumentDetails(docInput)
    {
        cy.wait(1000)
        cy.contains("Select Document Type").click()
        let facility360Doctype = "//li[@aria-label='"+docInput.Cat+"']//li[contains(text(),'"+docInput.Type+"')]"
        cy.xpath(facility360Doctype).click() 
        cy.get(this.facility360DocName).clear().type(docInput.Name)
        cy.wait(200)
        cy.get(this.facility360DocDesc).clear().type(docInput.Desc)
        cy.get(this.facility360DocCat).select(docInput.Cat,{force:true})
        cy.get(this.facility360DocVi).clear().type(docInput.Vi)
        cy.wait(200)
        cy.get(this.facility360DocVp).select(docInput.Vp.docVpText).should('have.value',docInput.Vp.docVpValue)
        cy.get(this.docSaveWithLabelNextBtn).click()
        cy.wait(100)
    }
    uploadDocumentFile(file_name,mime_type)
    {
        cy.get(this.uploadFileFromComputer).click().then(()=>{
            cy.get(this.uploadDocInput).selectFile({
            contents :'cypress/fixtures/'+file_name,
            fileName : file_name,
            mimeType : mime_type,
            lastModified: Date.now()
          },{force:true})
        cy.wait(5000)         
        cy.get(this.uploadDocSubmitBtn).click()
        })
    }
    checkRequestStatusOfDoc(reqDocCount)
    {
        let request_status,i
        let j=1
        for(i=1;i<=reqDocCount;i++)
        {
            request_status = this.facility360TableDocRows+":nth-child("+j+")" +" "+this.importerMyDocTableReqStatusCol
            cy.get(request_status).should('have.text','Requested')
            j=j+2
        }
        
    }
    getMyDocTableCount()
    {
        let Flag = false
        cy.get(this.importerTableMyDoc).children().invoke('attr','class').then(($attr)=>{
            if($attr.includes("no-doc-results"))
            {
              cy.log("No documents found")
            } 
            else
            {  
                Flag=true
                cy.get(this.myDocTableResultCount).invoke('text').then(($resultCountText)=>{
                    let count = $resultCountText.split("of")
                    cy.log(count[1].trim())
                    cy.wrap(count[1].trim()).as('docCount')
                })
            }
            cy.wrap(Flag).as('docPresentFlag') 
        })    
    }
    validateSupplierName(supplier_name)
    {
       cy.get(this.facility360TableDocRows).each(($row) =>{                       
            cy.wrap($row).within(()=>{                
                cy.get(this.table_doc_col).then(($col)=>{                                                                                    
                        expect($col.text().trim()).eq(supplier_name)                                
                })                 
            })
        })       
    }
    deleteDocument(docName)
    {
        cy.get(this.facility360TableDocRows).then(($row) =>{
            cy.get($row).find(this.importerMyDocTableDocName).click().wait(500)           
                cy.get($row).next().as('doc_detail_info_ele').should('be.visible')
                cy.get('@doc_detail_info_ele').find(this.docDetailDelDocLink).click().then(()=>{
                    cy.get(this.delDocConfirmationText).should('contain.text','Are you sure you want to delete '+docName)
                    cy.get(this.delDocConfirmationBtn).contains('Ok').click()
                })         
        })
    }
}
export default importerMyDocuments;
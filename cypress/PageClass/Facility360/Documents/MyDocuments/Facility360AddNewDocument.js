

class NewDocument
{
    facility360documentTab=".documents > .tab-link"
    facility360MyDocumentsTab="div[class*='documents'][class*='tab'] ul[class='uk-tab'] a"                    //"div[class='uk-width-1-1 documents-smart-tabs'] a"
    facility360AddDocument=".new-doc-button"
                
    
   facility360DocName="input[name='docName']"                   
    facility360DocDesc="textarea[class ='input-field doc-desc']"         
    facility360DocCat="select[name='docCat']"                            
               
    facility360DocVi="input[name='docInterval']"                    
    facility360DocVp="select[name='docPeriod']"                   
    facility360DocNextBtn=".doc-save-button"
    facility360DocVf="input[name='docVaildFrom']"        
    facility360DocVt="input[name='docValidTo']"          
    facility360DocAddComments="textarea[name='docNotes']"    
    facility360UploadDocFile="input[class='doc-file']"
    facility360SkipForNowBtn="//button[text()='Skip For Now']"
    facility360DocSubmitBtn=".submit-add-or-req-file-button"
    
    facility360SearchDoc="input[name='docSearch']"
    facility360ApplyFilterBtn="button[class$='blue-button apply-button']"
    
    facility360TableDocRows="table[class='uk-table docs'] tr[id^='parent']"
    facility360TableDocNameCol="td:nth-child(2) p"
    facility360TableDocTypeCol="td:nth-child(3) p"
    facility360TableDocCatCol="td:nth-child(4) p"
    facility360TableDocProductCol="td:nth-child(5)"
    facility360TableDocStatusCol="td:nth-child(6) p"
    facility360TableDocValidToCol="td:nth-child(7) p"
    facility360TableDocCheckbox="td:nth-child(1) input[type='checkbox']"

    //facility360TableDocTypeColFilter="td:nth-child(3)"
    //facility360TableDocCatColFilter="td:nth-child(4) p"

    facility360TableDocName="//table[@class='uk-table docs']//td//p[@class='doc-name']"  
    facility360TableFirstDocName="table[class='uk-table docs'] tr:first-child td p[class='doc-name']"                                                                     //"table[class='uk-table docs'] tr:first-child td:nth-child(2) p" 
    facility360TableFirstDocType="table[class='uk-table docs'] tr:first-child td p[class='doc-col doc-type']"                                                             //"table[class='uk-table docs'] tr:first-child td:nth-child(3) p" 
    facility360TableDocCat="//table[@class='uk-table docs']//td//p[@class='doc-col doc-category']"
    facility360TableFirstDocCat="table[class='uk-table docs'] tr:first-child td p[class='doc-col doc-category']"                                                          // "table[class='uk-table docs'] tr:first-child td:nth-child(4) p"
    facility360TableDocProd="//table[@class='uk-table docs']//td//p[@class='doc-col doc-product']"
    facility360TableFirstDocProd="table[class='uk-table docs'] tr:first-child td p[class='doc-col doc-product']"                                                            //"table[class='uk-table docs'] tr:first-child td:nth-child(5) p"
    facility360TableFirstDocProdName="table[class='uk-table docs'] tr:first-child td p[class='doc-col product-name']"
    facility360TableFirstDocProdCatNo="table[class='uk-table docs'] tr:first-child td p[class^='doc-col prod'][class$='num']"
    
    facility360TableDocDownload="table[class='uk-table docs'] td div[class='doc-actions'] > i[class='fas fa-file-download doc-download']"
    facility360DownloadSpreadSheet="i[class^='repo-export-csv fas fa-download']"
    
    facility360TableMyDoc="div[class='doc-results']"

    facility360ExpiredDocLabel="div[class='doc-status-cnts uk-float-left uk-margin-left']" 
    facility360ExpiredDocLabelCount="div[class='doc-status-cnts uk-float-left uk-margin-left'] span[class='status-cnt expired-cnt']"  //"span[class='doc-status-cnt expired pill']"
    facility360MyDocTableCount="div[class='doc-results'] div[class='results-count']" 
    
    importerTableFirstDocSupplierName="table[class='uk-table docs'] tr:first-child td p[class='doc-col doc-facility']"

    selectDocumentTab()
    {
        cy.get(this.facility360documentTab).click()
    }
    selectMyDocumentsTab()
    {
       cy.get(this.facility360MyDocumentsTab).contains('My Documents').click({force:true})
        
    }
    clickOnAddDocument()
    {
        cy.get(this.facility360AddDocument).click()
    }
    EnterInputData(docInput)
    {
        cy.wait(1000)
        cy.contains("Select Document Type").click()
        let facility360Doctype = "//li[@aria-label='"+docInput.Cat+"']//li[contains(text(),'"+docInput.Type+"')]"
        cy.xpath(facility360Doctype).click() 
       // cy.get("form[@id='newExpDocForm'] "+this.facility360DocType).select(docInput.Type,{force:true}).should('include.text',docInput.Type)
        cy.get(this.facility360DocName).clear().type(docInput.Name)
        cy.wait(200)
        cy.get(this.facility360DocDesc).clear().type(docInput.Desc)
        cy.get(this.facility360DocCat).select(docInput.Cat,{force:true})
        let facility360DocProducts="input[value='"+docInput.Products+"']"
        cy.get(facility360DocProducts).click({force:true})
        cy.get(this.facility360DocVi).clear().type(docInput.Vi)
        cy.wait(200)
        cy.get(this.facility360DocVp).select(docInput.Vp.docVpText).should('have.value',docInput.Vp.docVpValue)
        cy.get(this.facility360DocNextBtn).click()
        cy.wait(800)
        cy.get(this.facility360DocAddComments).type(docInput.Comments) 

        //cy.get(this.facility360DocVf).type(docInput.Vf)
       // cy.get(this.facility360DocVt).type(docInput.Vt)      
               
    } 
    
    clickOnSkipForNowBtn()
    {
        cy.xpath(this.facility360SkipForNowBtn).click();
        cy.wait(20000)
    } 
    clickOnSaveDocBtn()
    {
        cy.get(this.facility360DocSubmitBtn).click()
       // cy.wait(20000)
    } 
    searchDoc(docInput,role)
    {
        cy.get(this.facility360SearchDoc).clear().type(docInput.Name)
        cy.get(this.facility360ApplyFilterBtn).click()
        cy.wait(8000)
        cy.get(this.facility360TableFirstDocName).should('include.text',docInput.Name)
        cy.get(this.facility360TableFirstDocType).should('include.text',docInput.Type) 
        cy.get(this.facility360TableFirstDocCat).should('include.text',docInput.Cat)
        cy.get(this.facility360TableFirstDocProd).should('include.text',docInput.ProductCategory)
        cy.get(this.facility360TableFirstDocProdCatNo).should('have.text',docInput.ProductCatNumber)
        cy.get(this.facility360TableFirstDocProdName).should('have.text', docInput.Product)
        if(role == 'Importer')
        cy.get(this.importerTableFirstDocSupplierName).should('have.text',docInput.Supplier)

    }
    
    DownloadDoc()
    {
         cy.get(this.facility360TableDocDownload).click().then(()=>{
            cy.wait(5000)
            cy.get(this.facility360TableDocDownload).invoke('attr','data-fn').then((filname)=>{       
                 // cy.readFile('cypress/downloads/'+filname).should('exist') 
                   cy.readFile('cypress/downloads/'+filname,'utf-8',(err,data)=>{
                        if(err)
                        {
                            throw err
                        }
                        else
                        {
                            cy.log(data)
                        }
                    })
                    //.should('contain','CHEESE, ASIAGO, FRESH, MEDIUM SOFT AND OLD')            
            })
        })
    }
  
    viewMyDoc()
    {          
        cy.get(this.facility360TableDocRows).each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.facility360TableDocNameCol).as('docName').should('have.attr','class').and('equal','doc-name')
                cy.get('@docName').then(($document_name)=>{
                    cy.log('The Document Name is : '+$document_name.text().trim())
                })          
                cy.get(this.facility360TableDocTypeCol).should('have.attr','class').and('equal','doc-col doc-type')
                cy.get(this.facility360TableDocCatCol).should('have.attr','class').and('equal','doc-col doc-category')
              /*  cy.get(this.facility360TableDocProductCol).then(($ele)=>{
                    if($ele.hasChildNodes())
                    {
                        cy.get(this.facility360TableDocProductCol+" p").should('have.attr','class').and('equal','doc-col doc-product')
                    }
                   
                }) */
                cy.get(this.facility360TableDocStatusCol).should('have.attr','class').and('contain','doc-col doc-status')
                cy.get(this.facility360TableDocValidToCol).should('have.attr','class').and('contain','doc-col doc-valid-to')              
            })
        })
    }
    clickOnExpiredStatusLabel()
    {       
        cy.get(this.facility360ExpiredDocLabel).contains('Expired').click()
    }
    clickOnValidStatusLabel()
    {
        cy.get(this.facility360ExpiredDocLabel).contains('Valid').click()
    }
    verifyExpiredStatusData()
    {
        cy.xpath(this.facility360TableDocRows).each(($row) =>{
            cy.wrap($row).within(()=>{                
                cy.get(this.facility360TableDocStatusCol).then(($col)=>{
                   expect($col.text().trim()).eq('Expired')
                })                 
            })
        })
        cy.get(this.facility360ExpiredDocLabelCount).then(($cnt)=>{
            //cy.log($cnt.text())
            cy.get(this.facility360MyDocTableCount).invoke('text').should('contain',$cnt.text())

        })
    }
    selectValidDocuments(count)
    {
        cy.get(this.facility360TableDocRows).then(($rows)=>{
            for(let i=0;i<count;i++)
            {
             cy.get($rows).eq(i).find(this.facility360TableDocCheckbox).click()   
            }
        })
    }
    downloadSpreadSheet()
    {
        cy.get(this.facility360DownloadSpreadSheet).click()
        cy.wait(3000)
        //const fname = new RegExp('^My_Documents_Report*.xlsx')
        cy.readFile('cypress/downloads/My_Documents_Report.xlsx','utf-8',(err,data)=>{
            if(err)
            {
               cy.log(err.message)
            }
            else
            {
                cy.log(data)
            }
        })
    }

}
export default NewDocument;
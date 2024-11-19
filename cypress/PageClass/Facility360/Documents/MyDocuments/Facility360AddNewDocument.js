

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
    
    myDocumentTableDocRows="table[class='uk-table docs'] tr[id^='parent']"
    myDocTableDocNameCol="p[class='doc-name']"
    myDocTableDocTypeCol="p[class='doc-col doc-type']"
    myDocTableDocCatCol="p[class='doc-col doc-category']"                                      //"td:nth-child(4) p"
    myDocTableProdCatNumCol="p[class^='doc-col prod'][class$='num']"
    myDocTableProdNameCol="p[class='doc-col product-name']"
    myDocTableSupplierNameCol="p[class='doc-col doc-facility']"
    myDocTableFdaProdCatCol="p[class='doc-col doc-product']"
    myDocTableDocStatusCol="p[class^='doc-col doc-status']"
    myDocTableDocValidToCol="p[class^='doc-col doc-valid-to']"

    facility360TableDocCheckbox="input[type='checkbox']"
    myDocTableDocDownload="div[class='doc-actions'] > i[class='doc-download']"
    facility360DownloadSpreadSheet="i[class^='repo-export-csv fas fa-download']"
     
    facility360TableMyDoc="div[class='doc-results']"

    facility360DocStatusLabels="div[class='doc-status-cnts uk-float-left uk-margin-left'] > span" 
    facility360ExpiredDocLabelCount="div[class='doc-status-cnts uk-float-left uk-margin-left'] span[class='status-cnt expired-cnt']"  //"span[class='doc-status-cnt expired pill']"
    facility360MyDocTableCount="div[class='doc-results'] div[class='results-count']" 
    

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
    } 
    
    clickOnSkipForNowBtn()
    {
        cy.xpath(this.facility360SkipForNowBtn).click();
        cy.wait(20000)
    } 
    clickOnSaveDocBtn()
    {
        cy.get(this.facility360DocSubmitBtn).click()
       
    } 
    searchDoc(docInput,role)
    {
        cy.get(this.facility360SearchDoc).clear().as('searchBox')
        cy.get('@searchBox').type(docInput.Name)
        cy.get(this.facility360ApplyFilterBtn).click()
        cy.wait(8000)
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableDocNameCol).should('include.text',docInput.Name)
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableDocTypeCol).should('include.text',docInput.Type) 
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableDocCatCol).should('include.text',docInput.Cat)
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableFdaProdCatCol).should('include.text',docInput.ProductCategory)
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableProdCatNumCol).should('have.text',docInput.ProductCatNumber)
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableProdNameCol).should('have.text', docInput.Product)
        if(role == 'Importer')
        {
        let supplierNameText = docInput.SupplierName.split("-")
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableSupplierNameCol).should('include.text',supplierNameText[0].trim())
        }
    }
    searchDocAddedThroughSmartDMS(docInput, role)
    {
        cy.get(this.facility360SearchDoc).clear().type(docInput.Name)
        cy.get(this.facility360ApplyFilterBtn).click()
        cy.wait(8000)
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableDocNameCol).should('include.text',docInput.Name)
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableDocTypeCol).should('include.text',docInput.Type) 
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableDocCatCol).should('include.text',docInput.Cat)
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableFdaProdCatCol).should('include.text',docInput.ProductCategory)
        if(role == 'Importer')
        {
        let supplierNameText = docInput.SupplierName.split("-")
        cy.get(this.myDocumentTableDocRows+":first-child "+this.myDocTableSupplierNameCol).should('include.text',supplierNameText[0].trim())
        } 
    }
    
    DownloadDoc() {
        cy.get(this.myDocumentTableDocRows + ":first-child " + this.myDocTableDocDownload).as('downloadIcon').click().then(() => {
            cy.wait(5000)
            cy.get('@downloadIcon').invoke('attr', 'data-fn').then((filname) => {
                cy.readFile('cypress/downloads/' + filname, 'utf-8', (err, data) => {
                    if (err) {
                        throw err
                    }
                    else {
                        cy.log('Downloaded file name : ' + filname)
                        //cy.log(data)
                    }
                })
                //.should('contain','CHEESE, ASIAGO, FRESH, MEDIUM SOFT AND OLD')            
            })
        })
    } 
    viewMyDoc()
    {          
        cy.get(this.myDocumentTableDocRows).each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.myDocTableDocNameCol).as('docName').should('have.attr','class').and('equal','doc-name')
                cy.get('@docName').then(($document_name)=>{
                    cy.log('The Document Name is : '+$document_name.text().trim())
                })          
                cy.get(this.myDocTableDocTypeCol).should('have.attr','class').and('equal','doc-col doc-type')
                cy.get(this.myDocTableDocCatCol).should('have.attr','class').and('equal','doc-col doc-category')
                cy.get(this.myDocTableDocStatusCol).should('have.attr','class').and('contain','doc-col doc-status')
                cy.get(this.myDocTableDocValidToCol).should('have.attr','class').and('contain','doc-col doc-valid-to')              
            })
        })
    }
    clickOnDocStatusLabel(docStatusLabel)
    {    
        cy.log(docStatusLabel)   
        cy.get(this.facility360DocStatusLabels).contains(docStatusLabel).click()
        
    }
    verifyDocStatusData(docStatusLabel)
    {
        cy.get(this.myDocumentTableDocRows).each(($row) =>{
            cy.wrap($row).within(()=>{                
                cy.get(this.myDocTableDocStatusCol).then(($col)=>{
                   expect($col.text().trim()).eq(docStatusLabel)
                })                 
            })
        })
       /* cy.get(this.facility360ExpiredDocLabelCount).then(($cnt)=>{
            //cy.log($cnt.text())
            cy.get(this.facility360MyDocTableCount).invoke('text').should('contain',$cnt.text())

        })*/
    }
    selectValidDocuments(count)
    {
        cy.get(this.myDocumentTableDocRows).then(($rows)=>{
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
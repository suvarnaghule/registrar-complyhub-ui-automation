class DocumentType
{
    documentTypeTab="ul[class='uk-tab'] li a[class^='documentsType']"
    btnOnDocTypeSearchArea="div[class='doc-type-search'] button"
    newDocTypeForm="div[class='uk-modal uk-open']"
    

    newDocTypeName="input[name='newDocTypeName']"
    newDocTypeDesc="textarea[name='newDocTypeDesc']"
    newDocTypeCategory="input[name='newDocTypeCat']"
    newDocTypeVi="input[name='newDocTypeInterval']"
    newDocTypeVp="select[name='newDocTypePeriod']"
    newDocTypeUploadFile="form[id^='addNew'][id$='DocTypeForm'] input[type='file']"

    saveNewDocType="#saveNewDocType"
    searchDocType="div[class='doc-type-search'] input[name='docTypeSearch']"

    docTypeTable="div[class='doc-type-results'] table tbody tr"
    docTypeNameCol="p[class='doc-type-name']"
    docTypeDescCol="p[class='doc-type-description']"
    docTypeCatCol="p[class='doc-type-category']"
    docTypeValidityCol="p[class='doc-type-validity']"
    docTypeFilenameCol="p[class='doc-type-file-name']"
    docTypeCreatedCol="p[class='doc-type-created']"
    docTypeUpdatedCol="p[class^='doc-type-updated']"

    deleteDocTypeBtn="i[class$='doc-type-delete']"
    deleteConfirmPopUp="div[class='uk-modal uk-open'] div[class='uk-modal-dialog']"
    deleteConfirmPopUpText="div[class$='uk-modal-content']"
    delConfirmPopUpBtns="div[class*='uk-modal-footer'] button"

    documentTypeTable="div[class='doc-type-results']"
     

    selectDocumentTypeTab()
    {
        cy.get(this.documentTypeTab).click();
    }
    clickOnNewDocType()
    {
        cy.get(this.btnOnDocTypeSearchArea).contains('New Document Type').click().then(()=>{
            cy.get(this.newDocTypeForm).should('exist').and('be.visible')
        })
    }
    
    enterDetails(data)
    {
        cy.get(this.newDocTypeName).clear().type(data.Name)
        cy.get(this.newDocTypeDesc).clear().type(data.Desc)
        cy.get(this.newDocTypeCategory).clear().type(data.Category)
        cy.get(this.newDocTypeVi).clear().type(data.Vi)
        cy.wait(200)
        cy.get(this.newDocTypeVp).select(data.Vp.docVpText).should('have.value',data.Vp.docVpValue)
        cy.get(this.newDocTypeUploadFile, { force: true }).selectFile({
            contents: 'cypress/fixtures/'+data.fileName,
            fileName: data.fileName,
            mimeType: data.mimeType,
        }, { force: true });
        cy.wait(15000)
        cy.get(this.saveNewDocType).click()
    }
    verifyNewDocType(data)
    {      
        cy.get(this.docTypeTable+":first-child").each(($row) =>{
            cy.wrap($row).within(()=>{                
                cy.get(this.docTypeNameCol).then(($nameCol)=>{
                   expect($nameCol.text().trim()).eq(data.Name)
                }) 
                cy.get(this.docTypeDescCol).then(($descCol)=>{
                    expect($descCol.text().trim()).eq(data.Desc)
                 })
                cy.get(this.docTypeCatCol).then(($catCol)=>{
                    expect($catCol.text().trim()).eq(data.Category)
                }) 
                cy.get(this.docTypeFilenameCol).invoke('text').then((file_name)=>{
                    if(file_name.trim() === "")
                    {
                        cy.log("No file attached to document")
                    }
                    else
                    {
                        expect(file_name.trim()).to.include(data.fileName)
                    }
                }) 
            })
        })      
    }
    downloadFileAttachment(file_name)
    {
        cy.get(this.docTypeTable+":first-child").each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.docTypeFilenameCol+" a").contains(file_name).click().then(($filename)=>{
                   let fname = $filename.text().trim()
                   expect(fname).to.eq(file_name) 
                  cy.readFile('cypress/downloads/'+fname).should('exist') 
                })
             })               
        })    
    }
    viewDocTypeList()
    {
        cy.get(this.docTypeTable).each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.docTypeNameCol+" p").should('have.attr','class').and('eq','doc-type-name')
                cy.get(this.docTypeDescCol+" p").should('have.attr','class').and('eq','doc-type-description')
                cy.get(this.docTypeCatCol+" p").should('have.attr','class').and('eq','doc-type-category')              
                cy.get(this.docTypeValidityCol+" p").should('have.attr','class').and('eq','doc-type-validity')
                cy.get(this.docTypeFilenameCol+" p").should('have.attr','class').and('eq','doc-type-file-name')
                cy.get(this.docTypeCreatedCol+" p").should('have.attr','class').and('eq','doc-type-created')
                cy.get(this.docTypeUpdatedCol+" p").should('have.attr','class').and('contain','doc-type-updated')                          
            })
        })
    }
    searchDocumentType(name)
    {
        cy.get(this.searchDocType).as('searchDoc').clear()      
        cy.get('@searchDoc').type(name)
        cy.get(this.btnOnDocTypeSearchArea).contains('Search').click()
        cy.wait(2000)
        cy.get(this.documentTypeTable).children().invoke('attr','class').then(($attr)=>{
            if($attr.includes("no-doc-type-results"))
            {
              cy.log("No document type found")
            }          
        })
    }
    deleteDocumentType(docTypeName)
    {
        cy.get(this.docTypeTable+":first-child").each(($row) =>{
            cy.wrap($row).within(()=>{
                cy.get(this.deleteDocTypeBtn).click()
            })
        }).then(()=>{
            cy.get(this.deleteConfirmPopUp).should('exist').and('be.visible')
            cy.get(this.deleteConfirmPopUpText).should('contain.text','Are you sure you want to delete '+docTypeName)
            cy.get(this.delConfirmPopUpBtns).contains('Ok').click()
        })  
    }
}
export default DocumentType;
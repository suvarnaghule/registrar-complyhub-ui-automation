class updateDocumentType
{
    docTypeTable="div[class='doc-type-results'] table tbody tr"
    docTypeNameCol="td:nth-child(1)"
    docTypeDescCol="td:nth-child(2)"
    docTypeCatCol="td:nth-child(3)"
    docTypeUpdateBtn="button"

    editDocTypeForm="form[id^='edit'][id$='DocTypeForm']"                   
    editDocTypeName="input[name='editDocTypeName']"
    editDocTypeDesc="textarea[name='editDocTypeDesc']"
    editDocTypeCategory="input[name='editDocTypeCat']"
    editDocTypeVi="input[name='editDocTypeInterval']"
    editDocTypeVp="select[name='editDocTypePeriod']"
    editDocTypeUploadFile="form[id^='edit'][id$='DocTypeForm'] input[type='file']"
    
    editSaveDocType="#saveEditDocType"
    

    clickOnUpdateDocBtn()
    {
        cy.get(this.docTypeTable+":first-child").each(($row) =>{
            cy.wrap($row).within(()=>{                
                cy.get(this.docTypeUpdateBtn).contains('Update').click()
            })    
        }).then(()=>{
            cy.get(this.editDocTypeForm).should('be.visible')
        })
    }
    EnterData(updateData)
    {
        cy.get(this.editDocTypeName).clear().type(updateData.Name)
        cy.get(this.editDocTypeDesc).clear().type(updateData.Desc)
        cy.get(this.editDocTypeCategory).clear().type(updateData.Category)
        cy.get(this.editDocTypeVi).clear().type(updateData.Vi)
        cy.wait(200)
        cy.get(this.editDocTypeVp).select(updateData.Vp.docVpText).should('have.value',updateData.Vp.docVpValue)
        cy.get(this.editDocTypeUploadFile, { force: true }).selectFile({
            contents: 'cypress/fixtures/'+updateData.fileName,
            fileName: updateData.fileName,
            mimeType: updateData.mimeType,
        }, { force: true });
        cy.wait(15000)
        cy.get(this.editSaveDocType).click()
    }
} 
export default updateDocumentType;   
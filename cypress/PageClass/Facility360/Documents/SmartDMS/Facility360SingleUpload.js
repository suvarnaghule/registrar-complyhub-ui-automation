class SingleUpload
{
    facility360SmartDMUploadDocName="div[id*='uploadDocModal' i] input[class='input-field doc-name']"            //"#smartDMSExpDocModal #uploadDocModal input[class='input-field doc-name']"
    facility360SmartDMUploadDocType="select[name='docType'] option:selected"
    facility360SmartDMUploadDocCat="select[name='docCat'] option:selected"
    facility360SmartDMUploadDocProd="select[name='docProducts'] option:selected"
    smartDMProductCategoryNum="div[id*='uploadDocModal' i] input[name='prodNum']"
    smartDMProductName="div[id*='uploadDocModal' i] input[name='prodName']"
    facility360SmartDMUploadDocDesc="div[id*='uploadDocModal' i] textarea[class='input-field doc-desc']"             //"#smartDMSExpDocModal #uploadDocModal textarea[class='input-field doc-desc']"
    facility360SmartDMUploadDocVi="div[id*='uploadDocModal' i] #smart_DMS_vi"                                       //"#smartDMSExpDocModal #uploadDocModal #smart_DMS_vi"
    facility360SmartDMVp="select[id='smart_DMS_vp']"
    facility360SmartDMUploadDocAddFile="#addDocToggle"
    facility360SmartDMUploadDocAddComments="div[id*='uploadDocModal' i] textarea[class='input-field doc-notes']"       //"#smartDMSExpDocModal #uploadDocModal textarea[class='input-field doc-notes']"
    facility360SmarDMUploadDocBtns="div[id*='uploadDocModal' i] button"          //"#smartDMSExpDocModal #uploadDocModal button"

    importerSmartDMSUploadDocSupplierName="span[class='vendor-facility']"

    EnterInputdata(docInput,role)
    {
        cy.wait(500)
        if(role == 'Importer')
        {
            cy.get(this.importerSmartDMSUploadDocSupplierName).then(($supplierName)=>{
                cy.wrap($supplierName.text()).as('supplierName')
            })
        }
        cy.get(this.facility360SmartDMUploadDocType).then(($docType)=>{
            cy.wrap($docType.text()).as('docType')
        })
        cy.get(this.facility360SmartDMUploadDocCat).then(($docCat)=>{
            cy.wrap($docCat.text()).as('docCat')
        })
        cy.get(this.facility360SmartDMUploadDocProd).then(($docProduct)=>{
            cy.log($docProduct.text())
            cy.wrap($docProduct.text()).as('docProduct')
        })

        cy.get(this.facility360SmartDMUploadDocName).clear().type(docInput.Name)
        cy.wait(200)
        cy.get(this.facility360SmartDMUploadDocDesc).clear().type(docInput.Desc)
        cy.get(this.smartDMProductCategoryNum).type(docInput.ProductCatNum)
        cy.get(this.smartDMProductName).type(docInput.ProductName)
        cy.get(this.facility360SmartDMUploadDocVi).clear().type(docInput.Vi)
        cy.wait(200)
        cy.get(this.facility360SmartDMVp).select(docInput.Vp.docVpText).should('have.value',docInput.Vp.docVpValue)
        cy.get(this.facility360SmartDMUploadDocAddFile).scrollIntoView().should('be.visible').click()              // scroll upto Add file option
        cy.get(this.facility360SmarDMUploadDocBtns).contains('Save').scrollIntoView().should('be.visible')         // scroll upto save button
        cy.get(this.facility360SmartDMUploadDocAddComments).clear().type(docInput.Comments)
        cy.get(this.facility360SmarDMUploadDocBtns).contains('Save').click()  
    }
    clickOnCancel()
    {
        cy.get(this.facility360SmarDMUploadDocBtns).contains('Cancel').click()
    }

}
export default SingleUpload;   
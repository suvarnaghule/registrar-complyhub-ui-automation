class importerUpdateDocument
{
    importerUpdateDocModal="#docImplModal #form div[class='modal-content']"
    importerUpdateDocModalHeader="#docImplModal #form div[class='modal-content'] h2"
    importerUpdateDocIcon="table[class='uk-table docs'] td div[class='doc-actions'] > i[class='doc-update']"

    importerFileType="#form select[name='tn']"
    importerFileName="#form #n"
    importerDocDesc="#form #d"
    importerDocCategory="#form select[name='c']"
    importerDocVi="#form #vi"
    importerDocVp="#form select[name='vp']"
    importerDocSupplierName="#form select[name='an']"
    importerDocProductTextBox="#form div[class='w2ui-field-helper w2ui-list'] div[class='li-search']"
    importerDocProductList="#w2overlay-p_menu div[class='w2ui-menu '] div[class='menu-text']"
    importerProductCatNumber="#form #product-cat-num"
    importerProductName="#form #product-cat-name"

    importerDocSaveBtn="#form #docSaveForm"

    importerTableFirstRowSupplierName="table[class='uk-table docs'] tr:first-child td p[class='doc-col doc-facility']"

    clickOnImporterUpdateDoc()
    {
        cy.get(this.importerUpdateDocIcon).click().then(()=>{
            cy.get(this.importerUpdateDocModal).should('exist').and('be.visible')
            cy.get(this.importerUpdateDocModalHeader).should('have.text','Add/ Edit Record')
        })     
    }
    EnterNewImporterData(docImpl,updatedDocInput)
    {
        let doc_impl
        if(docImpl)
        {
            doc_impl = "div[class='doc-impl-main'] "
        }
        else
        {
            doc_impl=""
        }
        cy.get(doc_impl+this.importerFileType).select(updatedDocInput.Type,{force:true}).should('include.text',updatedDocInput.Type)
        cy.get(doc_impl+this.importerFileName).clear().type(updatedDocInput.Name)
        cy.wait(200)
        cy.get(doc_impl+this.importerDocDesc).clear().type(updatedDocInput.Desc)
        cy.get(doc_impl+this.importerDocCategory).select(updatedDocInput.Cat,{force:true})
        cy.wait(100)
        cy.get(doc_impl+this.importerDocVi).clear().type(updatedDocInput.Vi)
        cy.wait(200)
        cy.get(doc_impl+this.importerDocVp).select(updatedDocInput.Vp.docVpText).should('have.value',updatedDocInput.Vp.docVpValue)
        cy.wait(200)
        cy.get(doc_impl+this.importerDocSupplierName).select(updatedDocInput.SupplierName).then(()=>{
            cy.get(this.importerDocSupplierName+" option:selected").should('have.text',updatedDocInput.SupplierName)  
        })     
        cy.get(doc_impl+this.importerDocProductTextBox).click({force:true}).then(()=>{
            cy.get(this.importerDocProductList).contains(updatedDocInput.ProductCategory).click()
        })
        cy.get(doc_impl+this.importerProductCatNumber).clear().type(updatedDocInput.ProductCatNumber).should('have.value',updatedDocInput.ProductCatNumber)
        cy.get(doc_impl+this.importerProductName).clear().type(updatedDocInput.Product).should('have.value',updatedDocInput.Product)
    }
    clickOnImporterDocSaveBtn(docImpl)
    {
        let doc_impl
        if(docImpl)
        {
            doc_impl = "div[class='doc-impl-main'] "
        }
        else
        {
            doc_impl=""
        }
       cy.get(doc_impl+this.importerDocSaveBtn).click() 
    }
    validateImporterSupplierName(supplierName)
    {
        let supplierNameText = supplierName.split("-")
        cy.get(this.importerTableFirstRowSupplierName).should('include.text',supplierNameText[0].trim())
    }
}
export default importerUpdateDocument;
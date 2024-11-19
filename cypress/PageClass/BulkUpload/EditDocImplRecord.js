class EditDocImplRecord
{
docImplEditRecordPopUp = "div[class='doc-impl-main'] #docImplModal #form"
docImplEditRecordPopUpHeader="h2"

popUpModalOKBtn="#popUpModal div[class='uk-modal-dialog'] button"

docImplExpandedRecord="#grid_grid_records table tr[id$='expanded_row']"
docImplExpandedRecDetails="#details-data span"

docImplDocumentRecords="#grid_grid_records table tr"
docImplDocNameCol="td[col='2'] div"
docImplSupplierNameCol="td[col='3'] div"
docImplDocSavedStatusCol="td[col='5'] div"

verifyEditRecordPopUPIsOpened()
{
    cy.get(this.docImplEditRecordPopUp).should('be.visible')
    cy.get(this.docImplEditRecordPopUp+" "+this.docImplEditRecordPopUpHeader).should('have.text','Add/ Edit Record')

}
clickOnOkBtnAfterFileSave()
{
    cy.get(this.popUpModalOKBtn).click()
}
verifyDetailsOnExpandedRecord(upload_file_name, docInput) {
    cy.get(this.docImplExpandedRecord).find(this.docImplExpandedRecDetails).as('RecordDetails').contains(/^File Name$/).next().then(($file_name) => {
        expect($file_name.text().trim()).eq(upload_file_name)
    })
    cy.get('@RecordDetails').contains('Type').next().then(($file_type) => {
        expect($file_type.text().trim()).eq(docInput.Type)
    })
    cy.get('@RecordDetails').contains(/^Name$/).next().then(($file_name) => {
        expect($file_name.text().trim()).eq(docInput.Name)
    })
    cy.get('@RecordDetails').contains('Description').next().then(($file_desc) => {
        expect($file_desc.text().trim()).eq(docInput.Desc)
    })
    cy.get('@RecordDetails').contains('Supplier').next().then(($supplier_name) => {
        let supplierNameText = docInput.SupplierName.split("-")
        expect($supplier_name.text().trim()).eq(supplierNameText[0].trim())
    })
    cy.get('@RecordDetails').contains('Validity Interval').next().then(($validity_int) => {
        expect(parseInt($validity_int.text().trim())).to.eq(docInput.Vi)
    })
    cy.get('@RecordDetails').contains('Validity Period').next().then(($validity_int) => {
        expect($validity_int.text().trim()).to.eq(docInput.Vp.docVpValue)
    })
    cy.get('@RecordDetails').contains(/^FDA Product Category$/).next().then(($fda_prod_cat) => {
        expect($fda_prod_cat.text().trim()).to.contain(docInput.ProductCategory)
    })
    cy.get('@RecordDetails').contains(/^Product Category No.$/).next().then(($product_cat_no) => {
        expect($product_cat_no.text().trim()).to.eq(docInput.ProductCatNumber)
    })
    cy.get('@RecordDetails').contains(/^Product$/).next().then(($product) => {
        expect($product.text().trim()).to.eq(docInput.Product)
})

}
verifyDataOfFirstRecord(docInput) 
{
    cy.get(this.docImplDocumentRecords + "[index='0']").as('first_record').find(this.docImplDocNameCol).should('have.text', docInput.Name)
    let supplierNameText = docInput.SupplierName.split("-")
    cy.get('@first_record').find(this.docImplSupplierNameCol).should('have.text',supplierNameText[0].trim())
    cy.get('@first_record').find(this.docImplDocSavedStatusCol).should('have.text','Y')
}
}
export default EditDocImplRecord;
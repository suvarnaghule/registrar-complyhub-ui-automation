class ViewDeletedList
{
    multipleDocDelOption="a[class^='bulk-delete-document']"
    deleteDocumentPopUp="#deleteDocumentModal div[class='uk-modal-body']"
    deleteDocumentPopUpHeader="#deleteDocumentModal div[class='uk-modal-body'] h2"
    deleteDocumentPopUpBtns="button"

    deleteDocPopUpTableRows="#deleteDocumentModal table[class='uk-table docs'] tr[class='imp-doc-table']"   
    
    viewDelListOption="#viewDeletedList"
    deletedDocListPopUp="#deletedDocumentList"
    deletedListBlock="div[class='deleted-list-block']"
    deletedListBlockHeader="div[class='deleted-list-block'] h2"
    deletedListBlockTableRows="div[class='deleted-list-block'] table[class='uk-table docs'] tr[class='imp-doc-table']"
    singleDocArchieveBtn="div[class='doc-actions archiveRow']"
    closeDeletedDocListBtn="#deletedDocumentList button"

    myDocumentTableDocRows="table[class='uk-table docs'] tr[id^='parent']"
    docCheckbox="input[type='checkbox']"
    DocNameCol="p[class='doc-name']"
    DocTypeCol="p[class='doc-col doc-type']"
    DocCatCol="p[class='doc-col doc-category']"                                      //"td:nth-child(4) p"
    VendorIDCol="p[class='doc-col doc-vendor']"
    SupplierNameCol="p[class='doc-col doc-facility']"
    FdaProdCatCol="p[class='doc-col doc-product']"

    selectDocuments(count)
    {
        let j=1, k=1, l=1, m=1,n=1, p=1
        cy.get(this.myDocumentTableDocRows).then(($rows) => {
            for (let i = 0; i < count; i++) {
                cy.get($rows).eq(i).find(this.docCheckbox).click()
                cy.get($rows).eq(i).find(this.DocNameCol).invoke('text').then((doc_name_col) => {
                    cy.wrap(doc_name_col.trim()).as('docName' + j)
                    j++
                })
                cy.get($rows).eq(i).find(this.DocTypeCol).invoke('text').then((doc_type_col) => {
                    cy.wrap(doc_type_col.trim()).as('docType' + k)
                    k++
                })
                cy.get($rows).eq(i).find(this.DocCatCol).invoke('text').then((doc_cat_col) => {
                    cy.wrap(doc_cat_col.trim()).as('docCat' + l)
                    l++
                })
                cy.get($rows).eq(i).find(this.SupplierNameCol).invoke('text').then((supplier_name_col) => {
                    cy.wrap(supplier_name_col.trim()).as('docSupplier' + m)
                    m++
                })
                cy.get($rows).eq(i).find(this.FdaProdCatCol).invoke('text').then((fda_prod_cat_col) => {
                    cy.wrap(fda_prod_cat_col.trim()).as('fdaProdCat' + n)
                    n++
                })
                cy.get($rows).eq(i).find(this.VendorIDCol).invoke('text').then((vendor_id_col) => {
                    cy.wrap(vendor_id_col.trim()).as('vendorId' + p)
                    p++
                })         
            }
        })
    }
    clickOnViewDeletedList()
    {
        cy.get(this.viewDelListOption).click().then(()=>{
            cy.get(this.deletedDocListPopUp).should('exist').and('be.visible')
            cy.get(this.deletedListBlockHeader).should('have.text','Deleted Document List')
        })
    }
    clickOnDeleteMultipleDocOption()
    {
        cy.get(this.multipleDocDelOption).click().then(()=>{
            cy.get(this.deleteDocumentPopUp).should('exist').and('be.visible')
            cy.get(this.deleteDocumentPopUpHeader).should('have.text','Delete Document')
        })
    }
    verifySelectedDocOnDelDocPopUp()
    {
        let i=1,j=1,k=1,l=1,m=1,n=1
        cy.get(this.deleteDocPopUpTableRows).each(($row) => {
            cy.wrap($row).within(() => {
                cy.get(this.DocNameCol).then(($doc_name) => {
                    cy.get('@docName' + i).then((selected_doc_name) => {
                        expect($doc_name.text().trim()).eq(selected_doc_name)
                        i++
                    })
                })
                cy.get(this.DocTypeCol).then(($doc_type) => {
                    cy.get('@docType' + j).then((selected_doc_type) => {
                        expect($doc_type.text().trim()).eq(selected_doc_type)
                        j++
                    })
                })
                cy.get(this.DocCatCol).then(($doc_cat) => {
                    cy.get('@docCat' + k).then((selected_doc_cat) => {
                        expect($doc_cat.text().trim()).eq(selected_doc_cat)
                        k++
                    })
                })
                cy.get(this.SupplierNameCol).then(($supplier_name) => {
                    cy.get('@docSupplier' + l).then((selected_doc_supplier) => {
                        expect($supplier_name.text().trim()).eq(selected_doc_supplier)
                        l++
                    })
                })
                cy.get(this.FdaProdCatCol).then(($fda_prod_cat) => {
                    cy.get('@fdaProdCat' + m).then((selected_fda_prod_cat) => {
                        expect($fda_prod_cat.text().trim()).eq(selected_fda_prod_cat)
                        m++
                    })
                })
                cy.get(this.VendorIDCol).then(($vendor_id) => {
                    cy.get('@vendorId' + n).then((selected_vendor_id) => {
                        expect($vendor_id.text().trim()).eq(selected_vendor_id)
                        n++
                    })
                })
            })
        })
    }
    selectFirstDocOnDeletedList()
    {
        cy.get(this.deletedListBlockTableRows).first().as('firstRow').find(this.docCheckbox).then((first_row_checkbox)=>{
            cy.get(first_row_checkbox).click().should('be.checked') 
            cy.get('@firstRow').then((first_row)=>{
                cy.get(first_row).find(this.DocNameCol).invoke('text').then((doc_name)=>{
                    cy.wrap(doc_name.trim()).as('docNameOnDeletedList')
                })
                cy.get(first_row).find(this.DocTypeCol).invoke('text').then((doc_type)=>{
                    cy.wrap(doc_type.trim()).as('docTypeOnDeletedList')
                })
                cy.get(first_row).find(this.DocCatCol).invoke('text').then((doc_cat)=>{
                    cy.wrap(doc_cat.trim()).as('docCatOnDeletedList')
                })
                cy.get(first_row).find(this.SupplierNameCol).invoke('text').then((supplier_name)=>{
                    cy.wrap(supplier_name.trim()).as('supplierNameOnDeletedList')
                })
                cy.get(first_row).find(this.VendorIDCol).invoke('text').then((vendor_id)=>{
                    cy.wrap(vendor_id.trim()).as('vendorIdOnDeletedList')
                })
                cy.get(first_row).find(this.FdaProdCatCol).invoke('text').then((fda_prod_cat)=>{
                    cy.wrap(fda_prod_cat.trim()).as('fdaProductCatOnDeletedList')
                })
            })
        })
    }
    clickOnSingleDocArchieveBtn()
    {
        cy.get(this.deletedListBlockTableRows).first().find(this.singleDocArchieveBtn).then((single_doc_archieve_btn)=>{
            cy.get(single_doc_archieve_btn).click()    
        })
    }
    closeDeletedDocumentList()
    {
        cy.get(this.closeDeletedDocListBtn).click().then(()=>{
            cy.get(this.deletedDocListPopUp).should('not.be.visible')   
        })
    }
    clickOnOKBtnOnDelDocPopUp()
    {
        cy.get(this.deleteDocumentPopUp).find(this.deleteDocumentPopUpBtns).contains('Ok').click()
    }
}
export default ViewDeletedList;
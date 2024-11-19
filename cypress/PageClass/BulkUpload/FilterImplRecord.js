class filterImplRecord
{
    filterDocImplIcon = "div[class='w2ui-search-drop w2ui-action']"
    searchFilter ="div[class*=' w2ui-grid-search-advanced filter']"

    filterLabels="div[class*=' w2ui-grid-search-advanced filter'] td[class='caption']"
    filterDD="select[class='w2ui-input']"

    filterDocNameSearchBox="input[name]"
    btnsOnFilterSearch="td[class='actions'] button"

    docImplDocumentRecords="#grid_grid_records table tr[index]"
    docImplDocNameCol="td[col='2'] div"

    clickOnFilterIcon()
    {
        cy.get(this.filterDocImplIcon).click().then(()=>{
            cy.get(this.searchFilter).should('be.visible')
        })
    }
    selectIsOrContainsOption(optionValue)
    {
        cy.get(this.filterLabels).contains('Document Name').parent().as('docNameFilterSearchEle')
        cy.get('@docNameFilterSearchEle').find(this.filterDD).select(optionValue)
    }
    enterDocNameInFilterSearchBox(filterDocName)
    {
        cy.get('@docNameFilterSearchEle').find(this.filterDocNameSearchBox).type(filterDocName)
    }
    clickOnSearchBtnOnFilter()
    {
        cy.get(this.btnsOnFilterSearch).contains('Search').click().then(()=>{
            cy.get(this.searchFilter).should('not.exist')  
        })
    }
    verifyFilterSearchResult(filterDDValue,filterDocName)
    {
        if (filterDDValue == "contains") {
            cy.get(this.docImplDocumentRecords).each(($row) => {
                cy.wrap($row).find(this.docImplDocNameCol).invoke('text').then((doc_name) => {
                    expect(doc_name.trim().toLowerCase()).to.include(filterDocName.toLowerCase())
                })
            })
        }        
    }
    resetFilterSearch()
    {
        cy.get(this.btnsOnFilterSearch).contains('Reset').click()
    }
}
export default filterImplRecord;
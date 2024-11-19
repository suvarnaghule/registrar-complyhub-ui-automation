class deleteImplRecord
{
    docImplExpandBtnRecords="#grid_grid_frecords table tr"
    checkbox = "input[type='checkbox']"
    multipleDeleteIcon="#tb_grid_toolbar_item_w2ui-delete"
    deleteConfirmationPopUp="div[class='w2ui-message']"
    delConfirmationPopUpText="div[class='w2ui-message'] div[class$='w2ui-msg-text']"

    btnsOnDelConfirmationPopUp="div[class='w2ui-message-buttons'] button"

    selectRecords(count)
    {
        let i;
        for(i=0;i<count;i++)
        {
            cy.get(this.docImplExpandBtnRecords+ "[index="+i+"]").find(this.checkbox).check({force :true})
        }       
    }
    clickOnMultipleDeleteOption(count)
    {
        cy.get(this.multipleDeleteIcon).click().then(()=>{
        cy.get(this.deleteConfirmationPopUp).should('be.visible') 
        cy.get(this.delConfirmationPopUpText).should('contain.text','Are you sure you want to delete '+count+' records?')
        })
        cy.get(this.btnsOnDelConfirmationPopUp).contains('Delete').click()
    }

}
export default deleteImplRecord;
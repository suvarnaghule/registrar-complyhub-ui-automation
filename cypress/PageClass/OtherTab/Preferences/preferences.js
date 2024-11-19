class preferences
{

    addEmailbtn="div[class='preferences-container'] button[class$='pref-add']"
    newEmailForm="#newEmailForm"
    additionalEmailTextBox="input[name='preferenceEmail']"

    delEmailIcon="a[class='pref-del-link']"
    updateNotificationIcon="a[class='pref-edit-link']"

    delEmailPopUp="#deleteEmailPreferenceModal div[class='list-container']"
    delEmailPopUpHeader="#deleteEmailPreferenceModal div[class='list-container'] h3"
    emailOnDelConfirmationPopUp="#deleteEmailPreferenceModal div[class='list-container'] p > span"
    delBtnOnDelEmailConfirmationPopUP="#deleteEmail"

    emailFreqOptionRadioBtn="input[type='radio']"
    
    emailListName="#emailList span[class='pref-email']"

    notificationTypeLabel="div[class$='pref-label'] p"
    notif_add_update_button="div[class='edit-actions'] button"

    clickOnAddEmailButton()
    {
        cy.get(this.addEmailbtn).click().wait(200).then(()=>{
            cy.get(this.newEmailForm).should('be.visible')
        })
    }
    enterAdditionalEmail(email)
    {
       cy.get(this.additionalEmailTextBox).type(email).should('have.value',email)
    }

    enterData(ele,updatedData,opr)
    {
        if(opr == 'Add Email')
        {
            ele = "div[class='pref-section-edit new']"
            
        }           
        cy.get(ele).find(this.notificationTypeLabel).as('notifiTypeLabels')
        cy.get(ele).find(this.notif_add_update_button).as('addUpdateButton')
        cy.get('@notifiTypeLabels').then((labels)=>{
            cy.get(labels).contains('Monthly Report').parent().next().then((pref_option_ele) => {
                cy.get(pref_option_ele).find(this.emailFreqOptionRadioBtn).check(updatedData.MonthlyReport)
            })
            cy.get(labels).contains('RegiScore').parent().next().then((pref_option_ele) => {
                cy.get(pref_option_ele).find(this.emailFreqOptionRadioBtn).check(updatedData.RegiScore)
            })
            cy.get(labels).contains('Audits').parent().next().then((pref_option_ele) => {
                cy.get(pref_option_ele).find(this.emailFreqOptionRadioBtn).check(updatedData.Audits)
            })
            cy.get(labels).contains('Compliance').parent().next().then((pref_option_ele) => {
                cy.get(pref_option_ele).find(this.emailFreqOptionRadioBtn).check(updatedData.Compliance)
            })
            cy.get(labels).contains('Supplier Profile').parent().next().then((pref_option_ele) => {
                cy.get(pref_option_ele).find(this.emailFreqOptionRadioBtn).check(updatedData.SupplierProfile)
            })
            cy.get(labels).contains('New Shipments').parent().next().then((pref_option_ele) => {
                cy.get(pref_option_ele).find(this.emailFreqOptionRadioBtn).check(updatedData.NewShipments)
            })
            cy.get(labels).contains('Documents').parent().next().then((pref_option_ele) => {
                cy.get(pref_option_ele).find(this.emailFreqOptionRadioBtn).check(updatedData.Documents)
            })  
        })
       cy.get('@addUpdateButton').click()
    }
    verifyEmailIsAdded(email)
    {
        cy.get(this.emailListName).should('contain.text',email)    
    }
    deleteEmail(ele,email)
    {
        cy.get(ele).find(this.delEmailIcon).click().then(() => {
            cy.get(this.delEmailPopUp).should('be.visible')
            cy.get(this.delEmailPopUpHeader).should('contain.text', 'Delete Email')
            cy.get(this.emailOnDelConfirmationPopUp).should('have.text', email)
            cy.get(this.delBtnOnDelEmailConfirmationPopUP).click()
        })
    }
    searchEmailInList(email)
    {
        let flag = false
        cy.get(this.emailListName).each(($list) => {
            cy.then(() => {
                if (flag)
                    return;
                if ($list.text() == email) {
                    cy.get($list.parent().next()).then((ele_searched) => {
                        cy.wrap(ele_searched).as('searchedEmailElement')
                        flag = true                     
                    })
                }
            })
        })
    }
    clickOnUpdateNotificationSetting(email_ele)
    {
        cy.get(email_ele).find(this.updateNotificationIcon).click().wait(500).then(() => {
            cy.get(email_ele).parent().siblings().then((notifi_edit_section_ele)=>{
                cy.log(notifi_edit_section_ele)
                cy.get(notifi_edit_section_ele).as('NotiEditSectionEle').should('be.visible')
            })
        })                       
    }
    verifyEmailIsDeleted(email)
    {
        cy.get(this.emailListName).should('not.contain.text',email)   
    }
}
export default preferences;
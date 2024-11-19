import other from "../../../PageClass/OtherTab/History/history";
import preferences from "../../../PageClass/OtherTab/Preferences/preferences";

describe('Validate Preferences Tab', {
    viewportWidth: 1280,
    viewportHeight: 800
},() => {
    let inputData
    beforeEach(() => {
        cy.fixture('./OtherTab/Preferences/preferences').then((data) => {
            inputData = data
            cy.loginMyFDA(data.UserName, data.UserPassword)            
        })
    });

    it('Other Tab -> Preferences -> Add email', () => {     
        cy.visit('/')
        const otherTabObj = new other()
        const prefObj = new preferences()  
        otherTabObj.selectSubTabFromOtherTab("Preferences")
        prefObj.clickOnAddEmailButton()
        prefObj.enterAdditionalEmail(inputData.email)
        prefObj.enterData('',inputData.emailFreqData,'Add Email')
        prefObj.verifyEmailIsAdded(inputData.email)
        
    })
    it('Other Tab -> Preferences -> Edit email notification settings', () => {     
        cy.visit('/')
        const otherTabObj = new other()
        const prefObj = new preferences()  
        otherTabObj.selectSubTabFromOtherTab("Preferences")
        prefObj.searchEmailInList(inputData.email)
        cy.get('@searchedEmailElement').then((ele)=>{
            prefObj.clickOnUpdateNotificationSetting(ele)
            cy.fixture('./OtherTab/Preferences/updatePreferences').then((updated_data)=>{
                cy.get('@NotiEditSectionEle').then((ele)=>{
                    prefObj.enterData(ele,updated_data.updateEmailFreqData)
                })             
            })          
        })       
    })

    it('Other Tab -> Preferences -> Delete email', () => {     
        cy.visit('/')
        const otherTabObj = new other()
        const prefObj = new preferences()  
        otherTabObj.selectSubTabFromOtherTab("Preferences")
        prefObj.searchEmailInList(inputData.email)
        cy.get('@searchedEmailElement').then((ele)=>{
            prefObj.deleteEmail(ele,inputData.email)  
            prefObj.verifyEmailIsDeleted(inputData.email) 
        })       
    })
})    
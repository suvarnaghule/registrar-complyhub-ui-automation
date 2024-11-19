
class UpdateDocument
{
    facility360TableDocUpdate="table[class='uk-table docs'] td div[class='doc-actions'] > i[class='fas fa-edit doc-update']"
    facility360TableDocAddFile="table[class='uk-table docs'] td div[class='doc-actions'] > i[class='fas fa-file-upload doc-add-send-request']"
    facility360UpdateDocModal="#updateExpDocModal div[class='modal-content']"
    facility360UpdateDocNextBtn="button[class='bright-blue-button doc-save-button']"
    facility360updateDocNextBtnHeader="li[class='uk-step uk-active'] div[class='uk-wizard-title']"
    facility360UpdateDocForm="form[id='updateExpDocForm'] "
    
    facility360DocType="select[name='docType']"
    facility360DocProduct="select[name='docProducts']"
    facility360DocName="input[name='docName']"                   
    facility360DocDesc="textarea[class ='input-field doc-desc']"         
    facility360DocCat="select[name='docCat']"                                             
    facility360DocVi="input[name='docInterval']"                    
    facility360DocVp="select[name='docPeriod']"                   
    facility360DocNextBtn=".doc-save-button"
    facility360DocVf="input[name='docVaildFrom']"        
    facility360DocVt="input[name='docValidTo']"          
    facility360DocAddComments="textarea[name='docNotes']"    

    clickOnUpdateDoc()
    {
        cy.get(this.facility360TableDocUpdate).click().then(()=>{
            cy.get(this.facility360UpdateDocModal).should('exist').and('be.visible')
        })     
    }
    clickOnAddFile()
    {
        cy.get(this.facility360TableDocAddFile).click().then(()=>{
            cy.get(this.facility360UpdateDocModal).should('exist').and('be.visible')
            cy.get(this.facility360updateDocNextBtnHeader).invoke('text').should('eq','Add File')
            
        })     
    }
    clickonNextBtn()
    {
        cy.get(this.facility360UpdateDocNextBtn).click().then(()=>{
            cy.get(this.facility360updateDocNextBtnHeader).invoke('text').should('eq','Add File')
        })
    }
    EnterUpdatedData(updatedDocInput)
    { 
        cy.get(this.facility360UpdateDocForm+this.facility360DocType).select(updatedDocInput.Type,{force:true}).should('include.text',updatedDocInput.Type)
        cy.get(this.facility360DocName).clear().type(updatedDocInput.Name)
        cy.wait(200)
        cy.get(this.facility360DocDesc).clear().type(updatedDocInput.Desc)
        cy.get(this.facility360DocCat).select(updatedDocInput.Cat,{force:true})
        cy.wait(100)
        let facility360DocProducts="input[value='"+updatedDocInput.Products+"']"
        cy.get(facility360DocProducts).click({force:true})
        cy.get(this.facility360DocVi).clear().type(updatedDocInput.Vi)
        cy.wait(200)
        cy.get(this.facility360DocVp).select(updatedDocInput.Vp.docVpText).should('have.value',updatedDocInput.Vp.docVpValue)
        cy.get(this.facility360DocNextBtn).click()
        cy.get(this.facility360DocAddComments).type(updatedDocInput.Comments)  
    }

}
export default UpdateDocument;
import taskTab from "../../PageClass/Task/taskTab";
import importerMyDocuments from "../../PageClass/ImporterDocuments/MyDocuments/importerMyDocuments";

describe('Validate Task Tab', {
  viewportWidth: 1280,
  viewportHeight: 800
}, () => {
  let taskData
  beforeEach(() => {
      cy.fixture('./Task/taskTab').then((data) => {
          taskData = data
          cy.loginMyFDA(data.UserName, data.UserPassword)
      })
  });
  it('Task Tab -> Respond to a Task', () => {
    cy.visit('/')
    const taskObj = new taskTab()
    taskObj.clickOnTaskTabIcon()
    taskObj.getNoofTaskResultCount()
    /*cy.fixture('./Task/taskTab').then((data1) => {
    taskObj.validateTaskDetails(data1.reqDocCount,data1.multipleDocReqName)  
    })*/
    cy.get('@TaskCount').then((NoOfTask) => {
      taskObj.clickOnRespondBtnToRespondDocReq()
      taskObj.validateRequestTaskDetails(taskData.reqDocName,taskData.reDocSuplierName,taskData.reqDocEmailAddr)
      cy.wait(8000)
      taskObj.getNoofTaskResultCount()
      cy.get('@TaskCount').then((updatedCount) => {
          expect(parseInt(updatedCount.trim())).eq(NoOfTask - 1)
      })
    })  
  }) 
  it.only('Task Tab -> Decline a Task', () => {
    cy.visit('/')
    const taskObj = new taskTab()
    const myDocObj = new importerMyDocuments()
    taskObj.clickOnTaskTabIcon()
    taskObj.getNoofTaskResultCount()
    /*cy.fixture('./Task/taskTab').then((data1) => {
    taskObj.validateTaskDetails(data1.reqDocCount,data1.multipleDocReqName)  
    })*/
    cy.get('@TaskCount').then((NoOfTask) => {
      taskObj.clickOnDeclineReqBtn()
      cy.wait(4000)
      taskObj.getNoofTaskResultCount()
      cy.get('@TaskCount').then((updatedCount) => {
          expect(parseInt(updatedCount.trim())).eq(NoOfTask - 1)
      })
    }) 
   // myDocObj.searchDocByName()
    
  })  
})


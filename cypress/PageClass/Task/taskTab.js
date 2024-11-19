class taskTab
{
    taskTabIcon="div[class='uk-navbar-right'] a[href='/task']"
    myTaskTableRows="div[class='todo-results'] table[class='uk-table todos'] tr"
    myTaskTabTaskColumn = "td:nth-child(4) p a"
    myTaskTabStatusColumn="td:nth-child(6) p a"
    myTaskTabSupplierColumn="td p[class='todo-col facility'] a"
    myTaskRespondButton="div[class='todo-results'] table[class='uk-table todos'] tr:first-child td div[class='todo-actions'] span[class='todo-reply']"
    myTaskDeclineRequestBtn="div[class='todo-results'] table[class='uk-table todos'] tr:first-child td div[class='todo-actions'] span[class='todo-decline']"
    
    requestTaskDetailPopUp="div[class='request task-details']"
    taskDetailSubject="div[class='request task-details'] div[class^='subject']"
    taskDetailEmailTo="div[class='request task-details'] div[class='to'] span[class='email']"
    taskDetailBody="div[class='request task-details'] div[class='body']"
    taskDetailButtons="div[class$='doc-resp-buttons'] button"
    
    docResponseComments="textarea[name='responseComments']"
    declineReqReasonText="p input[type='text']"
    declineReqOkBtn="button[class$='ok']"
    NoOfTasksResultCount="div[class='results-count']"

    clickOnTaskTabIcon()
    {
        cy.get(this.taskTabIcon).click().then(()=>{
            cy.url().should('contain','/task') 
        })    
    }
    clickOnRespondBtnToRespondDocReq()
    {
        cy.get(this.myTaskRespondButton).click().then(()=>{
            cy.get(this.requestTaskDetailPopUp).should('be.visible')         
        })
    }
    validateRequestTaskDetails(docName,supplierName,emailAddr)
    {
        cy.get(this.taskDetailSubject).should('contain', docName)
        cy.get(this.taskDetailEmailTo).should('contain', emailAddr)
        cy.get(this.taskDetailBody).invoke('text').then(($bodyText)=>{
           expect($bodyText.trim()).to.contain(docName)
           expect($bodyText.trim()).to.contain(supplierName)
        })
        cy.get(this.taskDetailButtons).contains('Next').click()
        cy.get(this.docResponseComments).type('Doc response is sent through automation')
        cy.get(this.taskDetailButtons).contains('Submit').click()
    }
    clickOnDeclineReqBtn()
    {
        cy.get(this.myTaskDeclineRequestBtn).click()
        cy.get(this.declineReqReasonText).type('Testing decline request')                        
        cy.get(this.declineReqOkBtn).click().then(() => {
            cy.wait(4000)
        })
    }
    getNoofTaskResultCount()
    {
        cy.get(this.NoOfTasksResultCount).invoke('text').then(($resultCountText)=>{
            let count = $resultCountText.split("of")
            cy.log(count[1])
            cy.wrap(count[1]).as('TaskCount')
        })
    }
    validateTaskDetails(reqDocCount,docName,supplierName)
    {       
       if(reqDocCount == 1)                           
        {
         cy.get(this.myTaskTableRows+":first-child"+" "+this.myTaskTabTaskColumn).should('include.text',docName)
         cy.get(this.myTaskTableRows+":first-child"+" "+this.myTaskTabStatusColumn).should('have.text','Requested')   // assumed user is already logged in 
         let supplierNameText = supplierName.split("-")
         cy.get(this.myTaskTableRows+":first-child"+" "+this.myTaskTabSupplierColumn).should('have.text',supplierNameText[0].trim())
        }       
    }
    validateMultipleTaskDetails(docIndex,DocType,supplier)
    {   
            taskColumn = cy.get(this.myTaskTableRows+":nth-child("+docIndex.z+")"+" "+this.myTaskTabTaskColumn)
            supplierColumn = cy.get(this.myTaskTableRows+":nth-child("+docIndex.z+")"+" "+this.myTaskTabSupplierColumn)
            statusColumn = cy.get(this.myTaskTableRows+":nth-child("+docIndex.z+")"+" "+this.myTaskTabStatusColumn)
            cy.get(taskColumn).then(($doc_name)=>{         
                    expect($doc_name.trim()).to.contain(DocType)                   
            })
            cy.get(supplierColumn).then(($supplier_name)=>{           
                    expect($supplier_name.trim()).to.eq(supplier)                        
            })
            cy.get(statusColumn).should('have.text','Requested')
            docIndex.z=docIndex.z+2     
    }
}
export default taskTab;
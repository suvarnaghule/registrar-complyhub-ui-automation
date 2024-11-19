class Notification
{
    notificationTab="div[class='uk-navbar-right'] a[href='/notifications']"
    notificationTabHeader="div[class^='notifications-main'] h2"
    notificationTypeDD="select[name='notification-type']"
    notificationStatusDD="select[name='notification-status']"
    notificationSubjectDD="select[name='notification-subject']"

    notificationRows="div[class='notifications-container'] div[class^='notification-container']"
    notificationContainer="div[class='notifications-container']"
    notificationType="div[class='type-cat'] p[class='cat-desc new-view']"
    notificationTypeCatInfo="div[class='type-cat'] p[class='cat-info']"
    notificationSubject="div[class='name-col'] p a"

    notificationDeleteBtn="div[class='action-col'] a[class='delete-notification']"
    notificationMarkReadBtn="div[class='action-col'] a[class='read-notification']"
    notificationResultCount="div[class='results-count']"

    importerDocumentTab="#repo"
    importerMyDocumentsTab="div[class='documents-tab'] li[class^='documentsTab']"
    importerMyDocTabSearch="input[name='docSearch']"
    taskTabSearch="input[name='todoSearch']"

    importerTableMyDoc="div[class='doc-results']"
    monitorSupplierTab="#facilities"
    facility360Tab="#facility360"
    facility360FDAComplData="li[class^='tab compliance']"
    monitorSupplierSearchBox="input[name='compName']"

    clickOnNotificationTab()
    {
        cy.get(this.notificationTab).click().then(()=>{
            cy.url().should('contain','/notifications') 
            cy.get(this.notificationTabHeader).should('contain.text','Notification Alerts')

        })
    }
    applyNotificationFilter(notification, notificationValue,NotiStatus)
    {
        let notificationDD
        if(notification == "NotificationType")
        notificationDD = this.notificationTypeDD 
        else
        {
                if(notification == "NotificationSubject")
                notificationDD = this.notificationSubjectDD
                
        } 
        if( notification == "NotificationType" || notification == "NotificationSubject") 
        {        
            cy.get(notificationDD)
            .find('option')                                                         // code to select single value if select contains duplicate values  
            .then(($option) => {
                    const index = Cypress._.findIndex(
                        $option, 
                        ($el) => $el.getAttribute('value') === notificationValue,
                    )
                    expect(index).to.be.greaterThan(-1)
                    cy.get(notificationDD).select(index)
                })    
            cy.get(notificationDD +" option:selected").invoke('text').should('eq',notificationValue)  
            cy.wait(2000) 
        }   
        cy.get(this.notificationStatusDD).select(NotiStatus).should('have.value', NotiStatus)
        cy.wait(2000) 
    }
    verifyNotificationFilter(NotiType,NotiTypeValue)
    {
        let notification
        if(NotiType == "NotificationType")
        notification = this.notificationType
        else
        {
            if(NotiType == "NotificationSubject")
            notification =this.notificationSubject
        }
        cy.get(this.notificationRows).then(($rows)=>{
            cy.wrap($rows).each(($ele,index,$list)=>{
                cy.get($ele).find(notification).then(($notif_value)=>{
                    expect($notif_value.text().trim()).eq(NotiTypeValue)
                })              
                })
            })      
    }
    clickOnSubject() 
    {
        let not_type_val,search_name,not_type_cat_status
        cy.get(this.notificationRows).eq(0).then(($first_noti_container)=>{
            cy.get($first_noti_container).find(this.notificationType).then(($not_type_value)=>{
                not_type_val=  $not_type_value.text().trim()
                cy.get($first_noti_container).find(this.notificationTypeCatInfo).then(($not_type_cat_info)=>{
                    not_type_cat_status = $not_type_cat_info.text().trim()
                })
                cy.get(this.notificationRows+":first-child"+" "+this.notificationSubject).as('subject').invoke('attr','href').then(($href)=>{
                    cy.log($href)
                    search_name=$href.split("?")
                    cy.get('@subject').click().then(()=>{
                        cy.url().should('contain',$href)
                    })                
                    cy.wrap(not_type_val).as('notificationTypeValue')
                    cy.wrap(not_type_cat_status).as('notiTypeCatInfo')
                    cy.wrap(search_name).as('searchName')
                })                
            })
        })         
    }
    validateScreen(not_type_val,not_type_cat_status,search_name,supplier_text)
    {
        let doc_status_flag = false
        let tab_name,sub_tab_name,search_text_box

        if(not_type_val == "Documents" && (not_type_cat_status == 'submitted' || not_type_cat_status == 'expired' || not_type_cat_status == 'expiring' || not_type_cat_status == 'declined' || not_type_cat_status == 'replied'))
        {  
            tab_name =  this.importerDocumentTab              
            cy.get(this.importerMyDocumentsTab).invoke('attr','class').should('contain','uk-active')
            cy.get(this.importerMyDocumentsTab).invoke('attr','aria-expanded').should('eq','true') 
            cy.get(this. importerMyDocTabSearch ).should('have.value',search_name[1])  
            doc_status_flag = true               
        }
        else
        {
            if(not_type_val == "Documents" && not_type_cat_status == 'requested')
            {
                cy.get(this.taskTabSearch).should('have.value',search_name[1]) 
            }
            else
            {
                if(not_type_val=='New Supplier'||not_type_val=='FDA Registration'||not_type_val=='Audits'||not_type_val=='RegiScore'||not_type_val=='DUNS'||not_type_val=='Supplier Status')
                {
                    tab_name = this.monitorSupplierTab   
                    cy.get(this.monitorSupplierSearchBox ).should('have.value',supplier_text)
                }
                else
                {
                    if(not_type_val == 'New Shipments')
                    {
                        tab_name = this.facility360Tab
                        cy.get(this.facility360FDAComplData).invoke('attr','class').should('contain','uk-active')
                    }
                }
            }
        }
        cy.get(tab_name).invoke('attr','class').should('contain','uk-active')
        cy.wrap(doc_status_flag).as('docStatusFlag')
    }
    deleteFirstNotification()
    {
        cy.get(this.notificationRows).eq(0).then(($first_noti_container)=>{
            cy.get($first_noti_container).find(this.notificationDeleteBtn).click()
            cy.wait(2000)
            cy.get($first_noti_container).should('not.exist')
        })     
    }
    markFirstNotificationAsRead()
    {
        cy.get(this.notificationRows).eq(0).then(($first_noti_container)=>{
            cy.get($first_noti_container).find(this.notificationMarkReadBtn).click()
            cy.wait(2000)
            cy.get($first_noti_container).should('not.exist')
        })     
    }
    getNotificationCount()
    {
       
       // let count_flag =false
        cy.get(this.notificationResultCount).invoke('text').then(($resultCountText)=>{
            let count = $resultCountText.split("of")
            cy.log(count[1])
           // count_flag = true   
            cy.wrap(count[1]).as('docCount')
                            
        })
        /*cy.get(this.notificationContainer).children().first().invoke('text').then(($text)=>{
            if($text.includes("No notifications found"))
            {
             cy.log("No notifications found")
            }
            else
            {
                cy.get(this.notificationResultCount).invoke('text').then(($resultCountText)=>{
                    let count = $resultCountText.split("of")
                    cy.log(count[1])
                    count_flag = true   
                    cy.wrap(count[1]).as('docCount')
                                    
                })
            }           
            cy.wrap(count_flag).as('countFlag')           
        }) */          
    }
}
export default Notification;
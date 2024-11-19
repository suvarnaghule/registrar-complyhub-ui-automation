import Notification from "../../PageClass/Notifications/notification";
import importerMyDocuments from "../../PageClass/ImporterDocuments/MyDocuments/importerMyDocuments";
import pagination from "../../PageClass/ImporterDocuments/SmartDMS/pagination";
import { initial } from "lodash";

describe('Test Notifications Tab',()=>{
    let docData
    beforeEach(()=>{           
        cy.fixture('./Notifications/Notification').then((data)=>{
        docData = data 
        cy.loginMyFDA(data.UserName,data.UserPassword) 
        cy.visit('/notifications')                            
        })         
    });
    it('Notification Tab -> Notification Type Filter ',()=>{    
        const notificationObj = new Notification()    
        notificationObj.applyNotificationFilter("NotificationType",docData.NotificationTypeValue,docData.NotificationStatusValue)                         // to be updated
        notificationObj.verifyNotificationFilter("NotificationType",docData.NotificationTypeValue)      
    }) 
    it('Notification Tab -> Notification Subject Filter ', () => {     
        const notificationObj = new Notification()
        const myDocObj = new importerMyDocuments()      
        notificationObj.applyNotificationFilter("NotificationSubject", docData.NotificationSubjectValue,docData.NotificationStatusValue)
        notificationObj.verifyNotificationFilter("NotificationSubject", docData.NotificationSubjectValue)
        notificationObj.clickOnSubject()
        cy.get('@notificationTypeValue').then((notiTypeVal) => {
            cy.get('@notiTypeCatInfo').then((notiTypeCatStatus)=>{
                cy.get('@searchName').then((searchTxt)=>{
                    notificationObj.validateScreen(notiTypeVal,notiTypeCatStatus,searchTxt,docData.NotificationSubjectValue)
                    cy.get('@docStatusFlag').then((status_flag)=>{
                        if (status_flag == true) {
                            myDocObj.getMyDocTableCount()
                            cy.get('@docPresentFlag').then((flag) => {
                                if (flag == true) {
                                    myDocObj.validateSupplierName(docData.NotificationSubjectValue)                       
                                }
                            })
                        }
                    })
                })
            })         
        })
    })
    it('Notification Tab -> Delete First Notification  ', () => {
        let updated_noti_count,original_notifi_count
        const notificationObj = new Notification()
        notificationObj.getNotificationCount()
        cy.get('@docCount').then(($noti_count) => {
            original_notifi_count = $noti_count.replaceAll(",", "")
            cy.log('Initial Notification Count : ' + $noti_count)
            notificationObj.deleteFirstNotification()
            cy.wait(2000)
            notificationObj.getNotificationCount()
            cy.get('@docCount').then(($new_noti_count) => {
                updated_noti_count = $new_noti_count.replaceAll(",", "")
                cy.log('Updated Notification Count : ' + updated_noti_count)
                expect(parseInt(updated_noti_count)).eq(parseInt(original_notifi_count) - 1)
            })
        })
    })
    it('Notification Tab -> Mark Notification as Read', () => {
        let original_notifi_count, original_read_notifi_count, updated_new_noti_count, updated_read_noti_count
        const notificationObj = new Notification()
        cy.fixture('./Notifications/MarkNotifiRead').then((data) => {
            notificationObj.getNotificationCount()
            cy.get('@docCount').then((noti_count) => {
                original_notifi_count = noti_count.replaceAll(",", "")
                cy.log('Initial Notification Count : ' + original_notifi_count)
                notificationObj.applyNotificationFilter("NotificationStatus", data.NotificationSubjectValue, data.NotificationStatusValue)
                cy.wait(2000)
                notificationObj.getNotificationCount()
                cy.get('@docCount').then((read_noti_count) => {
                    original_read_notifi_count = read_noti_count.replaceAll(",", "")
                    cy.log('Read Notification Count : ' + original_read_notifi_count)
                    cy.wait(2000)
                    notificationObj.applyNotificationFilter("NotificationStatus", data.NotificationSubjectValue, 'New')
                    notificationObj.markFirstNotificationAsRead()
                    cy.wait(2000)
                    notificationObj.getNotificationCount()
                    cy.get('@docCount').then((new_noti_count) => {
                        updated_new_noti_count = new_noti_count.trim().replaceAll(",", "")
                        expect(updated_new_noti_count).eq((original_notifi_count - 1).toString())
                    })
                    cy.wait(2000)
                    notificationObj.applyNotificationFilter("NotificationStatus", data.NotificationSubjectValue, data.NotificationStatusValue)
                    cy.wait(2000)
                    notificationObj.getNotificationCount()
                    cy.get('@docCount').then((new_read_noti_count) => {
                        updated_read_noti_count = new_read_noti_count.trim().replaceAll(",", "")
                        expect(parseInt(updated_read_noti_count)).eq(parseInt(original_read_notifi_count) + 1)
                    })
                })
            })
        })
    })
})  

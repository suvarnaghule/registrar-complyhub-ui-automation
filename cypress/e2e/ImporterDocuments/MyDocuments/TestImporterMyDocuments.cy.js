import importerMyDocuments from "../../../PageClass/ImporterDocuments/MyDocuments/importerMyDocuments";
import NewDocument from "../../../PageClass/Facility360/Documents/MyDocuments/Facility360AddNewDocument";
import importerUpdateDocument from "../../../PageClass/ImporterDocuments/MyDocuments/importerUpdateDocument";
import importerSendRequest from "../../../PageClass/ImporterDocuments/MyDocuments/importerSendRequest";
import ShareDoc from "../../../PageClass/Facility360/Documents/MyDocuments/Facility360ShareDocument";
import filterDoc from "../../../PageClass/Facility360/Documents/MyDocuments/Facility360ApplyFilter";
import importerApplyFilter from "../../../PageClass/ImporterDocuments/MyDocuments/importerApplyFilter";
import ViewDeletedList from "../../../PageClass/ImporterDocuments/MyDocuments/importerViewDeletedList";
import taskTab from "../../../PageClass/Task/taskTab";

describe('Validate Importer My Documents Tab',{
    viewportWidth: 1280,
    viewportHeight: 800
},()=>{
    let docData
    beforeEach(()=>{           
        cy.fixture('./ImporterDocuments/MyDocuments/importerDocuments').then((data)=>{
        docData = data 
        cy.loginMyFDA(Cypress.env("UserName"),Cypress.env("UserPassword"))  
        cy.visit('/documents') 
        cy.wait(2000)                          
        })         
    });   
    it.only('Importer My Documents -> Add Document Workflow',()=>{    
        const myDocObj = new importerMyDocuments()
        const newDocObj = new NewDocument() 
        myDocObj.clickOnAddDocuments()
        cy.logger('application',"Importer Add Document modal is opened")
        myDocObj.enterFacilityProductDetails(docData.docInput)
        cy.logger('application',"Importer Facility & product details are entered")
        myDocObj.enterDocumentDetails(docData.docInput)
        cy.logger('application',"Importer document details are entered")
        myDocObj.uploadDocumentFile(docData.docInput.uploadFile.fileName,docData.docInput.uploadFile.mimeTyp)
        cy.wait(18000)
        newDocObj.searchDoc(docData.docInput,"Importer")
        cy.logger('application',"Importer created new document details are verified")
    })
    it('Importer My Documents -> Send request for document',()=>{
        const newDocObj = new NewDocument()
        newDocObj.searchDoc(docData.docInput,"Importer")
        cy.logger('application',"Importer created new document details are verified")
        cy.fixture('./ImporterDocuments/MyDocuments/importerSendRequest').then((data)=>{
        const sendReqDocObj =  new importerSendRequest()  
        sendReqDocObj.clickOnImporterSendRequestDoc()
        sendReqDocObj.clickOnSendReqForFileIcon()
        sendReqDocObj.enterContactDetails(data.contactEmail, data.comments)
        sendReqDocObj.clickOnImporterDocSubmitBtn()
        const shareDocObj = new ShareDoc()
        const taskObj = new taskTab()
        shareDocObj.verifyDocIsShared(data.docShareEmail,data.docShareEmailSub)                       
        sendReqDocObj.verifyImporterDocReqEmail(docData.docInput.docReqCount,docData.docInput.Name,docData.docInput.SupplierName,data.UserName)
        taskObj.validateTaskDetails(docData.docInput.docReqCount,docData.docInput.Name,docData.docInput.SupplierName)     
        })                                
    })
    it('Importer My Documents -> Update Document',()=>{     
        const newDocObj = new NewDocument()
        newDocObj.searchDoc(docData.docInput,"Importer")
        cy.logger('application',"Importer created new document details are verified")
        cy.fixture('./ImporterDocuments/MyDocuments/importerUpdateDocument').then((updateDocData)=>{
            const updateDocObj = new importerUpdateDocument();   
            updateDocObj.clickOnImporterUpdateDoc()
            updateDocObj.EnterNewImporterData('',updateDocData.updatedDocInput)
            updateDocObj.clickOnImporterDocSaveBtn()
            cy.wait(5000)
            newDocObj.searchDoc(updateDocData.updatedDocInput,"Importer");     
          })                                
    })
    it('Importer My Documents -> Apply Filter ',()=>{
        cy.fixture('./ImporterDocuments/MyDocuments/importerApplyFilter').then((data)=>{
            const filterdocobj = new filterDoc()
            filterdocobj.applyFilter('Type', data.docTypeFilter, 'Importer')
            cy.logger('application', "Type Filter is applied")
            filterdocobj.resetFilter()
            cy.logger('application', " Filter is reset")
            filterdocobj.applyFilter('Category', data.docCatFilter, 'Importer')
            cy.logger('application', "Category Filter is applied")
            filterdocobj.resetFilter()
            cy.logger('application', " Filter is reset")
            filterdocobj.applyFilter('Product', data.docProductFilter, 'Importer')
            cy.logger('application', "Product Filter is applied")
            filterdocobj.resetFilter()
            cy.logger('application', " Filter is reset")
            const importerFilterObj = new importerApplyFilter()
            importerFilterObj.importerFilter('Supplier', data.supplierFilter, data.supplierFilterValue)
            cy.logger('application', "Supplier Filter is applied")
            filterdocobj.resetFilter('Supplier')
            cy.logger('application', " Filter is reset")
          })                                      
    }) 
    it('Importer My Documents -> Download file attached to document',() => {
        const newDocObj = new NewDocument() 
        newDocObj.clickOnDocStatusLabel(docData.docStatusLabel)
        cy.wait(2000)
        newDocObj.verifyDocStatusData(docData.docStatusLabel)
        newDocObj.DownloadDoc()
    }) 
    it('Importer My Documents -> Share Created document',()=>{ 
        const newDocObj = new NewDocument() 
        newDocObj.searchDoc(docData.docInput,"Importer")
        cy.fixture('./ImporterDocuments/MyDocuments/importerShareDoc').then((shareDocData)=>{
            const shareDocObj = new ShareDoc()
            shareDocObj.clickOnSingleShareDoc()
            shareDocObj.shareDoc(shareDocData.docShareName,shareDocData.docShareEmail,shareDocData.docShareEmailMsg);
            cy.logger('application',"Document is shared ")           
            cy.wait(1000) 
            shareDocObj.verifyDocIsShared(shareDocData.docShareEmail,shareDocData.docShareEmailSub)
            shareDocObj.verifySharedDocEmailContent(docData.docInput)      
        })
        /*cy.get('@downloadFile').then((filename)=>{                               
            cy.task('readPdf','cypress/downloads/'+filename).then((data)=>{
            cy.log(data.text)
            })              
        }) */
    }) 
    it('Importer My Documents -> Temporarily Delete Multiple Documents',() => {
        const newDocObj = new NewDocument() 
        const viewDelListObj = new ViewDeletedList() 
        viewDelListObj.selectDocuments(docData.tempDocDeleteCount)
        viewDelListObj.clickOnDeleteMultipleDocOption()
        viewDelListObj.verifySelectedDocOnDelDocPopUp()
        viewDelListObj.clickOnOKBtnOnDelDocPopUp()
        //cy.wait(2000)
        
    })
    it('Importer My Documents -> Move back single document to my documents section',() => {
        let doc_name,doc_type,doc_cat,supplier_name,fda_prod_cat
        const newDocObj = new NewDocument() 
        const viewDelListObj = new ViewDeletedList() 
        viewDelListObj.clickOnViewDeletedList()
        cy.wait(2000) 
        viewDelListObj.selectFirstDocOnDeletedList()
        viewDelListObj.clickOnSingleDocArchieveBtn() 
        cy.wait(2000) 
        cy.get('@docNameOnDeletedList').then((docName) => {
            doc_name = docName
            cy.get('@docTypeOnDeletedList').then((docType) => {
                doc_type = docType
                cy.get('@docCatOnDeletedList').then((docCat) => {
                    doc_cat = docCat
                    cy.get('@supplierNameOnDeletedList').then((supplierName) => {
                        supplier_name = supplierName
                        cy.get('@fdaProductCatOnDeletedList').then((fdaProdCat) => {
                            fda_prod_cat = fdaProdCat  
                        const docInput = {
                            "Type": doc_type,
                            "Name": doc_name,
                            "Cat": doc_cat,
                            "ProductCategory": fda_prod_cat,
                            "SupplierName": supplier_name
                        }
                        cy.log(JSON.stringify(docInput))
                        cy.wait(8000)
                        viewDelListObj.closeDeletedDocumentList()
                        newDocObj.selectMyDocumentsTab()
                        cy.wait(4000)
                        newDocObj.searchDocAddedThroughSmartDMS(docInput, "Importer")  
                        //cy.wait(2000)
                    })
                })
            })
        })
      }) 
    })
})
    


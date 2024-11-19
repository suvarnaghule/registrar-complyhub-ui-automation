import importerMyDocuments from "../../../PageClass/ImporterDocuments/MyDocuments/importerMyDocuments";
import SmartDM from "../../../PageClass/Facility360/Documents/SmartDMS/Facility360SmartDM"
import SingleUpload from "../../../PageClass/Facility360/Documents/SmartDMS/Facility360SingleUpload"
import NewDocument from "../../../PageClass/Facility360/Documents/MyDocuments/Facility360AddNewDocument";
import BulkUpload from "../../../PageClass/Facility360/Documents/SmartDMS/Facility360BulkUpload";
import IgnoreDocument from "../../../PageClass/Facility360/Documents/SmartDMS/Facility360IgnoreDocument";
import BulkIgnore from "../../../PageClass/Facility360/Documents/SmartDMS/Facility360BulkIgnore";
import documentRequest from "../../../PageClass/ImporterDocuments/SmartDMS/importerSingleDocumentRequest";
import importerSendRequest from "../../../PageClass/ImporterDocuments/MyDocuments/importerSendRequest";
import ShareDoc from "../../../PageClass/Facility360/Documents/MyDocuments/Facility360ShareDocument";
import pagination from "../../../PageClass/ImporterDocuments/SmartDMS/pagination";
import taskTab from "../../../PageClass/Task/taskTab";

describe('Validate Importer Smart DMS Tab',()=>{
    let docData
    beforeEach(()=>{           
        cy.fixture('./ImporterDocuments/SmartDMS/importerSmartDMS').then((data)=>{
        docData = data 
        cy.loginMyFDA(data.UserName,data.UserPassword) 
        cy.visit('/documents').wait(2000)                            
        })         
    });  
    
    it('Importer Smart DMS Tab -> Apply Filter document suggestions',()=>{      
        const smartdm = new SmartDM();
        smartdm.selectSmartDMTab();
        cy.logger('application',"SmartDM tab is selected")
        smartdm.applyFilter(docData.ProductCatFilter,docData.ProductCatFilterValue)
        cy.wait(5000)
        smartdm.verifyFilter(docData.ProductCatFilter,docData.ProductCatFilterValue)
        cy.wait(1000)
        smartdm.resetFilter()
        cy.wait(2000)
        smartdm.applyFilter(docData.DocCatFilter,docData.DocCatFilterValue,)
        cy.wait(5000)
        smartdm.verifyFilter(docData.DocCatFilter,docData.DocCatFilterValue,'Importer')
        cy.wait(1000)
        smartdm.resetFilter()
        cy.wait(4000)
        smartdm.applyFilter(docData.DocTypeFilter,docData.DocTypeFilterValue)
        cy.wait(5000)
        smartdm.verifyFilter(docData.DocTypeFilter,docData.DocTypeFilterValue,'Importer')
        cy.wait(1000)
        smartdm.resetFilter()
        cy.wait(4000)
        smartdm.applyFilter(docData.ProductFilter,docData.ProductFilterValue)
        cy.wait(5000)
        smartdm.verifyFilter(docData.ProductFilter,docData.ProductFilterValue)
        cy.wait(1000)
        smartdm.resetFilter()
        cy.wait(4000)
        smartdm.applyFilter(docData.SupplierFilter,docData.SupplierFilterValue)
        cy.wait(5000)
        smartdm.verifyFilter(docData.SupplierFilter,docData.SupplierFilterValue)
        cy.wait(1000)
        smartdm.resetFilter()
    })
  
    it('Documents - SmartDMS tab- Ignore & Retrieve single document suggestion',{ tags:'@regression' }, () => {
        let initial_doc_cnt
        let i = 1
        const smartdm = new SmartDM();
        const ignoreDoc = new IgnoreDocument()
        const bulkUpload = new BulkUpload()
        smartdm.selectSmartDMTab();
        cy.logger('application', "SmartDM tab is selected")
        cy.wait(5000)
        smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((doc_cnt) => {
            initial_doc_cnt = doc_cnt
            cy.log('Initial doc count : ' + initial_doc_cnt)
        })
        bulkUpload.selectDocuments(1, 'Importer')
        ignoreDoc.clickOnIgnoredDocument()
        cy.wait(5000)
        smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((updated_doc_cnt) => {
            expect(updated_doc_cnt).eq(initial_doc_cnt - 1)
        })
        smartdm.clickOnViewIgnoredList()
        cy.get('@FdaCat' + i).then((FdaCat) => {
            ignoreDoc.applyFilter(FdaCat.toUpperCase())
        })
        ignoreDoc.verifyIgnoredDoc()
        cy.wait(2000)      
        ignoreDoc.retrieveSingleDoc()
        cy.wait(5000)
        smartdm.closeIgnoredDocList()
        cy.wait(2000)
        ignoreDoc.verifyRetrivedSingleDoc('Importer')
        cy.wait(2000)
        smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((updated_doc_cnt) => {
            expect(updated_doc_cnt).eq(initial_doc_cnt)
        })
    })

    it('Documents - SmartDMS tab- Ignore & Retrieve bulk document suggestion', () => {
        let initial_doc_cnt,bulk_ignore_doc_count
        let i = 1   
        const smartdm = new SmartDM();
        const bulkUpload = new BulkUpload()
        const bulkIgnore = new BulkIgnore()    
        smartdm.selectSmartDMTab();
        cy.logger('application', "SmartDM tab is selected")
        cy.wait(5000)
        smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((doc_cnt) => {
            initial_doc_cnt = doc_cnt
            cy.log('Initial doc count : ' + initial_doc_cnt)
        })
        cy.fixture('./ImporterDocuments/SmartDMS/importerSmartDMS').then((data) => {
            bulk_ignore_doc_count = data.BulkIgnoreDocCount
            bulkUpload.selectDocuments(data.BulkIgnoreDocCount, 'Importer')      
        cy.wait(100)
        bulkIgnore.clickOnBulkIgnoreIcon() 
        cy.wait(2000) 
        smartdm.clickOnViewIgnoredList()
        bulkIgnore.verifyBulkIgnoredDoc() 
        bulkIgnore.retrieveBulkIgnoredDoc()
        cy.wait(7000)
        bulkIgnore.verifyRetrievedBulkIgnoredDoc(bulk_ignore_doc_count,'Importer')
        cy.wait(2000)
        smartdm.getSmartDMSDocCount()
            cy.get('@SmartDMSDocCnt').then((updated_doc_cnt) => {
            expect(updated_doc_cnt).eq(initial_doc_cnt)
            })      
        })         
    })
    
    it('Importer Smart DMS Tab -> Single Add Document',()=>{
        let initial_doc_cnt, doc_type, doc_cat, doc_product, supplier_name, AddDocData;     
        const smartdm = new SmartDM();
        const singleUpload = new SingleUpload()
        smartdm.selectSmartDMTab();
        cy.logger('application', "SmartDM tab is selected")
        cy.wait(5000)
        smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((doc_cnt) => {
            initial_doc_cnt = doc_cnt
            cy.log('Initial doc count : ' + initial_doc_cnt)
            cy.logger('aaplication', "Smart DMS tab doc count noted")
            smartdm.clickOnAddFile()
            cy.fixture('./ImporterDocuments/SmartDMS/importerAddDocument').then((data) => {
                AddDocData = data
                singleUpload.EnterInputdata(data.docInput, 'Importer')
            })
            cy.wait(5000)
            const documentobj = new NewDocument();
            documentobj.selectMyDocumentsTab()
            cy.wait(4000)
            //Check doc gets added in My documents Tab 
            cy.get('@docType').then((docType) => {
                doc_type = docType
                cy.get('@docCat').then((docCat) => {
                    doc_cat = docCat
                    cy.get('@docProduct').then((docProduct) => {
                        doc_product = docProduct
                        cy.get('@supplierName').then((supplierName) => {
                            supplier_name = supplierName
                            const docInput = {
                                "Type": doc_type,
                                "Name": AddDocData.docInput.Name,
                                "Cat": doc_cat,
                                "ProductCategory": doc_product,
                                "ProductCatNumber":AddDocData.docInput.ProductCatNum,
                                "Product":AddDocData.docInput.ProductName,
                                "SupplierName": supplier_name
                            }
                            cy.log(JSON.stringify(docInput))
                            documentobj.selectMyDocumentsTab()
                            cy.wait(4000)
                            documentobj.searchDoc(docInput, 'Importer')
                            cy.wait(2000)
                        })
                    })
                })
            })
            smartdm.getSmartDMSDocCount()
            cy.get('@SmartDMSDocCnt').then((updated_doc_cnt) => {
                expect(updated_doc_cnt).eq(initial_doc_cnt - 1)
            })
        })
    })    
    it.skip('Importer Smart DMS Tab -> Bulk Add Document', () => {
        let initial_doc_cnt
        let doc_name,doc_cat,doc_type,doc_product,product_name,supplier_name;  
        const smartdm = new SmartDM();
        smartdm.selectSmartDMTab();
        cy.logger('application', "SmartDM tab is selected")
        cy.wait(5000)
        smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((doc_cnt) => {
            initial_doc_cnt = doc_cnt
            cy.log('Initial doc count : ' + initial_doc_cnt)
        })
        const bulkUpload = new BulkUpload()
        cy.fixture('./ImporterDocuments/SmartDMS/importerAddDocument').then((data) => {
            bulkUpload.selectDocuments(data.BulkUploadCount, 'Importer')
            cy.wait(100)
            bulkUpload.clickOnBulkUploadIcon('Importer')
            bulkUpload.clickOnSaveBtn()
            cy.wait(12000)
            const documentobj = new NewDocument();
            documentobj.selectMyDocumentsTab()
            cy.wait(2000)
            cy.reload()                               
            cy.wait(6000)
            for(let i=1;i<=data.BulkUploadCount;i++)
            {
                cy.get('@DocType'+i).then((docType) => {
                    doc_type = docType
                    cy.get('@DocCat'+i).then((docCat) => {
                        doc_cat = docCat
                        cy.get('@FdaCat'+i).then((docProduct) => {
                            doc_product = docProduct
                            cy.get('@SupplierName'+i).then((supplierName) => {
                                supplier_name = supplierName
                                const docInput = {
                                    "Type": doc_type,
                                    "Name": doc_type,
                                    "Cat": doc_cat,
                                    "ProductCategory": doc_product,
                                    "SupplierName": supplier_name
                                }
                                cy.log(JSON.stringify(docInput)) 
                               // documentobj.searchDocAddedThroughSmartDMS(docInput, 'Importer')
                                cy.wait(2000)
                            })
                        })
                    })
                }) 
            }
            cy.wait(2000)
            smartdm.getSmartDMSDocCount()
            cy.get('@SmartDMSDocCnt').then((updated_doc_cnt)=>{
            expect(updated_doc_cnt).eq(initial_doc_cnt-data.BulkUploadCount)
            }) 
        })
    })    

    it('Importer Smart DMS Tab -> Filter on View Ignored List with Pagination',{tags:'@smoke'},()=>{
        const smartdm = new SmartDM();  
        const paginationObj = new pagination()
        const ignoreDoc = new IgnoreDocument()
        smartdm.selectSmartDMTab();
        cy.logger('application', "SmartDM tab is selected")
        smartdm.clickOnViewIgnoredList()
        cy.get('@IgnoreDocListFlag').then((flag) => {
            if (flag == true) {
                paginationObj.getTotalCountOfRecords() 
                cy.fixture('./ImporterDocuments/SmartDMS/importerPagination').then((data) => {
                    ignoreDoc.applyFilter(data.FDAProductCategory)
                    paginationObj.clickOnNext(data.FDAProductCategory)  
                })       
            }
        })
    })

    it('Importer Smart DMS Tab -> Single Document Request',()=>{
        let initial_doc_cnt, doc_name, fda_cat, doc_cat, supplier_name, doc_type
        let i = 1
        const myDocObj = new importerMyDocuments()
        const smartdm = new SmartDM();
        const bulkUpload = new BulkUpload()
        const docReq = new documentRequest()
        const documentobj = new NewDocument()
        smartdm.selectSmartDMTab();
        cy.logger('application', "SmartDM tab is selected")
        cy.wait(5000)
        smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((doc_cnt) => {
            initial_doc_cnt = doc_cnt
            cy.log('Initial doc count : ' + initial_doc_cnt)
        })
        bulkUpload.selectDocuments(1, 'Importer')
        cy.wait(100)
        docReq.clickOnSingleDocReqIcon()
        const sendDocReq = new importerSendRequest()
        cy.fixture('./ImporterDocuments/SmartDMS/importerRequestDocument').then((data) => {
            sendDocReq.enterContactDetails(data.contactEmail, data.comments, 'SmartDMS')
            cy.wait(1000)
            sendDocReq.clickOnImporterDocSubmitBtn('SmartDMS')
            cy.wait(20000)
            documentobj.selectMyDocumentsTab() 
            cy.wait(8000)
            bulkUpload.verifyBulkAddDoc(1, 'Importer')                            // checks documents get added in My Documents Tab
            cy.wait(4000)
           // cy.reload()
          //  myDocObj.checkRequestStatusOfDoc(1)
            cy.wait(4000)
            smartdm.getSmartDMSDocCount()                                         // check updated Smart DMS Doc count after single file request                    
            cy.get('@SmartDMSDocCnt').then((doc_cnt) => {
                expect(doc_cnt).eq(initial_doc_cnt - 1)
            })    
            const shareDocObj = new ShareDoc()
            const sendReqDocObj = new importerSendRequest()
            const taskTabObj = new taskTab()
            shareDocObj.verifyDocIsShared(data.docShareEmail, data.docShareEmailSub)                   
            cy.get('@DocType' + i).then((DocType) => {
                cy.get('@SupplierName'+ i).then((supplier) => {  
                    sendReqDocObj.verifyImporterDocReqEmail(1, DocType, supplier, docData.UserName, docData.UserPassword)
                    taskTabObj.validateTaskDetails(1, DocType, supplier)
                })
            })               
        })
    })
    it.only('Importer Smart DMS Tab -> Multiple Documents Request',()=>{
        let initial_doc_cnt, doc_name, fda_cat, doc_cat, supplier_name, doc_type
        let i = 1,m
        var docIndex = {'z': 1} 
    
        const myDocObj = new importerMyDocuments()
        const smartdm = new SmartDM();
        const bulkUpload = new BulkUpload()
        const docReq = new documentRequest()
        const documentobj = new NewDocument()
   
        smartdm.selectSmartDMTab();
        cy.logger('application', "SmartDM tab is selected")
        cy.wait(5000)
        smartdm.getSmartDMSDocCount()
        cy.get('@SmartDMSDocCnt').then((doc_cnt) => {
            initial_doc_cnt = doc_cnt
            cy.log('Initial doc count : ' + initial_doc_cnt)
        })
        cy.fixture('./ImporterDocuments/SmartDMS/importerBulkReqDoc').then((data) => {
            smartdm.applyFilter(data.SupplierFilter, data.SupplierFilterValue)
            cy.wait(5000)
            smartdm.verifyFilter(data.SupplierFilter, data.SupplierFilterValue)
            bulkUpload.selectDocuments(data.bulkReqDocCount, 'Importer')
            cy.wait(100)
            docReq.clickOnMultipleeDocReqIcon()
            const sendDocReq = new importerSendRequest()
            sendDocReq.enterContactDetails(data.contactEmail, data.comments, 'SmartDMS')
            cy.wait(500)
            sendDocReq.clickOnImporterDocSubmitBtn('SmartDMS')
            cy.wait(15000)
            documentobj.selectMyDocumentsTab() 
            cy.reload()  
            // bulkUpload.verifyBulkAddDoc(data.bulkReqDocCount, 'Importer')
            cy.wait(8000)
            // cy.reload()
            // cy.wait(2000)
            // myDocObj.checkRequestStatusOfDoc(data.bulkReqDocCount)
            cy.wait(4000)
            // check Smart DMS count 
            smartdm.getSmartDMSDocCount()                                         // check updated Smart DMS Doc count after single file request                    
            cy.get('@SmartDMSDocCnt').then((doc_cnt) => {
                expect(doc_cnt).eq(initial_doc_cnt - data.bulkReqDocCount)
            })
            const shareDocObj = new ShareDoc()
            const sendReqDocObj = new importerSendRequest()
            const taskTabObj = new taskTab()
            shareDocObj.verifyDocIsShared(data.docShareEmail, data.docShareEmailSub)        
            cy.get('@SupplierName' + i).then((supplier_name) => {     
                cy.get('@DocType' + i).then((DocType) => {          
                    sendReqDocObj.verifyImporterDocReqEmail(data.bulkReqDocCount,DocType,supplier_name,docData.UserName)                  
                })
            })
            /*for(m=1;m<=data.bulkReqDocCount;m++)
            {
                cy.get('@SupplierName' + m).then((supplier_name) => {     
                    cy.get('@DocType' + m).then((DocType) => { 
                        taskTabObj.validateMultipleTaskDetails(docIndex,DocType,supplier_name)
                    })
                })                               
            } */        
        })
    })
    it('Importer Smart DMS Tab -> Merge Documents',()=>{
        
    })
})
    

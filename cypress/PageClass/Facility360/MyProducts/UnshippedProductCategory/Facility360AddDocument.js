class AddDocument
{
    addProductDocumentBtn="div[class='exporter-product-container uk-width-1-2'] div[class='exporter-product-documents'] div[class~='documents-actions']" 
    browsePublicFileIcon="div[class='add-doc-templete'] div[class='select-doc-method'] div[class$='add-doc-public-file '] i"
    addDocumentModal="#expProductAddDocumentModal div[class='modal-content']"
    browseIconOnAddDocModal ="#expProductAddDocumentModal div[class='modal-content'] div[class$='add-doc-public-file '] i"
    docNameList="#expProductAddPublicDocumentForm ul li div[class='doc-name']"
    docNameSaveBtn="button[class$='exp-prod-doc-save']"
    docAddedNameList="#expProductEditForm div[class='exporter-product-documents'] div[class$='documents-list'] div[class$='document-name']"
   
    addDocBtnForAllProduct="div[class^='parent-product-container parent-product'] a[class^='add-document']"
   
    productCategoryContainerBlock="div[class^='parent-product-container parent-product']"
    productContainerBlock ="div[class='exporter-product-container uk-width-1-2']"
    documentList="div[class='exporter-product-documents']"
    documentName="div[class$='document-name']"
    productDocumentList="div[class$='documents-list']"
    viewDocumentBtn="div[class$='document-actions'] i[class='doc-preview']"
    downloadDocumentBtn="div[class$='document-actions'] i[class='doc-download']"
    

    addDocumentToProduct(docName)
    {
        cy.get('@index').then((i)=>{
            cy.get(this.addProductDocumentBtn).eq(i).find('a').contains('Add Documents').click().then((addDocBtn)=>{
                cy.wait(500)
                cy.get(this.browsePublicFileIcon).click().then(()=>{
                    cy.get(this.addDocumentModal).should('be.visible')
                    cy.get(this.docNameList).contains(docName).click()
                    cy.get(this.docNameSaveBtn).click()
                    cy.wait(8000)
                })
            })
        })
    }   
    verifyDocumentIsAddedOnEditProductForm(docName)
    {
        cy.get(this.docAddedNameList).should('contain',docName)
    }
    clickOnAddDocument()
    {
        cy.get(this.addDocBtnForAllProduct).first().click().then(()=>{
            cy.wait(1000)
            cy.get(this.addDocumentModal).should('be.visible')
        })
    }
    addDocByBrowsePublicFile(docName)
    {
        cy.get(this.browseIconOnAddDocModal).click().then(()=>{
            cy.get(this.docNameList).should('be.visible')
            cy.get(this.docNameList).contains(docName).click()
            cy.get(this.docNameSaveBtn).click()
            cy.wait(8000)
        })
    }
    verifyDocumentIsAddedToAllProducts(docName)
    {
        cy.get(this.productCategoryContainerBlock).first().then(($firstProductCategory)=>{
            cy.get($firstProductCategory).find(this.productContainerBlock).as('productContainerBlk').then(($productContainerBlk)=>{
                for(let i=0;i<$productContainerBlk.length;i++)
                {
                    cy.get('@productContainerBlk').eq(i).find(this.documentList).then(($documentList)=>{
                        cy.get($documentList).find(this.documentName).as('documentNameList')
                        cy.get('@documentNameList').should('contain',docName)
                    })
                }
            })
        })
    }
    verifyDocIsAddedToSingleProduct(docName)
    {
        cy.get('@index').then((i)=>{
            cy.get(this.productContainerBlock).eq(i).find(this.documentList).then(($documentList)=>{
                cy.get($documentList).find(this.documentName).as('documentNameList')
                cy.get('@documentNameList').should('contain',docName)
            })
        })     
    }
    searchDocument(document_name)
    {
        cy.get('@index').then((i)=>{
            cy.get(this.productContainerBlock).eq(i).find(this.productDocumentList).then(($documentList)=>{                                                      
                cy.get($documentList).each(($ele,index,$list)=>{
                    cy.get($ele).find(this.documentName).then(($docName)=>{
                        if($docName.text().trim() == document_name )
                        {                                                            
                               cy.wrap(index).as('docNameIndex') 
                                return false;                                                                                                         
                        }
                    })
                }) 
            })
        })     
    }
    viewDocument()
    {
        cy.get('@index').then((i)=>{
            cy.get('@docNameIndex').then((index)=>{
                cy.get(this.productContainerBlock).eq(i).then(($prodContainerBlk)=>{
                    cy.get($prodContainerBlk).find(this.productDocumentList).eq(index).then(($docList)=>{
                        cy.get($docList).find(this.viewDocumentBtn).then(($viewDocBtn)=>{
                            cy.get($viewDocBtn).click()
                        })
                    })
                })
            })
        })      
    }
    downloadDocument()
    {
        cy.get('@index').then((i)=>{
            cy.get('@docNameIndex').then((index)=>{
                cy.get(this.productContainerBlock).eq(i).then(($prodContainerBlk)=>{
                    cy.get($prodContainerBlk).find(this.productDocumentList).eq(index).then(($docList)=>{
                        cy.get($docList).find(this.downloadDocumentBtn).then(($downloadDocBtn)=>{
                            cy.get($downloadDocBtn).click().then(()=>{
                                cy.get($downloadDocBtn).invoke('attr','data-fn').then((filname)=>{        
                                    cy.readFile('cypress/downloads/'+filname,'utf-8',(err,data)=>{
                                        if(err)
                                        {
                                               throw err
                                        }
                                        else
                                        {
                                               cy.log(data)
                                        }
                                    })                                                 
                                })
                            })
                        })
                    })
                })
            })
        })      
    }
}
export default AddDocument;
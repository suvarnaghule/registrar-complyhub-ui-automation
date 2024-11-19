import Login from "../../../../PageClass/CommonPages/Login";
import Facility360 from "../../../../PageClass/CommonPages/Facility360";
import AddProductCategory from "../../../../PageClass/Facility360/MyProducts/UnshippedProductCategory/Facility360AddProductCategory"
import Filter from "../../../../PageClass/Facility360/MyProducts/UnshippedProductCategory/Facility360ApplyFilter"
import AddProduct from "../../../../PageClass/Facility360/MyProducts/UnshippedProductCategory/Facility360AddProduct"
import EditProduct from "../../../../PageClass/Facility360/MyProducts/UnshippedProductCategory/Facility360EditProduct"
import AddDocument from "../../../../PageClass/Facility360/MyProducts/UnshippedProductCategory/Facility360AddDocument";
import AdvertisementWorkflow from "../../../../PageClass/Facility360/MyProducts/UnshippedProductCategory/Facility360AdvertisementWorkflow";

import ImporterMarketPlace from "../../../../PageClass/CommonPages/ImporterMarketPlace";
import SearchSupplier from "../../../../PageClass/ImporterMarketPlace/SearchSupplier/marketPlaceSearchSupplier";



const startTime = Date.now();
describe('Validate Facility360 Tab',()=>{

     beforeEach(() => {
          cy.visit('https://dev-registrarcorp.myfda.com/');
          cy.logger('application',"Launched Application-->Login Test");
            
      });
    
  it('View Unshipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360AddUnshippedProdCat').then((data) => {
            
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const prodCatObj = new AddProductCategory()
            prodCatObj.selectMyProductsTab()
            cy.wait(3000)
            prodCatObj.selectUnshippedProductCategoryTab()
            prodCatObj.viewProductCategory()

        })    
    })
  it('Add New Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360AddUnshippedProdCat').then((data) => {
            
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const addProdCatObj = new AddProductCategory()
            addProdCatObj.selectMyProductsTab()
            cy.wait(3000)
            addProdCatObj.selectUnshippedProductCategoryTab()
            addProdCatObj.addNewProductcategory(data.productCategory,data.shipmentDate)
            cy.wait(3000)               
            addProdCatObj.searchProductCategory(data.productCategory)
            addProdCatObj.verifyNewProductCategory(data.productCategory,data.shipmentDate)
        })    
    })
    it('Add Product to an Unshipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360AddProduct').then((data) => {
            
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const addProdCatObj = new AddProductCategory()
            addProdCatObj.selectMyProductsTab()
            cy.wait(3000)
            addProdCatObj.selectUnshippedProductCategoryTab()
            cy.wait(2000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            const addProdObj = new AddProduct()
            addProdObj.addProductToUnshippedProdCat(data.productName,data.productDesc)
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            addProdObj.verifyNewProductAdded(data.productName,data.productDesc,data.newProductLabel)
        })    
    })
    it('Add Document to single product of an Unshipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360AddDocument').then((data) => {       
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const addProdCatObj = new AddProductCategory()
            addProdCatObj.selectMyProductsTab()
            cy.wait(3000)
            addProdCatObj.selectUnshippedProductCategoryTab()
            cy.wait(2000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            const editProdObj = new EditProduct()
            editProdObj.searchProduct(data.searchProduct)
            const addDocObj = new AddDocument()
            addDocObj.addDocumentToProduct(data.documentName)
            addDocObj.verifyDocumentIsAddedOnEditProductForm(data.documentName)
            editProdObj.closeEditProductForm()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            addDocObj.verifyDocIsAddedToSingleProduct(data.documentName)
        })    
    })
    it('User can view document attached to a product of unshipped product category',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360AddDocument').then((data) => {       
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const addProdCatObj = new AddProductCategory()
            addProdCatObj.selectMyProductsTab()
            cy.wait(3000)
            addProdCatObj.selectUnshippedProductCategoryTab()
            cy.wait(2000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            const editProdObj = new EditProduct()
            editProdObj.searchProduct(data.searchProduct)
            const addDocObj = new AddDocument()
            addDocObj.searchDocument(data.documentName)
            addDocObj.viewDocument()
        })    
    })
    it.only('User can download document attached to a product of unshipped product category',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360AddDocument').then((data) => {       
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const addProdCatObj = new AddProductCategory()
            addProdCatObj.selectMyProductsTab()
            cy.wait(3000)
            addProdCatObj.selectUnshippedProductCategoryTab()
            cy.wait(2000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            const editProdObj = new EditProduct()
            editProdObj.searchProduct(data.searchProduct)
            const addDocObj = new AddDocument()
            addDocObj.searchDocument(data.documentName)
            addDocObj.downloadDocument()
        })    
    })

    it('Add Document to all products of an Unshipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360AddDocument').then((data) => {       
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const addProdCatObj = new AddProductCategory()
            addProdCatObj.selectMyProductsTab()
            cy.wait(3000)
            addProdCatObj.selectUnshippedProductCategoryTab()
            cy.wait(3000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)     
            const addDocObj = new AddDocument()
            addDocObj.clickOnAddDocument()
            addDocObj.addDocByBrowsePublicFile(data.documentName) 
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)     
           // addProdCatObj.searchProductCategory(data.searchProduct)
            addDocObj.verifyDocumentIsAddedToAllProducts(data.documentName)                       
        })    
    })   
    it('Verify that User can advertise an unshipped product category & product',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360AdvertisementWorkflow').then((data) => {       
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const addProdCatObj = new AddProductCategory()
            addProdCatObj.selectMyProductsTab()
            cy.wait(3000)
            addProdCatObj.selectUnshippedProductCategoryTab()
            cy.wait(2000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            const adverWorkflowObj = new AdvertisementWorkflow()
            adverWorkflowObj.makeProductCategoryVisible()
            const editProdObj = new EditProduct()
            editProdObj.searchProduct(data.productName)
            adverWorkflowObj.makeProductVisible()
            cy.wait(500)
            const marketplaceObj = new ImporterMarketPlace()
            marketplaceObj.selectImporterMarketPlaceTab()
            cy.wait(10000)
            const searchSuppObj = new SearchSupplier()
            searchSuppObj.selectSearchSupplierOption()
            cy.wait(3000)
            searchSuppObj.searchSupplier(data.supplierName)
            cy.wait(3000)
            searchSuppObj.clickOnMoreInfo(data.supplierName)
            searchSuppObj.verifyAdvertisedProductCat(data.prodCat)
            searchSuppObj.verifyAdvertisedProduct(data.productName)         
        })    
    })
    it('Edit Product for an Unshipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360EditProduct').then((data) => {
            
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const addProdCatObj = new AddProductCategory()
            addProdCatObj.selectMyProductsTab()
            cy.wait(3000)
            addProdCatObj.selectUnshippedProductCategoryTab()
            cy.wait(2000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
           // addProdCatObj.searchProductCategory(data.searchProductCategory)
            const editProdObj = new EditProduct()
            editProdObj.searchProduct(data.searchProduct)
            editProdObj.updateProduct(data.searchProduct)
            cy.wait(2000)   
            editProdObj.closeEditProductForm()       
        })    
    })
    it('Apply Filter',()=>{  

        cy.fixture('./Facility360/MyProducts/UnshippedProductCategory/facility360ApplyFilter').then((data) => {          
            const loginobj = new Login();
            loginobj.userLogin(data.UserName,data.UserPassword);
            cy.wait(2000);
            loginobj.verifyLoginSuccess();
            cy.logger('application',"Validated success Login Msg-->Login Test");
            const facility360 = new Facility360();
            facility360.selectFacility360Tab();
            cy.logger('application',"Redirected to facility360 tab")
            cy.get('.modal-content > a').click();
            facility360.selectFacilityFromDD(data.facilityDDText,data.facilityDDValue);
            cy.logger('application',"Facility selected"+data.facilityDDText)
            cy.wait(2000); 
            const prodCatObj = new AddProductCategory()
            prodCatObj.selectMyProductsTab()
            cy.wait(3000)
            prodCatObj.selectUnshippedProductCategoryTab()
            cy.wait(2000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            filterObj.verifyFilter(data.productCategory)
            filterObj.resetFilter()
            cy.wait(2000)
            filterObj.applyFilter(data.publishStatus) 
            cy.wait(2000)
            filterObj.verifyFilter(data.publishStatus)
        })    
    })

})    

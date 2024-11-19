import Login from "../../../../PageClass/CommonPages/Login";
import Facility360 from "../../../../PageClass/CommonPages/Facility360";
import AddProductCategory from "../../../../PageClass/Facility360/MyProducts/UnshippedProductCategory/Facility360AddProductCategory"
import ShippedProductCategory from "../../../../PageClass/Facility360/MyProducts/ShippedProductCategory/Facility360ShippedProdCat";
import Filter from "../../../../PageClass/Facility360/MyProducts/UnshippedProductCategory/Facility360ApplyFilter"
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
    
  it('View Shipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/ShippedProductCategory/facility360ShippedProductCategory').then((data) => {           
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
            const shippedProdCatObj = new ShippedProductCategory()
            shippedProdCatObj.selectShippedProductCategoryTab()
            prodCatObj.viewProductCategory()         
        })    
    })
    it('Add Document to single product of a Shipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/ShippedProductCategory/facility360ShippedAddDocument').then((data) => {       
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
            const shippedProdCatObj = new ShippedProductCategory()
            shippedProdCatObj.selectShippedProductCategoryTab()
            cy.wait(3000)
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
    it('Edit Product for Shipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/ShippedProductCategory/facility360ShippedEditProduct').then((data) => {      
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
            const shippedProdCatObj = new ShippedProductCategory()
            shippedProdCatObj.selectShippedProductCategoryTab()
            cy.wait(3000)
            const filterObj = new Filter()
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
           // addProdCatObj.searchProductCategory(data.searchProductCategory)
            const editProdObj = new EditProduct()
            editProdObj.searchProduct(data.searchProduct)
            shippedProdCatObj.updateShippedProduct(data.productName,data.productDesc) 
            cy.wait(3000)
            editProdObj.closeEditProductForm()
            cy.wait(2000)
            filterObj.applyFilter(data.productCategory)
            cy.wait(2000)
            editProdObj.searchProduct(data.productName)
            shippedProdCatObj.verifyProductIsUpdated(data.productName,data.productDesc)
        })    
    })
    it('User can view document attached to a product of Shipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/ShippedProductCategory/facility360ShippedAddDocument').then((data) => {       
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
            const shippedProdCatObj = new ShippedProductCategory()
            shippedProdCatObj.selectShippedProductCategoryTab()
            cy.wait(3000)        
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
    it('User can download document attached to a product of Shipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/ShippedProductCategory/facility360ShippedAddDocument').then((data) => {       
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
            const shippedProdCatObj = new ShippedProductCategory()
            shippedProdCatObj.selectShippedProductCategoryTab()
            cy.wait(3000)        
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
    it('Add Document to all products of a Shipped Product Category',()=>{  

        cy.fixture('./Facility360/MyProducts/ShippedProductCategory/facility360ShippedAddDocument').then((data) => {       
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
            const shippedProdCatObj = new ShippedProductCategory()
            shippedProdCatObj.selectShippedProductCategoryTab()
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
    it.only('Verify that User can advertise a Shipped Product Category & Product',()=>{  

        cy.fixture('./Facility360/MyProducts/ShippedProductCategory/facility360ShippedAdvertisementWorkflow').then((data) => {       
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
            const shippedProdCatObj = new ShippedProductCategory()
            shippedProdCatObj.selectShippedProductCategoryTab()
            cy.wait(3000)                 
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
})    
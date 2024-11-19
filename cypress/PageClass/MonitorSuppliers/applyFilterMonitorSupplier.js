class monitorSupplierFilter
{
    filterIcon = "div[class^='search-container'] div[class='uk-sticky-placeholder'] i[class='fas fa-filter']"
    filterContainer ="div[class='filter-container']"
    filterNameHeader="div[class='filter-container'] h3"
    filterRadioBtn="input[type='radio'],[type='checkbox']"
    filterCheckBoxContainer="div[class='checkbox-container']"

    monitoredFacilityLeftMenu="div[class^='dashboard-left-menu']" 
    monitoredSupplierList="div[class^='dashboard-left-menu'] div[id^='facility-name']"
    supplierScore="div[class='facility-info-score'] span"

    resetFilter="#filterBy #clearFilter"
    countryNameFilterDD ="select[class='countryFilter']"
    listFilterAction = "#customListsFilter a"
    AddEditListForm="#createCustomListModal div[class='list-container']"
    listNameTextBox="input[name='createListName']"
    listSaveBtn="#createCustomList"
    listItems="#customListsFilter label"
    editListIcon="a[id^='editCustomList']"
    deleteListIcon="a[id^='deleteCustomList']"
    editListForm="#editCustomListModal div[class='uk-modal-dialog']"
    deleteListForm="#deleteCustomListModal div[class='uk-modal-dialog']"
    editListHeader="#editCustomListModal h3"
    deleteListHeader="#deleteCustomListModal h3"
    deleteListFormText="#deleteCustomListModal div[class='list-container'] p[class='semibold']"
    deleteListBtn="#deleteCustomList"
    editListNameTextBox="#editListForm input[name='editListName']"
    editListButton="#editCustomList"

    pendingFacilityDetailInfo="li[class='uk-active'] div[class^='facility-detail']"
    pendingReviewHeader="span"

    clickOnFilterIcon()
    {
        cy.get(this.filterIcon).scrollIntoView().click({force:true}).wait(200)
        //cy.get(this.filterContainer).should('be.visible')
    }
    applyPendingReviewFilter()
    {

    }
    clickOnFilterName(filterName)
    {
        let filterNameLabel
        if (filterName == 'RegiScore') {
            filterNameLabel = this.filterNameHeader + " img"
            cy.get(filterNameLabel).scrollIntoView().click().wait(1000).parent().next().as('filterElement')
        }
        else {
            cy.get(this.filterNameHeader).contains(filterName).scrollIntoView().click().wait(1000).next().as('filterElement')
        }       
    }
    selectFilter(filterName, filterValue) 
    {
        cy.get('@filterElement').then((filterEle) => {
            if (filterName == 'Country') {
                cy.get(filterEle).find('span').contains('Select Countries').click()
                cy.get(filterEle).find('ul li').contains(filterValue).click()
            }
            else {
                cy.get(filterEle).find("label").contains(filterValue).then((labelEle) => {
                    cy.get(labelEle).within(() => {
                        cy.get(this.filterRadioBtn).check()
                    })
                })
            }
        })
    }
   /* selectCountryFilter(filterName,filterValue)
    {
        cy.get(this.filterNameHeader).contains(filterName).scrollIntoView().click().wait(1000).next().as('filterElement')
        cy.get('@filterElement').then((filterEle)=>{
            cy.get(filterEle).find('span').contains('Select Countries').click()
            cy.get(filterEle).find('ul li').contains(filterValue).click()
        })
    } */
    applyNestedFilter(filterName,filterValue)
    {
        let filter_name_ele = false
        const filterArr =['Inspections','Recalls','RegiScore','Supplier Status','Lists','DUNS Number','Automated','Pending','Acceptance','FSSC 22000','BRC','SQF','Food']
        cy.get('@filterElement').find(this.filterCheckBoxContainer).contains(filterName).then((filter_label_ele) => {
            if (filterArr.includes(filterName))                                                                  //(filterName == 'Inspections' || filterName == 'Recalls' || filterName == 'RegiScore' || filterName == 'Supplier Status' || filterName == 'Lists' || filterName == 'DUNS Number' || filterName == 'Automated' || filterName == 'Pending' || filterName == 'Acceptance')
            {
                cy.get(filter_label_ele).parent().next().then((ele) => {
                    cy.wrap(ele).as('filterLabelEle')
                    filter_name_ele = true
                })
                
            }
            else {
                if (filterName == 'Import Alerts') {
                    cy.get(filter_label_ele).next().then((ele) => {
                        cy.wrap(ele).as('filterLabelEle')
                        filter_name_ele = true
                    })
                    
                }
                else {
                    cy.wrap(filter_label_ele).as('filterLabelEle')
                }
            }
            cy.get('@filterLabelEle').then((filter_label_ele) => {
                if (filter_name_ele) {
                    cy.get(filter_label_ele).find("div[class='checkbox-container']").contains(filterValue).as('filterLabelEle')
                }
                cy.get('@filterLabelEle').then((labelEle) => {
                    cy.get(labelEle).within(() => {
                        cy.get(this.filterRadioBtn).check().should('be.checked')
                    })
                })
            })
        })
    }
    applyRegistrationFilter(filterName, filterValue)
    {  
        const regEx = new RegExp('^'+filterName)                    //"span[class='filter-subtitle']"
        cy.get('@filterElement').find("span[class='filter-subtitle']").contains(regEx).then((subFilterEle)=>{
            cy.log(subFilterEle)
            cy.get(subFilterEle).nextUntil('.filter-subtitle').contains(filterValue).within(()=>{
                cy.get(this.filterRadioBtn).check()  
            })
        })     
    }
    applyRecallFilter(filterName, subFilterName,filterValue)
    {
        let filter_name_ele=false           
        cy.get('@filterElement').find(this.filterCheckBoxContainer).contains(filterName).then((filter_label_ele) => {           
            if (filterName == 'Recalls'  || filterName == 'Audits' )
            {
                cy.get(filter_label_ele).parent().next().then((ele) => {
                   cy.get(ele).find("span[class='filter-subtitle']").contains(subFilterName).then((subFilterEle)=>{
                        cy.get(subFilterEle).nextUntil('.filter-subtitle').contains(filterValue).within(()=>{
                            cy.get(this.filterRadioBtn).check()  
                        })
                   })
                }) 
            }               
        })
    }
    verifyPendingReviewFacility(filterName, filterValue,data)
    {
        let headerText
        if (filterName == 'Pending' && filterValue == 'Review')
            headerText = 'Pending Review'
        else
            headerText = 'Pending Acceptance'
        cy.get(this.monitoredFacilityLeftMenu).then(($ele) => {
            if ($ele.has("div[class='dashboard-left']").length) {
                cy.get(this.pendingFacilityDetailInfo).each(($ele, $index, $list) => {
                    cy.get($ele).find(this.pendingReviewHeader).invoke('text').then((header) => {
                        expect(header.trim()).to.eq(headerText)
                    })
                })
            }
            else {
                cy.log("No supplier ")

            }
        })
    }
    interceptNetworkFilterRequest(filterName,filterValue)
    {
        let flywheeel_filter
        let qparam ={
            flywheelFilter: filterName  
        }
        if(filterName == 'Automated')
        {
            
            if(filterValue == 'Non-FSVP')
                filterValue = 'NonFSVP'
            qparam = {
            flywheelFilter: filterName,
            automatedStatus : filterValue
            }
        }
        else{
            if(filterName == 'Acceptance')
            {
                if(filterValue == 'Non-FSVP')
                filterValue = 'NonFSVP'
                qparam = {
                    status: 'Pending Acceptance',
                    automatedStatus : filterValue
                    } 
            }
        }
        cy.intercept({
            method: 'GET',
            path: '/dev/reg/monitor-company/search*',
            query: qparam
        }
        ).as('FilterData')
    }
    verifySupplierFeedFilter(filterName, filterValue,data)
    {
        if (filterName == 'Manual') {
            for (let j = 0; j < data.length; j++) {
                expect(data[j].FLYWHEEL).to.eq('N')
            }
        }
        else {
            if (filterName == 'Acceptance') {
                for (let j = 0; j < data.length; j++) {
                    expect(data[j].FLYWHEEL).to.eq('N')
                }
            }
            else {
                for (let j = 0; j < data.length; j++) {
                    expect(data[j].FLYWHEEL).to.eq('Y')
                }
            }
            for (let j = 0; j < data.length; j++) {
                if (filterValue == 'FSVP')
                    expect(data[j].FLYWHEEL_FSVP).to.eq('Y')
                else
                    expect(data[j].FLYWHEEL_FSVP).to.eq('N')
            }
        }
    }

    verifyFilter(filterName,filterValue)
    {     
        cy.get(this.monitoredFacilityLeftMenu).then(($ele)=>{
            if($ele.has("div[class='dashboard-left']").length)
            {
                if(filterName == 'RegiScore')  
                {
                    cy.get(this.monitoredSupplierList).each(($ele, $index,$list)=>{
                        cy.get($ele).find(this.supplierScore).invoke('text').then((riskText)=>{
                            expect(riskText.trim()).to.eq(filterValue)
                        })
                    })
                }                            
            }
            else
            {
                cy.log("Monitored Supplier List is empty")
            }
        })
      
    }
    clickOnClearAllFilter()
    {
        cy.get(this.resetFilter).scrollIntoView().click().then(()=>{
            cy.wait(4000)
        })
    }
    clickOnAddAList()
    {
        cy.get(this.listFilterAction).contains('Add a List').click().then(()=>{
            cy.get(this.AddEditListForm).should('be.visible')
        })
    }
    clickOnEditList(listItemName)
    {
        cy.get(this.listItems).contains(listItemName).then((listItemEle)=>{
            cy.get(listItemEle).within(()=>{
                cy.get(this.editListIcon).click()                        
            }).then(()=>{
                cy.get(this.editListForm).should('be.visible')
                cy.get(this.editListHeader).invoke('text').then((headerText)=>{
                    expect(headerText.trim()).to.eq('Edit Your List Name')
                })
                cy.get(this.editListNameTextBox).should('have.value',listItemName) 
            })
        })
    }
    clickOnDeleteList(listItemName)
    {
        cy.get(this.listItems).contains(listItemName).then((listItemEle)=>{
            cy.get(listItemEle).within(()=>{
                cy.get(this.deleteListIcon).click()                        
            }).then(()=>{
                cy.get(this.deleteListForm).should('be.visible')
                cy.get(this.deleteListHeader).invoke('text').then((headerText)=>{
                    expect(headerText.trim()).to.eq('Delete List')
                })
                cy.get(this.deleteListFormText).invoke('text').should('include',listItemName)           
            })
        })
        cy.get(this.deleteListBtn).click()
    }
    enterListName(listName)
    {
        cy.get(this.listNameTextBox).clear().type(listName).should('have.value',listName).then(()=>{
            cy.get(this.listSaveBtn).click()
            cy.wait(3000)
        })       
    }
    enterNewListName(listName)
    {
        cy.get(this.editListNameTextBox).clear().type(listName).should('have.value',listName)
        cy.get(this.editListButton).click()
    }
    verifyListNameInList(listName)
    {
        cy.get(this.listItems).should('contain.text',listName)
    }
    verifyListNameNotInList(listName)
    {
        cy.get(this.listItems).should('not.contain.text',listName) 
    }
}
export default monitorSupplierFilter;
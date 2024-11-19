class facilities
{
   
    editFacilityDetails(token,method,values,facility_id,msg)
    {
        cy.request({
            method: method,
            url: 'https://8wzmzls24e.execute-api.us-east-1.amazonaws.com/dev/preference',
            body: {
              keys: [{ name: 'monitorId', value:facility_id.toString() }],
              scopeName: 'mainUsername',
              values: values
            },
            qs: { token:token, scopeName: 'mainUsername' }
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq(msg);
            cy.request({
              method: 'GET',
              url: 'https://wj8017xak0.execute-api.us-east-1.amazonaws.com/dev/reg/monitor-company/index/trigger/'+facility_id,
              qs: { token:token }
            }).then((response) => {
              expect(response.body.message).to.eq('Triggered batch index for ' +facility_id);
            })
          })
          return;
    }
    stopOrResumeMonitoring(token,facility_id,action,msg) { 
      cy.request({
        method: 'POST',
        url: Cypress.env('facilityUrl')+'/reg/monitor-company/'+facility_id+'/action/'+action,
        qs: { token: token }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).is.null;
        expect(response.body.message).to.eq(msg)
        return;
      })
    }   
    searchFacility(token,facility_name) {   
      let facility_id=0; 
      let cd_num 
      cy.request({               
          method : 'GET',
          url: Cypress.env('facilityUrl')+'/reg/monitor-company/search',
          qs: {token:token, q: facility_name, offset :0}
        }).then((response) => { 
          expect(response.status).to.eq(200)      
          if (response.body.data.length != 0)
          {                         
               expect(response.body.data[0]).have.property('NAME',facility_name); 
               facility_id = response.body.data[0].ID;                                     
          } 
          cy.wrap(facility_id).as('FacilityId');                
        })         
    } 
   checkFacilityInPreviouslyMonitoredList(token,facility_name,facility_id) {  
      let prev_monitor_flag=false  
      cy.request({
        method: 'GET',
        url: Cypress.env('facilityUrl')+'/reg/monitor-company/search',
        qs: { token:token, includeExpired: 'true', excludeDeleted: 'false', status: 'Deleted', max: 2000 }
      }).then((response) => {
        for (let j = 0; j < response.body.data.length; j++) {
          if (response.body.data[j].NAME === facility_name && response.body.data[j].ID ==facility_id) {
            prev_monitor_flag = true
            break;
          }
        }
       cy.wrap(prev_monitor_flag).as('PrevMonitorFlag') ;
      })
    }
    getMonitoredFacilitiesCount(token) {       
      cy.request({
        method: 'GET',
        url: Cypress.env('facilityUrl')+'/reg/monitor-company/search', 
       // url: `${config.facility_url}`+'/reg/monitor-company/search',     
        qs: { token:token, max: 2000, fields: 'PHYS_COUNTRY' }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const count = response.body.data.length
        cy.wrap(count).as('FacilityCount') ;    
      }) 
    }
}
export default facilities;
class marketPlaceAPI
{
    verifyNoOfShipments()
    {
       return cy.request({
            method: 'GET',
            url: 'https://09rrocxeg5.execute-api.us-east-1.amazonaws.com/dev/company/search',
            qs: { token:'95758236-1e40-402a-890c-e977f816ad77', max:10, sort:'best-match',name_MatchesIn: 'india',country_Equals:'IN',totalShpmnts_GreaterThan: 100  }
          }).then((response)=>{
            return response;
          })        
    }
}
export default marketPlaceAPI;
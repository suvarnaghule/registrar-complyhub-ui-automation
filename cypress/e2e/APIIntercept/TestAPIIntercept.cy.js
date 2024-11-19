const username="FancyFood"
const password = "FDANYC"
describe('Test API Intercept',()=>{
    beforeEach(() => {
        cy.visit('/')
        cy.intercept({
            method: 'POST',
            url: '/dev/reg/auth/fda-monitor-legacy/authorize/'+username+'?createToken=true&password='+password+'*',
            //qs:'createToken=true,'
        }
        ).as('LoginComplyHub')
    })
  
    it('Login API Intercept & get token', () => {

        cy.get('#username').click().type('FancyFood');
        cy.get('#password').click().type('FDANYC', { log: false });
        cy.contains('Sign In').click();

        cy.wait('@LoginComplyHub').then(({ request, response }) => {
            cy.log("Token : ", response.body.data.tokenInfo.token);
           // Perform based on response body 
        })
    })
})
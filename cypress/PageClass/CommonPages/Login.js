class Login{

    username ="#username"
    password ="#password"
    signInBtn = "Sign In"
    signOutBtn = "a[id='sign-out']"


    setUserName(username)
    {
        cy.wait(2000)
        cy.get(this.username).click().type(username);
    }

    setPassword(password)
    {
        cy.get(this.password).click().type(password,{log:false});
    }

    clickLoginbtn()
    {
        cy.contains(this.signInBtn).click();
    }

    verifyLoginSuccess()
    {
      cy.get(this.signOutBtn).should('include.text','Sign Out') 
     }

    userLogin(username,password){
        cy.wait(2000)
        cy.get(this.username).click().type(username);
        cy.get(this.password).click().type(password);
        cy.contains(this.signInBtn).click();
        cy.get(this.signOutBtn).should('include.text','Sign Out')

    }



}

export default Login;
describe('Login', function () {
  context('NoLoggedInUser', function() {
    beforeEach(function () {
      cy.selectScenario("getCurrentUser", "noLoggedInUser");
      cy.visit('http://localhost:8100')
    });

    it('Login page is displayed correctly', function () {
      cy.get('.login-form').within(function() {
        cy.get('input:first').should('have.attr', 'placeholder', 'Email')
        cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      })

      cy.get('.submit-btn').should('contain', 'Login');
      cy.get('.register-btn').should('contain', 'Create New Account');
    });

    it('Login', function () {
      cy.get('.login-form').find('input[name="email"]').type('jum029@eng.ucsd.edu').should('have.value', 'jum029@eng.ucsd.edu');
      cy.get('.login-form').find('input[name="password"]').type('@Mm123456').should('have.value', '@Mm123456');
      cy.get('.login-form').submit();

      cy.get('ion-header').should('contain', 'Home');

      cy.getScenario("getCurrentUser", "true");
    });
  });

  context('LoggedInUser', function() {
    beforeEach(function () {
      cy.selectScenario("getCurrentUser", "loggedInUser");
      cy.visit('http://localhost:8100')
    });

    it('Page is displayed correctly', function () {
      cy.get('ion-header').should('contain', 'Home');
    });

    it('Logout', function () {
      cy.get('.menu').click();
      cy.wait(1000);
      cy.get('ion-list').children('button:last').click();

      cy.getScenario('getCurrentUser', "false");

      cy.get('.login-form').within(function() {
        cy.get('input:first').should('have.attr', 'placeholder', 'Email')
        cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      })

      cy.get('.submit-btn').should('contain', 'Login');
      cy.get('.register-btn').should('contain', 'Create New Account');
    });
  })

});

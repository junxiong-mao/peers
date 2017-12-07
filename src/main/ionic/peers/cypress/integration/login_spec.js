describe('Login', function () {
  context('NoLoggedInUser', function() {
    beforeEach(function () {
      cy.selectScenario("getCurrentUser", "noLoggedInUser");
      cy.visit('http://localhost:8100')
    });

    it('Login page is displayed correctly', function () {
      cy.get('.login-form').within(function() {
        cy.get('input:first').should('have.attr', 'placeholder', 'Email');
        cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      });

      cy.get('.submit-btn').should('contain', 'Login');
      cy.get('.register-btn').should('contain', 'Create New Account');
    });

    it('Login', function () {
      cy.get('.login-form').find('input[name="email"]').type('jum029@eng.ucsd.edu').should('have.value', 'jum029@eng.ucsd.edu');
      cy.get('.login-form').find('input[name="password"]').type('123456').should('have.value', '123456');
      cy.get('.login-form').submit();

      cy.get('ion-header').should('contain', 'Home');
    });

    it('Login error', function () {
      cy.get('.login-form').find('input[name="email"]').type('jum029@eng.ucsd.edu').should('have.value', 'jum029@eng.ucsd.edu');
      cy.get('.login-form').find('input[name="password"]').type('1234567').should('have.value', '1234567');
      cy.get('.login-form').submit();

      cy.get('ion-alert').should('contain', 'Access Denied');
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

      cy.get('.login-form').within(function() {
        cy.get('input:first').should('have.attr', 'placeholder', 'Email');
        cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      });

      cy.get('.submit-btn').should('contain', 'Login');
      cy.get('.register-btn').should('contain', 'Create New Account');
    });
  })

});

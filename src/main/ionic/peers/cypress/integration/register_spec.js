describe('Register', function () {
  beforeEach(function () {
    cy.selectScenario("getCurrentUser", "noLoggedInUser");
    cy.visit('http://localhost:8100')
  });

  it('Register page is displayed correctly', function () {
    cy.get('.register-btn').click();
    cy.wait(1000);
    cy.get('.register-form').within(function() {
      cy.get('[data-test=email]').should('have.attr', 'placeholder', 'Email');
      cy.get('[data-test=password]').should('have.attr', 'placeholder', 'Password');
      cy.get('[data-test=confirm_password]').should('have.attr', 'placeholder', 'Confirm Password');

      cy.get('[data-test=interests]').should('have.attr', 'secondaryPlaceholder', 'Enter your interests');
      cy.get('[data-test=bio]').should('have.attr', 'placeholder', 'Bio(500 characters maximum)');
    });

    cy.get('.submit-btn').should('contain', 'Register');
  });

  it('Register', function () {
    cy.get('.register-btn').click();
    cy.wait(1000);
    cy.get('.register-form').find('input[name="email"]').type('daz054@eng.ucsd.edu').should('have.value', 'daz054@eng.ucsd.edu');
    cy.get('.register-form').find('input[name="password"]').type('Mm#123456').should('have.value', 'Mm#123456');
    cy.get('.register-form').find('input[name="confirm_password"]').type('Mm#123456').should('have.value', 'Mm#123456');

    cy.get('.register-form').find('input[name="firstName"]').type('Danbing').should('have.value', 'Danbing');
    cy.get('.register-form').find('input[name="lastName"]').type('Zhu').should('have.value', 'Zhu');
    cy.get('.register-form').find('input[name="major"]').type('CE').should('have.value', 'CE');

    cy.get('.register-form').find('ion-select[name="level"]').click();
    cy.get('.alert-wrapper').contains('Master').click();
    cy.contains('OK').click();
    cy.get('.register-form').find('ion-select[name="level"]').contains('Master');

    cy.get('.register-form').get('input[aria-label="Enter your interests"]').type('software');
    cy.wait(1000);
    cy.get('ng2-dropdown-menu').get('ng2-menu-item:first').get('div[role="button"]').click();
    cy.get('.register-form').get('tag-input').get('div[title="Software engineering"]').contains('Software engineering');

    cy.get('.register-form').find('textarea[name="bio"]').type('Good Game').should('have.value', 'Good Game');

    // cy.get('[data-test=submit-button]').click();
    //
    // cy.get('ion-alert').get('h2').contains('Success');
  });

  it('Inconsistent passwords', function () {
    cy.get('.register-btn').click();
    cy.wait(1000);
    cy.get('.register-form').find('input[name="email"]').type('daz054@eng.ucsd.edu').should('have.value', 'daz054@eng.ucsd.edu');
    cy.get('.register-form').find('input[name="password"]').type('Mm#123456').should('have.value', 'Mm#123456');
    cy.get('.register-form').find('input[name="confirm_password"]').type('Mm#1234567').should('have.value', 'Mm#1234567');

    cy.get('.register-form').find('input[name="firstName"]').type('Danbing').should('have.value', 'Danbing');
    cy.get('.register-form').find('input[name="lastName"]').type('Zhu').should('have.value', 'Zhu');
    cy.get('.register-form').find('input[name="major"]').type('CE').should('have.value', 'CE');

    cy.get('.register-form').find('ion-select[name="level"]').click();
    cy.get('.alert-wrapper').contains('PhD').click();
    cy.contains('OK').click();
    cy.get('.register-form').find('ion-select[name="level"]').contains('PhD');

    cy.get('.register-form').get('input[aria-label="Enter your interests"]').type('software');
    cy.wait(1000);
    cy.get('ng2-dropdown-menu').get('ng2-menu-item:first').get('div[role="button"]').click();
    cy.get('.register-form').get('tag-input').get('div[title="Software engineering"]').contains('Software engineering');

    cy.get('.register-form').find('textarea[name="bio"]').type('Good Game').should('have.value', 'Good Game');

    cy.get('[data-test=submit-button]').click();

    cy.get('ion-alert').get('h2').contains('Error');
    cy.get('ion-alert').get('h3').contains('Passwords must be the same.');
  });

});

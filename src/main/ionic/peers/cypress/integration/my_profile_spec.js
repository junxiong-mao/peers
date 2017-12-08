describe('My Profile Page', function () {
  beforeEach(function () {
    cy.resetScenariosToDefaults();
    cy.visit('http://localhost:8100')
  });

  after(function () {
    cy.resetScenariosToDefaults();
  });

  it('My profile page is displayed correctly', function () {
    //Given the user is logged in

    //When
    cy.get('.buttons')
      .get('[data-test=menuButton]').click();

    cy.wait(500); // give the side menu enough time to fully expand

    cy.get('ion-menu')
      .get('[data-test=profileButton]').click();

    //Then
    var profile = cy.get('ion-card');

    profile.get('ion-item:nth-child(1)')
      .get('h1:nth-child(1)')
      .should('contain', 'John Doe');

    profile.get('ion-item:nth-child(1)')
      .get('h2:nth-child(2)')
      .should('contain', 'phd, Computer Science');

    profile.get('ion-item:nth-child(2)')
      .get('h2:nth-child(1)')
      .should('contain', 'Interests');

    profile.get('ion-item:nth-child(2)')
      .get('p:nth-child(2)')
      .should('contain', 'Machine Learning,AI');

    profile.get('ion-item:nth-child(2)')
      .get('h2:nth-child(3)')
      .should('contain', 'Biography');

    profile.get('ion-item:nth-child(2)')
      .get('p:nth-child(4)')
      .should('contain', 'I like turtles.');

    profile.get('ion-item:nth-child(2)')
      .get('h2:nth-child(5)')
      .should('contain', 'Email');

    profile.get('ion-item:nth-child(2)')
      .get('p:nth-child(6)')
      .should('contain', 'email@ucsd.edu');

  });

});

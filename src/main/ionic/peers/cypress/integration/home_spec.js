describe('Home Page', function () {
  beforeEach(function () {
    cy.resetScenariosToDefaults();
    cy.visit('http://localhost:8100')
    cy.wait(500);
  });

  after(function () {
    cy.resetScenariosToDefaults();
  });

  it('Home Page is displayed correctly', function () {
    //Given

    //When
    cy.wait(3000);

    //Then
    cy.get('.toolbar-title')
      .should('contain', 'Home');

    var card = cy.get('card');

    card.get('ion-row:nth-child(1)')
      .should('contain', 'Level');

    card.get('[data-test=level]')
      .should('contain', 'PhD');

    card.get('ion-row:nth-child(3)')
      .should('contain', 'Major');

    card.get('[data-test=major]')
      .should('contain', 'Computer Science');

    card.get('.back h2')
      .should('contain', 'Biography')

    card.get('.back h3')
      .should('contain', 'I like Machine Learning because it\'s cool')

    var buttons = cy.get('.buttons');
    buttons.get('[data-test=passButton]').should('contain', 'Pass');
    buttons.get('[data-test=likeButton]').should('contain', 'Like');

  });

  context('Rejecting cards', function () {

    it('Successfully reject a card with PASS button', function () {
      //Given
      cy.get('card').get('[data-test=level]')
        .should('contain', 'PhD');

      //When
      cy.get('.buttons')
        .get('[data-test=passButton]').click();

      //Then
      cy.get('card').get('[data-test=level]')
        .should('contain', 'MS');
    });

    it('Receive error from backend after rejecting a card with PASS button', function () {
      //Given
      cy.selectScenario('postDecision', 'error');

      cy.get('card').get('[data-test=level]')
        .should('contain', 'PhD');

      //When
      cy.get('.buttons')
        .get('[data-test=passButton]').click();

      //Then
      cy.get('.toast-message')
        .should('contain', 'Oops, something went wrong. Please try again later.')
    });

    // it('Successfully reject a card by swiping', function () {
    //   //Given
    //   cy.get('card').get('[data-test=level]')
    //     .should('contain', 'PhD');
    //
    //   //When
    //   cy.get('.flip-container')
    //     .trigger('mousedown')
    //     .trigger('mousemove', {clientX: -500, clientY: 0})
    //     .trigger('mouseup');
    //
    //   //Then
    //   cy.get('card').get('[data-test=level]')
    //     .should('contain', 'MS');
    // });
  });


  context('Liking cards', function () {

    it('Successfully like a card with LIKE button and no match', function () {
      //Given
      cy.selectScenario('postDecision', 'noMatch');

      cy.get('card').get('[data-test=level]')
        .should('contain', 'PhD');

      //When
      cy.get('.buttons')
        .get('[data-test=likeButton]').click();

      //Then
      cy.get('card').get('[data-test=level]')
        .should('contain', 'MS');
    });

    it('Successfully like a card with LIKE button and receiving a match', function () {
      //Given
      cy.selectScenario('postDecision', 'match');

      cy.get('card').get('[data-test=level]')
        .should('contain', 'PhD');
      cy.contains('You have a match!').should('not.be.visible');
      cy.contains('John Doe').should('not.be.visible');

      //When
      cy.get('.buttons')
        .get('[data-test=likeButton]').click();

      //Then
      cy.contains('You have a match!').should('be.visible');

      var message = cy.get('.alert-message');
      cy.contains('John Doe').should('be.visible');
      message.get('.alert-message > b:nth-child(3)')
        .should('contain', 'Major');
      message.get('.major').should('contain', 'Computer Science');
      message.get('.level').should('contain', 'phd');
      message.get('.interests').should('contain', 'Machine Learning,AI');

      cy.get('.alert-button-group').contains('Send Email');
      cy.get('.alert-button-group').contains('OK').click();
      cy.contains('You have a match!').should('not.be.visible');

      cy.get('card').get('[data-test=level]')
        .should('contain', 'MS');
    });

    it('Receive error from backend after liking a card with LIKE button', function () {
      //Given
      cy.selectScenario('postDecision', 'error');

      cy.get('card').get('[data-test=level]')
        .should('contain', 'PhD');

      //When
      cy.get('.buttons')
        .get('[data-test=likeButton]').click();

      //Then
      cy.get('.toast-message')
        .should('contain', 'Oops, something went wrong. Please try again later.')
    });

    // it('Successfully like a card by swiping', function () {
    //   //Given
    //   cy.get('card').get('[data-test=level]')
    //     .should('contain', 'PhD');
    //
    //   //When
    //   cy.get('.flip-container')
    //     .trigger('mousedown')
    //     .trigger('mousemove', {clientX: 500000, clientY: 0})
    //     .trigger('mouseup');
    //
    //   //Then
    //   cy.get('card').get('[data-test=level]')
    //     .should('contain', 'MS');
    // });
  });


  it('User is routed to login page after receiving 401', function () {
    // Given
    cy.selectScenario("getCurrentUser", "noLoggedInUser");
    cy.selectScenario('postDecision', 'unauthenticated');

    cy.get('ion-header').should('contain', 'Home');
    cy.get('card').get('[data-test=level]')
      .should('contain', 'PhD');

    //When
    cy.get('.buttons')
      .get('[data-test=passButton]').click();

    // Then
    cy.get('body').should('contain', 'Login');
  });
});

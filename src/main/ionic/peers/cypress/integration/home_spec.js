describe('Home Page', function () {
  beforeEach(function () {
    cy.resetScenariosToDefaults();
    cy.visit('http://localhost:8100')
  });

  after(function () {
    cy.resetScenariosToDefaults();
  });

  it('Home Page is displayed correctly', function () {
    //Given

    //When

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
    buttons.get('ion-col:nth-child(1) button[color=danger]').should('contain', 'Pass');
    buttons.get('ion-col:nth-child(2) button[color=secondary]').should('contain', 'Like');

  });

  context('Liking and rejecting cards', function () {

    it('Successfully reject a card with PASS button', function () {
      //Given
      cy.get('card').get('[data-test=level]')
        .should('contain', 'PhD');

      //When
      cy.get('.buttons')
        .get('ion-col:nth-child(1) button[color=danger]').click();

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
        .get('ion-col:nth-child(1) button[color=danger]').click();

      //Then
      //TODO: check for error message

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
});

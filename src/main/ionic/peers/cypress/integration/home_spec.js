describe('My First Test', function () {
  it('Visits the Home Page', function () {
    cy.visit('http://localhost:8100');

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
    beforeEach(function () {
      cy.visit('http://localhost:8100')
    });

    it('Successfully reject a card with button', function () {
      cy.get('card').get('[data-test=level]')
        .should('contain', 'PhD');

      cy.get('.buttons')
        .get('ion-col:nth-child(1) button[color=danger]').click();

      cy.get('card').get('[data-test=level]')
        .should('contain', 'MS');
    });

    // it('Successfully reject a card by swiping', function () {
    //   cy.get('card').get('[data-test=level]')
    //     .should('contain', 'PhD');
    //
    //   cy.get('.flip-container')
    //     .trigger('mousedown')
    //     .trigger('mousemove', {clientX: -500, clientY: 0})
    //     .trigger('mouseup');
    //
    //   cy.get('card').get('[data-test=level]')
    //     .should('contain', 'MS');
    // });
  });
});

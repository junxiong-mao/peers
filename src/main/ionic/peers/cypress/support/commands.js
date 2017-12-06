// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("selectScenario", function (identifier, scenario) {
  cy.request("PUT", 'http://localhost:8101/ngapimock/mocks', JSON.stringify({
    identifier: identifier,
    scenario: scenario
  }))
});

Cypress.Commands.add("resetScenariosToDefaults", function () {
  cy.request("PUT", 'http://localhost:8101/ngapimock/mocks/defaults', null);
});

Cypress.Commands.add("getScenario", function (identifier, scenario) {
  cy.request("GET", 'http://localhost:8101/mocking/api/testing/current-user').then(function(res) {
    expect(res.body).to.eq(scenario);
  })
})

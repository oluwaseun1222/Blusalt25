
// ***********************************************
// Visit https://on.cypress.io/custom-commands to
// learn more about custom commands.
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitWithDialogStubs', (url, promptReturn = 'My custom value') => {
  cy.visit(url, {
    onBeforeLoad(win) {
      cy.stub(win, 'alert').as('alertStub');
      cy.stub(win, 'confirm').callsFake(() => true).as('confirmStub');
      cy.stub(win, 'prompt').returns(promptReturn).as('promptStub');
    }
  });
});



import 'cypress-file-upload'

// Helper: get the iframe's document
Cypress.Commands.add('getIframeDocument', (iframeSelector = 'iframe') => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument')
    .should('exist');
});

// Helper: get the iframe's body wrapped so you can use cy.* commands
Cypress.Commands.add('getIframeBody', (iframeSelector = 'iframe') => {
  return cy.getIframeDocument(iframeSelector)
    .its('body').should('not.be.undefined')
    .then(cy.wrap);
});
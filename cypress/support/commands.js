// Logs in via API and returns the auth token (used to bypass the UI when login isn't the test's focus)
Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request('POST', `${Cypress.env('apiUrl')}/login`, { email, password });
});

// Creates a user via API — used to set up test data before E2E flows that require a logged-in user
Cypress.Commands.add('apiCreateUser', (user) => {
  return cy.request('POST', `${Cypress.env('apiUrl')}/usuarios`, user);
});
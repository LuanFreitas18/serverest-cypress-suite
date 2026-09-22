// Logs in via API and returns the auth token (used to bypass the UI when login isn't the test's focus)
Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request('POST', `${Cypress.expose('apiUrl')}/login`, { email, password });
});

// Creates a user via API — used to set up test data before E2E flows that require a logged-in user
Cypress.Commands.add('apiCreateUser', (user, failOnStatusCode = true) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.expose('apiUrl')}/usuarios`,
    body: user,
    failOnStatusCode,
  });
});

// Creates a product via API — requires an admin auth token
Cypress.Commands.add('apiCreateProduct', (product, token) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.expose('apiUrl')}/produtos`,
    body: product,
    headers: { Authorization: token },
  });
});
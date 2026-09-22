// cypress/e2e/frontend/product-search.cy.js
import { faker } from '@faker-js/faker';
import adminUser from '../../fixtures/adminUser.json';
import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';

describe('Frontend - Product Search', () => {
  let uniqueProductName;
  let clientUser;

  before(() => {
    // Creates a product with a unique name via API (requires admin auth),
    // so the search result is deterministic and avoids flakiness from the shared ServeRest database
    uniqueProductName = `Test Product ${faker.string.uuid()}`;

    cy.apiCreateUser(adminUser, false);
    cy.apiLogin(adminUser.email, adminUser.password).then((loginResponse) => {
      const token = loginResponse.body.authorization;

      cy.apiCreateProduct(
        {
          nome: uniqueProductName,
          preco: 100,
          descricao: 'Product created for frontend search test',
          quantidade: 10,
        },
        token
      ).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    // Creates a separate, non-admin user — the search bar only exists on the client home page (/home),
    // while admin users are redirected to /admin/home
    clientUser = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Password123',
      administrador: 'false',
    };

    cy.apiCreateUser(clientUser).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('should filter products by name and display only the matching product', () => {
    // Logs in as the client user through the UI so the browser session is authenticated
    LoginPage.login(clientUser.email, clientUser.password);
    HomePage.searchProduct(uniqueProductName);

    cy.contains(uniqueProductName).should('be.visible');
  });
});
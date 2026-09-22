import { faker } from '@faker-js/faker';
import adminUser from '../../fixtures/adminUser.json';

describe('API - Products', () => {
  it('should list all products with a valid response structure', () => {
    cy.request('GET', `${Cypress.expose('apiUrl')}/produtos`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body.produtos).to.be.an('array').and.not.be.empty;

      const product = response.body.produtos[0];
      expect(product).to.include.keys('nome', 'preco', 'descricao', 'quantidade', '_id');
      expect(product.preco).to.be.a('number');
    });
  });

  it('should filter products by name and return only matching results', () => {
    const uniqueProductName = `Test Product ${faker.string.uuid()}`;

    // Ensures the admin user exists, then logs in to get an auth token
    cy.apiCreateUser(adminUser, false);
    cy.apiLogin(adminUser.email, adminUser.password).then((loginResponse) => {
      const token = loginResponse.body.authorization;

      // Creates a product with a known, unique name so the filter has a guaranteed match
      cy.apiCreateProduct(
        {
          nome: uniqueProductName,
          preco: 100,
          descricao: 'Product created for filter test',
          quantidade: 10,
        },
        token
      ).then((createResponse) => {
        expect(createResponse.status).to.eq(201);
      });

      // Filters by the unique name and validates the response
      cy.request({
        method: 'GET',
        url: `${Cypress.expose('apiUrl')}/produtos`,
        qs: { nome: uniqueProductName },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.produtos).to.have.length(1);
        expect(response.body.produtos[0].nome).to.eq(uniqueProductName);
      });
    });
  });
});
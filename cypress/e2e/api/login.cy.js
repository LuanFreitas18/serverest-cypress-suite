import { faker } from '@faker-js/faker';

describe('API - Login', () => {
  let testUser;

  before(() => {
    // Creates a fresh user before running the login tests,
    // so the test doesn't depend on any pre-existing account
    testUser = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Password123',
      administrador: 'true',
    };

    cy.apiCreateUser(testUser).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('should log in successfully with valid credentials', () => {
    cy.apiLogin(testUser.email, testUser.password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
      expect(response.body.authorization).to.match(/^Bearer\s.+/);
    });
  });
});
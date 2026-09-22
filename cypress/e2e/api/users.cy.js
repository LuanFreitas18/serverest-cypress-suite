import { faker } from '@faker-js/faker';

describe('API - Users', () => {
  it('should return an error when registering a user with an email that already exists', () => {
    const user = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Password123',
      administrador: 'true',
    };

    // First registration should succeed
    cy.apiCreateUser(user).then((response) => {
      expect(response.status).to.eq(201);
    });

    // Second registration with the same email should fail
    cy.apiCreateUser(user, false).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Este email já está sendo usado');
    });
  });
});
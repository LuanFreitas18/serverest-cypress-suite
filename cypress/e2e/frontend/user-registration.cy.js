import { faker } from '@faker-js/faker';
import RegistrationPage from '../../support/pages/RegistrationPage';

describe('Frontend - User Registration', () => {
  it('should register a new user successfully', () => {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Password123',
    };

    RegistrationPage.register(newUser);


    cy.url().should('include', '/home');
    cy.contains('Serverest Store').should('be.visible');
    cy.get('[data-testid="logout"]').should('be.visible');
  });
});
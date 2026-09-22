import LoginPage from '../../support/pages/LoginPage';

describe('Frontend - Login', () => {
  it('should show an error message when logging in with invalid credentials', () => {
    LoginPage.login('invalid.user@example.com', 'WrongPassword123');

    cy.contains('Email e/ou senha inválidos').should('be.visible');
    cy.url().should('include', '/login');
  });
});
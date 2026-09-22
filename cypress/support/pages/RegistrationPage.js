class RegistrationPage {
  visit() {
    cy.visit('/cadastrarusuarios');
  }

  fillName(name) {
    cy.get('[data-testid="nome"]').type(name);
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').type(email);
  }

  fillPassword(password) {
    cy.get('[data-testid="password"]').type(password);
  }

  checkAdmin() {
    cy.get('[data-testid="checkbox"]').check();
  }

  submit() {
    cy.get('[data-testid="cadastrar"]').click();
  }

  register({ name, email, password, isAdmin = false }) {
    this.visit();
    this.fillName(name);
    this.fillEmail(email);
    this.fillPassword(password);
    if (isAdmin) this.checkAdmin();
    this.submit();
  }
}

export default new RegistrationPage();
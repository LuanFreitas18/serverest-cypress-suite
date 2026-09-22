class HomePage {
  visit() {
    cy.visit('/home');
  }

  searchProduct(term) {
    cy.get('input[placeholder="Pesquisar Produtos"]').type(term);
    cy.contains('Pesquisar').click();
  }
}

export default new HomePage();
describe('login scene', () => {
  beforeEach(() => {
    cy.visit('/#/login');
  });

  it('should show required validation messages', () => {
    // Act
    cy.contains('button', 'Login').click();

    // Assert
    cy.contains('Debe informar el campo').should('be.visible');
    cy.get('input[name="user"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
  });

  it('should navigate to submodule list when login is valid', () => {
    // Act
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');
    cy.contains('button', 'Login').click();

    // Assert
    cy.location('hash', { timeout: 5000 }).should('eq', '#/submodule-list');
    cy.contains('Proyectos').should('be.visible');
    cy.contains('Empleados').should('be.visible');
  });
});

/* 
This is a basic test to show you how cypress works (and how easy it is to build tests!)
It will launch the homepage and navigate through 2 differents pages (Pricing and Contact). 
You can see that it will do this twice, with 2 different resolution, to test the mobile version of the site.
*/

describe('Basic Test', () => {
  context('Desktop resolution', () => {
    it('Visits the homepage and nav links (Desktop)', () => {
      cy.viewport(1280, 720);
      cy.visit('');

      cy.get('nav').contains('Pricing').click();
      cy.url().should('include', '/pricing');

      cy.get('nav').contains('Contact').click();
      cy.url().should('include', '/contact');

      cy.get('nav').contains('Login').click();
      cy.url().should('include', '/login');

      cy.get('nav').contains('Sign Up').click();
      cy.url().should('include', '/signup');
    });
  });

  context('Mobile resolution', () => {
    it('Visits the homepage and nav links (Mobile)', () => {
      cy.viewport(680, 720);
      cy.visit('');

      cy.get('[data-cy=dropdown]').click();
      cy.get('[data-cy=dropdown]').contains('Pricing').click();
      cy.url().should('include', '/pricing');

      cy.get('[data-cy=dropdown]').click();
      cy.get('[data-cy=dropdown]').contains('Login').click();
      cy.url().should('include', '/login');

      cy.get('[data-cy=dropdown]').click();
      cy.get('[data-cy=dropdown]').contains('Sign Up').click();
      cy.url().should('include', '/signup');

      cy.get('[data-cy=dropdown]').click();
      cy.get('[data-cy=dropdown]').contains('Contact').click();
      cy.url().should('include', '/contact');
    });
  });
});

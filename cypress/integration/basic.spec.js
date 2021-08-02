describe('Homepage Test', () => {
    it('Visits the homepage', () => {
      cy.visit('')
    })
    it('Visits the pricing page', () => {
        cy.visit('/pricing')
    })
  })
  
describe('Build Your Own Page', () => {
  it('renders successfully', () => {
    cy.visit('/build-your-own')
    cy.get('h1').should('contain', 'Build Your Own')
  })
})

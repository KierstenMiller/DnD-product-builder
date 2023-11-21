describe('Singleton Workflow', () => {
  beforeEach(() => {
    cy.visit('/build-your-own/singleton')
  })
  it('should render the singleton page as expected', () => {
    cy.contains('h1', 'Build Your Own')
    cy.contains('h2', 'Current Selections')
    cy.get('[data-testid$="-selection-group"]').should('have.length', 5)
  })
  it('all selections should display NA and nothing should be selected in modifier options', () => {
    cy.getByTestId('selection-value')
      .each(($el, index) => {
        cy.wrap($el).contains('NA')
      })
  })
  it('should update current selections when new selections are made', () => {
    const mods = [
      { mod: 'mod-A', group: 'modifier-a-height_mod-A_8_optionA_8-8-8_3D', input: 'optionA_8-8-8_3D' },
      { mod: 'mod-B', group: 'modifier-b-stocked_mod-B_stocked-false_optionA_8-2-2_3D-stocked', input: 'optionA_8-2-2_3D-stocked' },
      { mod: 'mod-C', group: 'modifier-c-price_mod-C_500_optionC_8-16_500_2D-Priced', input: 'optionC_8-16_500_2D-Priced' },
      { mod: 'mod-D', group: 'modifier-d-width_mod-D_2_optionA_8-2-2_3D-stocked-priced', input: 'optionA_8-2-2_3D-stocked-priced' },
      { mod: 'mod-E', group: 'modifier-e-height_mod-E_16_optionA_16-2_2D', input: 'optionA_16-2_2D' }
    ]
    cy.testChangingSelections(mods)
  })
})

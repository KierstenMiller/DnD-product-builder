describe('Singleton Robots Workflow', () => {
  const expectedDefaultSelections = [
    { mod: 'mod-classification', group: 'classification-height_mod-classification_1_BMO', input: 'BMO' },
    { mod: 'mod-color', group: 'color_blue', input: 'blue' },
    { mod: 'mod-supports', group: 'supports_legs', input: 'legs' },
    { mod: 'mod-personality', group: 'personality_default', input: 'default' }
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/singleton/robots')
  })
  it('should render the singleton Robots page as expected', () => {
    cy.contains('h1', 'Build Your Own')
    cy.get('[data-testid$="-selection-group"]').should('have.length', 4)
  })
  it('default selections should be selected on page load', () => {
    cy.testCurrentSelections(expectedDefaultSelections)
  })
  it('should update current selections when new selections are made', () => {
    const newSelections = [
      { mod: 'mod-classification', group: 'classification-height_mod-classification_2_TRIG', input: 'TRIG' },
      { mod: 'mod-color', group: 'color_red', input: 'red' },
      { mod: 'mod-supports', group: 'supports_none', input: 'none' },
      { mod: 'mod-personality', group: 'personality_smart', input: 'smart' }
    ]
    cy.testChangingSelections(newSelections, expectedDefaultSelections)
  })
})

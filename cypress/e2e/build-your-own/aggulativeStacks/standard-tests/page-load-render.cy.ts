import { verifyWorkspace } from '../verfiy.util'
import { defaultModifierState, defaultWorkspace, newModifierState } from './shared-data.util'

describe('Aggulative Workflow', () => {
  beforeEach(() => {
    cy.visit('/build-your-own/aggulative')
  })
  it('should render the aggulative page as expected', () => {
    cy.contains('h1', 'Build Your Own')
    cy.contains('h2', 'Current Selections')
    cy.get('[data-testid$="-selection-group"]').should('have.length', 3)
  })
  it('should be displaying default selections on page load', () => {
    cy.testCurrentSelections(defaultModifierState)
  })
  it('should update current selections when new selections are made', () => {
    cy.testChangingSelections(newModifierState, defaultModifierState)
  })
  it('should have rendered the defalt workspace as expected', () => {
    verifyWorkspace({ stacksConfig: defaultWorkspace, modifiers: defaultModifierState })
  })
})

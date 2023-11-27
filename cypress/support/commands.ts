// @ts-check
/// <reference path="../global.d.ts" />

import { DndSimulatorDataTransfer } from './util/DnD-test.util'

export interface testModifierI {
  mod: string
  group: string
  input: string
}
export type testModifiersT = testModifierI[]

Cypress.Commands.add('getByTestId', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('getByTestIdLike', (selector, ...args) => {
  return cy.get(`[data-testid*=${selector}]`, ...args)
})

// solution from: https://github.com/cypress-io/cypress/issues/1752
Cypress.Commands.add('drag', { prevSubject: 'element' }, (sourceSelector, targetSelector, skipCleanup) => {
  const dataTransfer = new DndSimulatorDataTransfer()
  cy.wrap(sourceSelector.get(0))
    .trigger('mousedown', { which: 1 })
    .trigger('dragstart', { dataTransfer })
    .trigger('drag', {})
  cy.getByTestId(targetSelector)
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer })
    .then(el => {
      if (!skipCleanup) {
        cy.wrap(el)
          .trigger('dragend', { dataTransfer })
          .trigger('mouseup', { which: 1 })
      }
    })
})

Cypress.Commands.add('toggleModifier', ({ modId, isOpen }: { modId: string, isOpen?: boolean }) => {
  cy.getByTestId(`${modId}-modifier`)
    .find('button')
    .invoke('attr', 'aria-expanded')
    .then((ariaExpanded) => {
      const booleanAriaExpanded = ariaExpanded === 'true'
      if (booleanAriaExpanded === isOpen) return
      cy.getByTestId(`${modId}-modifier`)
        .find(`button#${modId}`)
        .should('exist') // need to retry until button is rendered and event handlers are attached https://www.cypress.io/blog/2019/01/22/when-can-the-test-click
        .click()
      cy.getByTestId(`${modId}-modifier`)
        .find('button')
        .invoke('attr', 'aria-expanded')
        .should('not.eq', ariaExpanded)
    })
})

Cypress.Commands.add('changeSelections', (modifiers: testModifiersT) => {
  modifiers.forEach(m => {
    // open [i] modifier accordion
    cy.toggleModifier({ modId: m.mod, isOpen: true })
    // click on the mirage to check the input
    cy.getByTestId(m.group).find('[data-testid="mirage-container"]').click()
    // make sure NEW input is now checked
    cy.getByTestId(m.group).find(`#${m.input}`).should('to.have.attr', 'checked')
    // close the modifier accordion we just tested
    cy.toggleModifier({ modId: m.mod, isOpen: false })
  })
})

Cypress.Commands.add('testChangingSelections', (modifiers: testModifiersT, defaultValues?: testModifiersT) => {
  const updatedInputs: string[] = []
  // STEP 0: if default values provided, make sure state is of ui matches
  defaultValues && cy.testCurrentSelections(defaultValues)
  // STEP 1: change selections and confirm "Current Selections" section is correct after each change
  modifiers.forEach(m => {
    // open [i] modifier accordion
    cy.getByTestId(`${m.mod}-modifier`).find(`button#${m.mod}`).click()
    // make sure NEW input selection is not yet checked
    cy.getByTestId(m.group).find(`#${m.input}`).should('to.not.have.attr', 'checked')
    // click on the mirage to check the input
    cy.getByTestId(m.group).find('[data-testid="mirage-container"]').click()
    // make sure NEW input is now checked
    cy.getByTestId(m.group).find(`#${m.input}`).should('to.have.attr', 'checked')
    // update updatedInputs array
    updatedInputs.push(m.input)
    // test "Current Selections" section (making sure between updates values are still correct)
    modifiers.forEach((m2, i2) => {
      const expectedValue = updatedInputs[i2] ?? defaultValues?.[i2].input ?? 'NA'
      cy.getByTestId(`${m2.mod}-selection-group`).find('[data-testid="selection-value"]').contains(expectedValue)
    })
    // close the modifier accordion we just tested
    cy.getByTestId(`${m.mod}-modifier`).find(`button#${m.mod}`).click()
  })
  // STEP 2: double check all current selections are correct
  cy.testCurrentSelections(modifiers)
})
Cypress.Commands.add('testCurrentSelections', (modifiers: Array<{ mod: string, group: string, input: string }>) => {
  // STEP 1: confirm "Current Selections" section is correct
  modifiers.forEach(m => {
    cy.getByTestId(`${m.mod}-selection-group`).find('[data-testid="selection-value"]').contains(m.input)
  })
  // STEP 2: confirm all inputs reflect default state
  modifiers.forEach(m => {
    // open a modifier accordion
    cy.getByTestId(`${m.mod}-modifier`).find(`button#${m.mod}`).click()
    // make sure selected input is checked
    cy.getByTestId(m.group).find(`#${m.input}`).should('to.have.attr', 'checked')
    // close the modifier accordion we just tested
    cy.getByTestId(`${m.mod}-modifier`).find(`button#${m.mod}`).click()
  })
})
// TODO: make this work
// Cypress.Commands.add('findByTestId', { prevSubject: true }, (subject, id) => {
//   return subject.find(`[data-cy=${id}]`)
// })

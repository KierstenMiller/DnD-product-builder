import { dragDropNewBlock, dragNewBlock } from './drag-drop.util'
import { verifyWorkspace } from './verfiy.util'

describe('Aggulative Rental Workflow', () => {
  const uniqueKey = 'blocks'
  const simpleEntry = { uniqueKey, uniqueValue: 'simple-entry' }
  const amenityGym = { uniqueKey, uniqueValue: 'amenity-gym' }
  const amenityCafe = { uniqueKey, uniqueValue: 'amenity-cafe' }
  const apartmentSingleStudio = { uniqueKey, uniqueValue: 'apartment-single-studio' }
  const defaultWorkspace = [
    [{ ...simpleEntry, index: 0 }, { ...amenityGym, index: 1 }, { ...amenityCafe, index: 2 }],
    [{ ...simpleEntry, index: 0 }],
    [{ ...simpleEntry, index: 0 }],
    [{ ...simpleEntry, index: 0 }, { ...apartmentSingleStudio, index: 1 }, { ...amenityCafe, index: 2 }]
  ]
  const defaultModifierState = [
    { mod: 'mod-fill', group: 'fill-color_fill-light-red', input: 'fill-light-red' },
    { mod: 'mod-stroke', group: 'stroke-color_stroke-red', input: 'stroke-red' }
  ]
  const newModifierState = [
    { mod: 'mod-fill', group: 'fill-color_fill-blue', input: 'fill-blue' },
    { mod: 'mod-stroke', group: 'stroke-color_stroke-blue', input: 'stroke-blue' }
  ]
  const newerModifierState = [
    { mod: 'mod-fill', group: 'fill-color_fill-green', input: 'fill-green' },
    { mod: 'mod-stroke', group: 'stroke-color_stroke-red', input: 'stroke-red' }
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/aggulative/rental')
  })
  it('should render the singleton page as expected', () => {
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
  it('should only allow for 6 stacks', () => {
    dragDropNewBlock({ ...simpleEntry, modifiers: defaultModifierState, direction: 'left', landmarkId: '0' }) // 5th stack
    dragDropNewBlock({ ...simpleEntry, modifiers: defaultModifierState, direction: 'right', landmarkId: '0' }) // 6th stack
    dragNewBlock({ ...simpleEntry })
    cy.get('[data-testid^="stack-container_"]').should('have.length', 6)
    cy.get('[data-testid^="block-container_"]').should('have.length', 10)
    cy.get('[data-testid="dropzone_"]').should('have.length', 0) // there should be no dropzones
  })
  it.only('should only allow for 8 blocks per stack', () => {
    dragDropNewBlock({ ...apartmentSingleStudio, modifiers: defaultModifierState, direction: 'below', landmarkId: 'rental-piece-1' }) // 4th stack
    dragDropNewBlock({ ...apartmentSingleStudio, modifiers: defaultModifierState, direction: 'below', landmarkId: 'rental-piece-2' }) // 5th stack
    dragDropNewBlock({ ...apartmentSingleStudio, modifiers: defaultModifierState, direction: 'below', landmarkId: 'rental-piece-3' }) // 6th stack
    dragDropNewBlock({ ...apartmentSingleStudio, modifiers: defaultModifierState, direction: 'below', landmarkId: 'rental-piece-3' }) // 7th stack
    dragDropNewBlock({ ...apartmentSingleStudio, modifiers: defaultModifierState, direction: 'below', landmarkId: 'rental-piece-3' }) // 8th stack
    dragNewBlock({ ...apartmentSingleStudio })
    cy.get('[data-testid^="stack-container_"]').should('have.length', 4)
    cy.get('[data-testid^="block-container_"]').should('have.length', 13)
    cy.getByTestId('stack-container_0').find('[data-testid^="block-container_"]').should('have.length', 8)
    cy.getByTestId('stack-container_0').find('[data-testid="dropzone_"]').should('have.length', 0) // there should be no dropzones in stack 0
  })
  it('should only allow dropping a ENTRY block on a new stack. Other block types cannot create a new stack', () => {})
  it('should allow APARTMENTS to be dropped anywhere in a stack (except level 0 - entry level)', () => {})
  it('should allow AMENITY-CAFE to be dropped anywhere (except level 0 - entry level)', () => {})
  it('should allow AMENITY-GYM to be dropped anywhere (except level 0 - entry level)', () => {})
  it('should only alllow AMENITY-POOL to be dropped on level 1', () => {})
  it('should only allow AMENITY-OBSERVATORY on level 4, 5, 6, 7, and 8', () => {})
  it('should only allow AMENITY-LOCKER to be dropped if all conditions are met: 1: stack has a AMENITY-GYM 2: it is being placed directly next to a AMENITY-GYM, 3: it is being placed on a valid level (1-5)', () => {})
  it('should only allow AMENITY-KITCHEN to be dropped if all conditions are met: 1: stack has a AMENITY-CAFE and a AMENITY-DINNING, 2: it is being placed directly next to a AMENITY-DINNING, 3: it is being place on a valid level (1-8)', () => {})
  // should be able to drag blocks in the stacks
})

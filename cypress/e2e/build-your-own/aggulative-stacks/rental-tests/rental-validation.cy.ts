import { directions as dirs, dragDropNewBlock, dragNewBlock, type DragNewBlockI } from '~/e2e/build-your-own/aggulative-stacks/drag-drop.util'
import { verifyWorkspace } from '~/e2e/build-your-own/aggulative-stacks/verfiy.util'

describe('Aggulative Rental Workflow', () => {
  const newStackRegex = /^dropzone_[0-9]-(left|right)$/
  const newBlockRegex = /^dropzone_rental-piece-[0-9]-(above|below)$/

  const modId = 'blocks'
  const simpleEntry = { modId, value: 'simple-entry' }
  const fancyEntry = { modId, value: 'fancy-entry' }
  const raisedEntry = { modId, value: 'raised-entry' }
  const apartmentSingleStudio = { modId, value: 'apartment-single-studio' }
  const apartmentDoubleStudio = { modId, value: 'apartment-double-studio' }
  const apartmentSingleOne = { modId, value: 'apartment-single-one' }
  const apartmentDoubleOne = { modId, value: 'apartment-double-one' }
  const amenityPool = { modId, value: 'amenity-pool' }
  const amenityObservatory = { modId, value: 'amenity-observatory' }
  const amenityCafe = { modId, value: 'amenity-cafe' }
  const amenityDinning = { modId, value: 'amenity-dinning' }
  const amenityKitchen = { modId, value: 'amenity-kitchen' }
  const amenityGym = { modId, value: 'amenity-gym' }
  const amenityLocker = { modId, value: 'amenity-locker' }

  const defaultWorkspace = [
    [{ ...simpleEntry, index: 0 }, { ...amenityGym, index: 1 }, { ...amenityCafe, index: 2 }],
    [{ ...simpleEntry, index: 0 }],
    [{ ...simpleEntry, index: 0 }],
    [{ ...simpleEntry, index: 0 }, { ...amenityCafe, index: 1 }, { ...amenityDinning, index: 2 }]
  ]
  const defaultModifierState = [
    { mod: 'mod-fill', group: 'fill-color_fill-light-red', input: 'fill-light-red' },
    { mod: 'mod-stroke', group: 'stroke-color_stroke-red', input: 'stroke-red' }
  ]
  const newModifierState = [
    { mod: 'mod-fill', group: 'fill-color_fill-blue', input: 'fill-blue' },
    { mod: 'mod-stroke', group: 'stroke-color_stroke-blue', input: 'stroke-blue' }
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/aggulative/rental')
  })
  it('should render the aggulative rental page as expected', () => {
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
    dragDropNewBlock({ drag: simpleEntry, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: defaultModifierState } }) // 5th stack
    dragDropNewBlock({ drag: simpleEntry, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: defaultModifierState } }) // 6th stack
    dragNewBlock({ ...simpleEntry })
    cy.get('[data-testid^="stack-container_"]').should('have.length', 6)
    cy.get('[data-testid^="block-container_"]').should('have.length', 10)
    cy.get('[data-testid="dropzone_"]').should('have.length', 0) // there should be no dropzones
  })
  it('should only allow for 8 blocks per stack', () => {
    dragDropNewBlock({ drag: apartmentSingleStudio, drop: { direction: dirs.below, landmarkId: 'rental-piece-1' }, state: { modifiers: defaultModifierState } }) // 4th block
    dragDropNewBlock({ drag: apartmentSingleStudio, drop: { direction: dirs.below, landmarkId: 'rental-piece-2' }, state: { modifiers: defaultModifierState } }) // 4th block
    dragDropNewBlock({ drag: apartmentSingleStudio, drop: { direction: dirs.below, landmarkId: 'rental-piece-3' }, state: { modifiers: defaultModifierState } }) // 4th block
    dragDropNewBlock({ drag: apartmentSingleStudio, drop: { direction: dirs.below, landmarkId: 'rental-piece-3' }, state: { modifiers: defaultModifierState } }) // 4th block
    dragDropNewBlock({ drag: apartmentSingleStudio, drop: { direction: dirs.below, landmarkId: 'rental-piece-3' }, state: { modifiers: defaultModifierState } }) // 4th block
    dragNewBlock({ ...apartmentSingleStudio })
    cy.get('[data-testid^="stack-container_"]').should('have.length', 4)
    cy.get('[data-testid^="block-container_"]').should('have.length', 13)
    cy.getByTestId('stack-container_0').find('[data-testid^="block-container_"]').should('have.length', 8)
    cy.getByTestId('stack-container_0').find('[data-testid="dropzone_"]').should('have.length', 0) // there should be no dropzones in stack 0
  })
  it('should only allow dropping a ENTRY block to create a new stack. Other block types cannot create a new stack', () => {
    const entryBlocks = [{ block: simpleEntry, regex: newStackRegex }, { block: fancyEntry, regex: newStackRegex }, { block: raisedEntry, regex: newStackRegex }]
    const nonEntryBlocks = [{ block: apartmentSingleStudio, regex: newBlockRegex }, { block: apartmentDoubleStudio, regex: newBlockRegex }, { block: apartmentSingleOne, regex: newBlockRegex }, { block: apartmentDoubleOne, regex: newBlockRegex }, { block: amenityPool, regex: newBlockRegex }, { block: amenityObservatory, regex: newBlockRegex }, { block: amenityCafe, regex: newBlockRegex }, { block: amenityDinning, regex: newBlockRegex }, { block: amenityKitchen, regex: newBlockRegex }, { block: amenityGym, regex: newBlockRegex }, { block: amenityLocker, regex: newBlockRegex }]
    cy.wrap([...entryBlocks, ...nonEntryBlocks])
      .each((test: { block: DragNewBlockI, regex: typeof newStackRegex | typeof newBlockRegex }) => { // using Cypress.each() to ensure syncronous execution of tests https://docs.cypress.io/guides/core-concepts/variables-and-aliases
        cy.log(`*** TESTING ${test.block.value} ***`)
        dragNewBlock({ ...test.block })
        cy.get('[data-testid^="dropzone_"]').each((el) => {
          cy.wrap(el).invoke('attr', 'data-testid').should('match', test.regex)
        })
      })
  })
  it('should allow APARTMENTS to be dropped anywhere in a stack (except level 0 - entry level)', () => {
    const apartmentValidDropRegex = /^dropzone_rental-piece-[1-9]-(above|below)$/
    const apartmentBlocks = [apartmentSingleStudio, apartmentDoubleStudio, apartmentSingleOne, apartmentDoubleOne]
    cy.wrap(apartmentBlocks).each((block: DragNewBlockI) => { // using Cypress.each() to ensure syncronous execution of tests https://docs.cypress.io/guides/core-concepts/variables-and-aliases
      cy.log(`*** TESTING ${block.value} ***`)
      dragNewBlock({ ...block })
      cy.get('[data-testid^="dropzone_"]').each((el) => {
        cy.wrap(el).invoke('attr', 'data-testid').should('match', apartmentValidDropRegex)
      })
    })
  })
  it('should allow AMENITY-CAFE to be dropped anywhere (except level 0 - entry level)', () => {
    const cafeValidDropRegex = /^dropzone_rental-piece-[1-9]-(above|below)$/
    dragNewBlock({ ...amenityCafe })
    cy.get('[data-testid^="dropzone_"]').each((el) => {
      cy.wrap(el).invoke('attr', 'data-testid').should('match', cafeValidDropRegex)
    })
  })
  it('should allow AMENITY-GYM to be dropped anywhere (except level 0 - entry level)', () => {
    const gymValidDropRegex = /^dropzone_rental-piece-[1-9]-(above|below)$/
    dragNewBlock({ ...amenityGym })
    cy.get('[data-testid^="dropzone_"]').each((el) => {
      cy.wrap(el).invoke('attr', 'data-testid').should('match', gymValidDropRegex)
    })
  })
  it('should only alllow AMENITY-POOL to be dropped on level 1', () => {
    const poolValidDropRegex = /^dropzone_rental-piece-[1|4|5|6]-below$/
    dragNewBlock({ ...amenityPool })
    cy.get('[data-testid^="dropzone_"]').each((el) => {
      cy.wrap(el).invoke('attr', 'data-testid').should('match', poolValidDropRegex)
    })
  })
  it('should only allow AMENITY-OBSERVATORY on level 3, 4, 5, 6, 7, and 8', () => {
    const observatoryValidDropRegex = /dropzone_rental-piece-[3-8]-below/
    dragNewBlock({ ...amenityObservatory })
    cy.get('[data-testid^="dropzone_"]').each((el) => {
      cy.wrap(el).invoke('attr', 'data-testid').should('match', observatoryValidDropRegex)
    })
  })
  it('should only allow AMENITY-LOCKER to be dropped if all conditions are met: 1: stack has a AMENITY-GYM 2: it is being placed directly next to a AMENITY-GYM, 3: it is being placed on a valid level (1-5)', () => {
    const lockerValidDropRegex = /^dropzone_rental-piece-[1-2]-below$/
    dragNewBlock({ ...amenityLocker })
    cy.get('[data-testid^="dropzone_"]').each((el) => {
      cy.wrap(el).invoke('attr', 'data-testid').should('match', lockerValidDropRegex)
    })
  })
  it('should only allow AMENITY-KITCHEN to be dropped if all conditions are met: 1: stack has a AMENITY-CAFE and a AMENITY-DINNING, 2: it is being placed directly next to a AMENITY-DINNING, 3: it is being place on a valid level (1-8)', () => {
    const kitchenValidDropRegex = /^dropzone_rental-piece-[7-8]-below$/
    dragNewBlock({ ...amenityKitchen })
    cy.get('[data-testid^="dropzone_"]').each((el) => {
      cy.wrap(el).invoke('attr', 'data-testid').should('match', kitchenValidDropRegex)
    })
  })
  // TODO: All above tests but with existing blocks instead of new blocks
  // TODO: Mix up existing and new blocks and test validity of drops after each
})

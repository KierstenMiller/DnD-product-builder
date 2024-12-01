import { type testModifiersT } from '~/support/commands'

const clearDropzone = (dropzone: string) => {
  cy.getByTestId(dropzone).find('button[data-testid="clear"]').click()
  cy.getByTestId(dropzone).find('[data-testid="config"]').should('be.empty')
  cy.getByTestId(dropzone).find('svg').should('not.exist')
  cy.getByTestId(dropzone).find('button[data-testid="clear"]').should('not.exist')
}

const freeformChangeSelections = (modifiers: testModifiersT) => {
  const workspaceValues: string[] = []
  cy.getByTestId('workspace')
    .get('[data-testid^="dropzone_"]')
    .each(el => {
      cy.wrap(el).find('[data-testid="config"]').invoke('text').then(text => {
        workspaceValues.push(text)
      })
    })
  cy.changeSelections(modifiers)
  cy.getByTestId('workspace')
    .get('[data-testid^="dropzone_"]')
    .each((el, i) => {
      cy.wrap(el).find('[data-testid="config"]').invoke('text').then(text => {
        expect(text).to.equal(workspaceValues[i])
      })
    })
}

const dragDropNewShape = ({ drop, modifiers, change = false }: { drop: string, modifiers: testModifiersT, change?: boolean }) => {
  change && freeformChangeSelections(modifiers)
  cy.getByTestId('freeform-dragzone')
    .find('[draggable="true"]')
    .dragDrop(drop)
  cy.getByTestId(drop)
    .find('[data-testid="config"]')
    .should('contain', modifiers[0].input)
    .and('contain', modifiers[1].input)
    .and('contain', modifiers[2].input)
  cy.getByTestId(drop)
    .find('svg')
  cy.getByTestId(drop)
    .find('button')
    .contains('Clear')
}

const dragDropExistingShape = ({ drag, drop }: { drag: string, drop: string }) => {
  cy.getByTestId(drag).find('[data-testid="config"]').then(dragEl => {
    const dragShapeConfig = dragEl.text()
    cy.getByTestId(drop).find('[data-testid="config"]').then(dropEl => {
      const dropShapeConfig = dropEl.text()
      cy.getByTestId(drag).dragDrop(drop)
      cy.getByTestId(drag).find('[data-testid="config"]').should('contain', dropShapeConfig)
      cy.getByTestId(drop).find('[data-testid="config"]').should('contain', dragShapeConfig)
    })
  })
}

describe('Freeform Workflow', () => {
  const expectedDefaultSelections = [
    { mod: 'mod-shape', group: 'shape_square', input: 'square' },
    { mod: 'mod-fill', group: 'fill-color_fill-light-red', input: 'fill-light-red' },
    { mod: 'mod-stroke', group: 'stroke-color_stroke-blue', input: 'stroke-blue' }
  ]
  const newSelections = [
    { mod: 'mod-shape', group: 'shape_triangle', input: 'triangle' },
    { mod: 'mod-fill', group: 'fill-color_fill-blue', input: 'fill-blue' },
    { mod: 'mod-stroke', group: 'stroke-color_stroke-red', input: 'stroke-red' }
  ]
  const newestSelections = [
    { mod: 'mod-shape', group: 'shape_circle', input: 'circle' },
    { mod: 'mod-fill', group: 'fill-color_fill-green', input: 'fill-green' },
    { mod: 'mod-stroke', group: 'stroke-color_stroke-blue', input: 'stroke-blue' }
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/freeform')
  })
  it('should render the singleton Robots page as expected', () => {
    cy.contains('h1', 'Build Your Own')
    cy.contains('h2', 'Current Selections')
    cy.get('[data-testid$="-selection-group"]').should('have.length', 3)
  })
  it('default selections should be selected on page load', () => {
    cy.testCurrentSelections(expectedDefaultSelections)
  })
  it('should update current selections when new selections are made', () => {
    cy.testChangingSelections(newSelections, expectedDefaultSelections)
  })
  it('should allow for default selection to be dragged and dropped, and then clear it', () => {
    dragDropNewShape({ drop: 'dropzone_3-2', modifiers: expectedDefaultSelections })
    clearDropzone('dropzone_3-2')
  })
  it('should allow for new selection to be dragged and dropped into empty spot, and then clear it', () => {
    dragDropNewShape({ drop: 'dropzone_3-2', modifiers: newSelections, change: true })
    clearDropzone('dropzone_3-2')
  })
  it('should allow for new selection to be dragged and dropped into occupied spot. New selection should replace old. Then it should be cleared', () => {
    dragDropNewShape({ drop: 'dropzone_3-0', modifiers: newSelections, change: true })
    clearDropzone('dropzone_3-0')
  })
  it('should allow an existing shape to be dragged and dropped into empty spot, then clear it', () => {
    dragDropExistingShape({ drag: 'dropzone_0-0', drop: 'dropzone_3-2' })
    clearDropzone('dropzone_3-2')
  })
  it('should allow an existing shape to be dragged and dropped into occupied spot. Shapes should be swapped at end of drop. Then both should be cleared ', () => {
    dragDropExistingShape({ drag: 'dropzone_0-0', drop: 'dropzone_3-0' })
    clearDropzone('dropzone_0-0')
    clearDropzone('dropzone_3-0')
  })
  it('should allow for a new selection to be dragged and dropped, then allow another new selection to dropped into another spot, then swap the two, and then drop another new shape', () => {
    dragDropNewShape({ drop: 'dropzone_3-2', modifiers: newSelections, change: true })
    dragDropNewShape({ drop: 'dropzone_2-1', modifiers: newestSelections, change: true })
    dragDropExistingShape({ drag: 'dropzone_3-2', drop: 'dropzone_2-1' })
    dragDropNewShape({ drop: 'dropzone_0-1', modifiers: expectedDefaultSelections, change: true })
  })
})

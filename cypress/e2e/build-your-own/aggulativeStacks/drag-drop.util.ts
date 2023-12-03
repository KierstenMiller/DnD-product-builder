import { type testModifiersT } from '../../../support/commands'

export interface drapDropNewBlockI { height: number, landmarkId: string, direction: 'above' | 'below' | 'left' | 'right', modifiers: testModifiersT, changeSelections?: boolean }
interface relativeDragDropNewBlockI extends drapDropNewBlockI { distance: number }

export const dragDropNewBlock = ({ height, landmarkId, direction, modifiers, changeSelections = false }: drapDropNewBlockI) => {
  const containerSelector = direction === 'above' || direction === 'below' ? 'block-container' : 'stack-container'
  changeSelections && cy.changeSelections(modifiers)
  cy.toggleModifier({ modId: 'mod-height', isOpen: true })
  cy.getByTestId(`dragzone_${height}`).drag(`dropzone_${landmarkId}-${direction}`, true)
  cy.getByTestId(`${containerSelector}_${landmarkId}`).then($el => {
    if (direction === 'left') {
      cy.wrap($el)
        .should('contain', `height: ${height}`).then(() => {
          modifiers.forEach(m => {
            cy.wrap($el).should('contain', `${m.mod}: ${m.input}`)
          })
        })
    } else if (direction === 'above') {
      cy.wrap($el)
        .prev()
        .should('contain', `height: ${height}`).then(() => {
          modifiers.forEach(m => {
            cy.wrap($el).should('contain', `${m.mod}: ${m.input}`)
          })
        })
    } else if (direction === 'below' || direction === 'right') {
      cy.wrap($el)
        .next()
        .should('contain', `height: ${height}`).then(() => {
          modifiers.forEach(m => {
            cy.wrap($el).should('contain', `${m.mod}: ${m.input}`)
          })
        })
    } else {
      console.error('INVALID DIRECTION')
    }
  })
  cy.toggleModifier({ modId: 'mod-height', isOpen: false })
}
export const relativeDragDropNewBlock = ({ height, landmarkId: landmarkPieceId, direction, distance, modifiers, changeSelections = false }: relativeDragDropNewBlockI) => {
  const eqId = distance - 1
  changeSelections && cy.changeSelections(modifiers)
  cy.getByTestId(`block-container_${landmarkPieceId}`).then($el => {
    if (direction === 'above') {
      cy.wrap($el).prevAll().eq(eqId).find("[data-testid^='dragzone_']").invoke('attr', 'data-testid').then(nextPieceId => {
        const targetId = nextPieceId?.replace(/dragzone_/g, '')
        targetId ? dragDropNewBlock({ height, landmarkId: targetId, direction, modifiers, changeSelections }) : console.error('NO NEXT PIECE ID FOUND')
      })
    } else if (direction === 'below') {
      cy.wrap($el).nextAll().eq(eqId).find("[data-testid^='dragzone_']").invoke('attr', 'data-testid').then(nextPieceId => {
        const targetId = nextPieceId?.replace(/dragzone_/g, '')
        targetId ? dragDropNewBlock({ height, landmarkId: targetId, direction, modifiers, changeSelections }) : console.error('NO NEXT PIECE ID FOUND')
      })
    }
  })
}

import { type testModifiersT } from '../../../support/commands'

interface dragNewBlockI { uniqueKey: string, uniqueValue: string }
export interface drapDropNewBlockI extends dragNewBlockI { modifiers: testModifiersT, changeSelections?: boolean, landmarkId: string, direction: 'above' | 'below' | 'left' | 'right' }
interface relativeDragDropNewBlockI extends drapDropNewBlockI { distance: number }

export const dragNewBlock = ({ uniqueKey, uniqueValue }: dragNewBlockI) => {
  cy.toggleModifier({ modId: `mod-${uniqueKey}`, isOpen: true })
  cy.getByTestId(`dragzone_${uniqueValue}`).drag()
  cy.toggleModifier({ modId: `mod-${uniqueKey}`, isOpen: false })
}

export const dragDropNewBlock = ({ uniqueKey, uniqueValue, landmarkId, direction, modifiers, changeSelections = false }: drapDropNewBlockI) => {
  const containerSelector = direction === 'above' || direction === 'below' ? 'block-container' : 'stack-container'
  const uniqueSelector = `${uniqueKey}: ${uniqueValue}`
  const thenAction = ($el: JQuery<HTMLElement>) => {
    modifiers.forEach(m => {
      cy.wrap($el).should('contain', `${m.mod}: ${m.input}`)
    })
  }
  changeSelections && cy.changeSelections(modifiers)
  cy.toggleModifier({ modId: `mod-${uniqueKey}`, isOpen: true })
  cy.getByTestId(`dragzone_${uniqueValue}`)
    .dragDrop(`dropzone_${landmarkId}-${direction}`, true)
  cy.getByTestId(`${containerSelector}_${landmarkId}`)
    .then($el => {
      if (direction === 'left') {
        cy.wrap($el).should('contain', uniqueSelector).then(() => {
          thenAction($el)
        })
      } else if (direction === 'above') {
        cy.wrap($el).prev().should('contain', uniqueSelector).then(() => {
          thenAction($el)
        })
      } else if (direction === 'below' || direction === 'right') {
        cy.wrap($el).next().should('contain', uniqueSelector).then(() => {
          thenAction($el)
        })
      } else {
        console.error('INVALID DIRECTION')
      }
    })
  cy.toggleModifier({ modId: `mod-${uniqueKey}`, isOpen: false })
}
export const relativeDragDropNewBlock = ({ uniqueKey, uniqueValue, landmarkId: landmarkPieceId, direction, distance, modifiers, changeSelections = false }: relativeDragDropNewBlockI) => {
  const eqId = distance - 1
  const thenAction = (nextPieceId?: string) => {
    const targetId = nextPieceId?.replace(/dragzone_/g, '')
    targetId ? dragDropNewBlock({ uniqueKey, uniqueValue, landmarkId: targetId, direction, modifiers, changeSelections }) : console.error('NO NEXT PIECE ID FOUND')
  }
  changeSelections && cy.changeSelections(modifiers)
  cy.getByTestId(`block-container_${landmarkPieceId}`).then($el => {
    if (direction === 'above') {
      cy.wrap($el).prevAll().eq(eqId).find("[data-testid^='dragzone_']").invoke('attr', 'data-testid').then(nextPieceId => {
        thenAction(nextPieceId)
      })
    } else if (direction === 'below') {
      cy.wrap($el).nextAll().eq(eqId).find("[data-testid^='dragzone_']").invoke('attr', 'data-testid').then(nextPieceId => {
        thenAction(nextPieceId)
      })
    }
  })
}

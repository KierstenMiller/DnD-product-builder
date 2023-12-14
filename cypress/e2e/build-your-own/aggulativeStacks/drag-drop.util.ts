import { type testModifiersT } from '../../../support/commands'

export interface dragBlockI {
  value: string
  id?: string // NOTE: this is only existing blocks have ids
}
interface dragNewBlockI extends dragBlockI {
  modId: string
}
interface dropI {
  landmarkId: string
  direction: directions
}
interface relativeDropI {
  landmarkId: string
  direction: directions.above | directions.below
  distance: number
}
interface stateI {
  modifiers: testModifiersT
  changeSelections?: boolean
}
export interface dragDropBlockI {
  drag: dragBlockI
  drop: dropI
  state: stateI
}
export interface dragDropNewBlockI {
  drag: dragNewBlockI
  drop: dropI
  state: stateI
}
interface relativeDragDropNewBlockI {
  drag: dragNewBlockI
  drop: relativeDropI
  state: stateI
}

export enum directions {
  above = 'above',
  below = 'below',
  left = 'left',
  right = 'right'
}

export const dragNewBlock = ({ modId, value }: dragNewBlockI) => {
  cy.toggleModifier({ modId: `mod-${modId}`, isOpen: true })
  cy.getByTestId(`dragzone_${value}`).drag()
  cy.toggleModifier({ modId: `mod-${modId}`, isOpen: false })
}

export const dragDropBlock = ({ drag, drop, state }: dragDropBlockI) => {
  const containerSelector = drop.direction === directions.above || drop.direction === directions.below ? 'block-container' : 'stack-container'
  state.changeSelections && cy.changeSelections(state.modifiers)
  cy.getByTestId(`dragzone_${drag.id ?? drag.value}`)
    .dragDrop(`dropzone_${drop.landmarkId}-${drop.direction}`, true)
  cy.getByTestId(`${containerSelector}_${drop.landmarkId}`)
    .then($el => { // validate the new block is in the correct position
      if (drag.id === drop.landmarkId) return cy.wrap($el) // NOTE: special case where the block is dropped in the same location - there is no previous or next element in this scenario
      switch (drop.direction) {
        case directions.left:
          return cy.wrap($el)
        case directions.above:
          return cy.wrap($el).prev()
        case directions.below:
        case directions.right:
          return cy.wrap($el).next()
        default:
          console.error('INVALID DIRECTION')
      }
    }).then(($el2) => {
      cy.wrap($el2).should('contain', drag.value).then(() => {
        state.modifiers.forEach(m => {
          cy.wrap($el2).should('contain', `${m.mod}: ${m.input}`)
        })
      })
    })
}
export const dragDropNewBlock = ({ drag, drop, state }: dragDropNewBlockI) => {
  cy.toggleModifier({ modId: `mod-${drag.modId}`, isOpen: true })
  dragDropBlock({ drag, drop, state })
  cy.toggleModifier({ modId: `mod-${drag.modId}`, isOpen: false })
}

export const relativeDragDropNewBlock = ({ drag, drop, state }: relativeDragDropNewBlockI) => {
  const location = drop.distance - 1
  state.changeSelections && cy.changeSelections(state.modifiers)
  cy.getByTestId(`block-container_${drop.landmarkId}`).then($el => {
    switch (drop.direction) {
      case directions.above:
        return cy.wrap($el).prevAll()
      case directions.below:
        return cy.wrap($el).nextAll()
      default:
        console.error('INVALID DIRECTION')
    }
  }).then(($all) => {
    cy.wrap($all).eq(location).find("[data-testid^='dragzone_']").invoke('attr', 'data-testid').then(nextPieceId => {
      const targetId = nextPieceId?.replace(/dragzone_/g, '')
      targetId ? dragDropNewBlock({ drag, drop: { ...drop, landmarkId: targetId }, state }) : console.error('NO NEXT PIECE ID FOUND')
    })
  })
}

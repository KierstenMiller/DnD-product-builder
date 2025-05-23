import { type testModifiersT } from '~/support/commands'


export interface DragBlockI {
  value: string
  id?: string // NOTE: this is only existing blocks have ids
}
export interface DragNewBlockI extends DragBlockI {
  modId: string
}
interface DropI {
  landmarkId: string
  direction: directions
}
interface RelativeDropI {
  landmarkId: string
  direction: directions.above | directions.below
  distance: number
}
interface StateI {
  modifiers: testModifiersT
  changeSelections?: boolean
}
export interface DragDropBlockI {
  drag: DragBlockI
  drop: DropI
  state: StateI
  customValidation?: {
    id: string
  }
}
export interface DragDropNewBlockI {
  drag: DragNewBlockI
  drop: DropI
  state: StateI
}
interface RelativeDragDropNewBlockI {
  drag: DragNewBlockI
  drop: RelativeDropI
  state: StateI
}

export enum directions {
  above = 'above',
  below = 'below',
  left = 'left',
  right = 'right'
}

export const dragNewBlock = ({ modId, value }: DragNewBlockI) => {
  cy.toggleModifier({ modId: `mod-${modId}`, isOpen: true })
  cy.getByTestId(`dragzone_${value}`).drag()
  cy.toggleModifier({ modId: `mod-${modId}`, isOpen: false })
}

const verifyDrop = ({ drag, drop, state, customValidation }: DragDropBlockI) => {
  const validationId = customValidation?.id ?? drop.landmarkId
  const containerSelector = drop.direction === directions.above || drop.direction === directions.below ? 'block-container' : 'stack-container'
  cy.getByTestId(`${containerSelector}_${validationId}`)
    .then($el => { // validate the new block is in the correct position
      // NOTE: drag.id === validationId is a special case where the block is dropped in the same location - there is no previous or next element in this scenario
      // NOTE: customValidation?.id indicates we are checking a specific element, not the next or previous element
      if (customValidation?.id != null || drag.id === validationId) return cy.wrap($el)
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

export const dragDropBlock = ({ drag, drop, state, customValidation }: DragDropBlockI) => {
  state.changeSelections && cy.changeSelections(state.modifiers)
  cy.getByTestId('stack-container_0').find('[data-testid^="block-container_"]').then($all => {
    cy.wrap($all)
  })
  cy.getByTestId(`dragzone_${drag.id ?? drag.value}`)
    .dragDrop(`dropzone_${drop.landmarkId}-${drop.direction}`, true)
  cy.wait(2000) // NOTE: this is a hack to wait for the drag and drop to finishand UI to finish rendering- there is no better way to do this
  verifyDrop({ drag, drop, state, customValidation })
}
export const dragDropNewBlock = ({ drag, drop, state }: DragDropNewBlockI) => {
  cy.toggleModifier({ modId: `mod-${drag.modId}`, isOpen: true })
  dragDropBlock({ drag, drop, state })
  cy.toggleModifier({ modId: `mod-${drag.modId}`, isOpen: false })
}

export const relativeDragDropNewBlock = ({ drag, drop, state }: RelativeDragDropNewBlockI) => {
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

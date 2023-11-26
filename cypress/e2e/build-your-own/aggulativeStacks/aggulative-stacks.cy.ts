import { type testModifiersT } from '../../../support/commands'

interface TestBlockI {
  height: number
  index: number
}

// newStack?: { stackIndex: number, stack: TestBlockI[] }
const updateWorkspace = ({ workspaceToUpdate, newBlockInfo }: { workspaceToUpdate: TestBlockI[][], newBlockInfo: { location: { stackIndex: number, blockIndex: number }, block: TestBlockI } }) => {
  const newWorkspace = workspaceToUpdate.map(s => s.map(b => ({ ...b })))
  newWorkspace[newBlockInfo.location.stackIndex].splice(newBlockInfo.location.blockIndex, 0, newBlockInfo.block)
  newWorkspace.forEach((s) => {
    s.forEach((b, j) => {
      b.index = j
    })
  })
  return newWorkspace
}

const verifyStack = ({ index, blocksConfig, modifiers }: { index: number, blocksConfig: TestBlockI[], modifiers: testModifiersT }) => {
  cy.getByTestId(`stack-container_${index}`)
    .find('[data-testid^="block-container_"]')
    .should('have.length', blocksConfig.length)
    .then($block => {
      blocksConfig.forEach((b, i) => {
        cy.wrap($block)
          .should('contain', `height: ${b.height}`)
          .then(() => {
            expect(b.index).to.equal(i)
            modifiers.forEach(m => {
              cy.wrap($block)
                .should('contain', `${m.mod}: ${m.input}`)
            })
          })
      })
    })
}

const verifyWorkspace = ({ stacksConfig, modifiers }: { stacksConfig: TestBlockI[][], modifiers: testModifiersT }) => {
  cy.get('[data-testid^="stack-container_"]').should('have.length', stacksConfig.length)
  cy.get('[data-testid^="block-container_"]').should('have.length', stacksConfig.flat().length)
  stacksConfig.forEach((stack, i) => {
    verifyStack({ index: i, blocksConfig: stack, modifiers })
  })
}

const verifyWorkspaceAfterAction = ({ currentWorkspaceState, modifiers, action }: { currentWorkspaceState: TestBlockI[][], modifiers: testModifiersT, action: () => void }) => {
  const newWorkspace = updateWorkspace({ workspaceToUpdate: currentWorkspaceState, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 1, index: 0 } } })
  verifyWorkspace({ stacksConfig: currentWorkspaceState, modifiers })
  action()
  verifyWorkspace({ stacksConfig: newWorkspace, modifiers })
}

const dragDropNewBlock = ({ blockCount, landmarkPieceId, direction, modifiers, changeSelections = false }: { blockCount: number, landmarkPieceId: string, direction: 'above' | 'below', modifiers: testModifiersT, changeSelections?: boolean }) => {
  changeSelections && cy.changeSelections(modifiers)
  cy.getByTestId('mod-height-modifier').find('button#mod-height').click() // open height modifier accordion
  cy.getByTestId(`dragzone_${blockCount}`).drag(`dropzone_${landmarkPieceId}-${direction}`, true)
  cy.getByTestId(`block-container_${landmarkPieceId}`).then($el => {
    if (direction === 'above') {
      cy.wrap($el)
        .prev()
        .should('contain', `height: ${blockCount}`).then(() => {
          modifiers.forEach(m => {
            cy.wrap($el).should('contain', `${m.mod}: ${m.input}`)
          })
        })
    } else {
      cy.wrap($el)
        .next()
        .should('contain', `height: ${blockCount}`).then(() => {
          modifiers.forEach(m => {
            cy.wrap($el).should('contain', `${m.mod}: ${m.input}`)
          })
        })
    }
  })
  cy.getByTestId('mod-height-modifier').find('button#mod-height').click() // close height modifier accordion
}

const relativeDragDropNewBlock = ({ blockCount, landmarkPieceId, direction, distance, modifiers, changeSelections = false }: { blockCount: number, landmarkPieceId: string, direction: 'above' | 'below', distance: number, modifiers: testModifiersT, changeSelections?: boolean }) => {
  const eqId = distance - 1
  changeSelections && cy.changeSelections(modifiers)
  cy.getByTestId(`block-container_${landmarkPieceId}`).then($el => {
    if (direction === 'above') {
      cy.wrap($el).prevAll().eq(eqId).find("[data-testid^='dragzone_']").invoke('attr', 'data-testid').then(nextPieceId => {
        const targetId = nextPieceId?.replace(/dragzone_/g, '')
        targetId ? dragDropNewBlock({ blockCount, landmarkPieceId: targetId, direction, modifiers, changeSelections }) : console.error('NO NEXT PIECE ID FOUND')
      })
    } else if (direction === 'below') {
      cy.wrap($el).nextAll().eq(eqId).find("[data-testid^='dragzone_']").invoke('attr', 'data-testid').then(nextPieceId => {
        const targetId = nextPieceId?.replace(/dragzone_/g, '')
        targetId ? dragDropNewBlock({ blockCount, landmarkPieceId: targetId, direction, modifiers, changeSelections }) : console.error('NO NEXT PIECE ID FOUND')
      })
    }
  })
}

describe('Aggulative Workflow', () => {
  const defaultWorkspace = [
    [{ height: 1, index: 0 }, { height: 1, index: 1 }, { height: 1, index: 2 }],
    [{ height: 2, index: 0 }],
    [{ height: 4, index: 0 }],
    [{ height: 1, index: 0 }, { height: 1, index: 1 }, { height: 1, index: 2 }, { height: 1, index: 3 }]
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
    cy.visit('/build-your-own/aggulative')
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
  // DEFAULT SELECTIONS
  it('should allow SINGLE block to drag, apply DEFAULT selection, and drop ABOVE piece-1 in workspace', () => {
    verifyWorkspaceAfterAction({
      currentWorkspaceState: defaultWorkspace,
      modifiers: defaultModifierState,
      action: () => { dragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'above', landmarkPieceId: 'piece-1' }) }
    })
  })
  it('should allow SINGLE block to drag, apply DEFAULT selection, and drop BELOW piece-1 in workspace', () => {
    verifyWorkspaceAfterAction({
      currentWorkspaceState: defaultWorkspace,
      modifiers: defaultModifierState,
      action: () => { dragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'below', landmarkPieceId: 'piece-1' }) }
    })
  })
  it('should allow DOUBLE block to drag, apply DEFAULT selection, and drop ABOVE piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 2, modifiers: defaultModifierState, direction: 'above', landmarkPieceId: 'piece-1' })
  })
  it('should allow DOUBLE block to drag, apply DEFAULT selection, and drop BELOW piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 2, modifiers: defaultModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
  })
  it('should allow QUADRUPLE block to drag, apply DEFAULT selection, and drop ABOVE piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 4, modifiers: defaultModifierState, direction: 'above', landmarkPieceId: 'piece-1' })
  })
  it('should allow QUADRUPLE block to drag, apply DEFAULT selection, and drop BELOW piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 4, modifiers: defaultModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
  })
  // CHANGE SELECTIONS
  it('should allow SINGLE block to drag, apply NEW selection, and drop ABOVE piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 1, changeSelections: true, modifiers: newModifierState, direction: 'above', landmarkPieceId: 'piece-1' })
  })
  it('should allow SINGLE block to drag, apply NEW selection, and drop BELOW piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 1, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
  })
  it('should allow DOUBLE block to drag, apply NEW selection, and drop ABOVE piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 2, changeSelections: true, modifiers: newModifierState, direction: 'above', landmarkPieceId: 'piece-1' })
  })
  it('should allow DOUBLE block to drag, apply NEW selection, and drop BELOW piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 2, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
  })
  it('should allow QUADRUPLE block to drag, apply NEW selection, and drop ABOVE piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 4, changeSelections: true, modifiers: newModifierState, direction: 'above', landmarkPieceId: 'piece-1' })
  })
  it('should allow QUADRUPLE block to drag, apply NEW selection, and drop BELOW piece-1 in workspace', () => {
    dragDropNewBlock({ blockCount: 4, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
  })
  // OTHER
  it('should allow for multiple drops across the workspace, changing selections between some drops', () => {
    dragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'above', landmarkPieceId: 'piece-1' })
    dragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
    dragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
    dragDropNewBlock({ blockCount: 2, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
    dragDropNewBlock({ blockCount: 4, changeSelections: true, modifiers: newerModifierState, direction: 'below', landmarkPieceId: 'piece-2' })
    dragDropNewBlock({ blockCount: 1, changeSelections: true, modifiers: defaultModifierState, direction: 'below', landmarkPieceId: 'piece-3' })
    dragDropNewBlock({ blockCount: 2, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkPieceId: 'piece-4' })
    dragDropNewBlock({ blockCount: 4, changeSelections: true, modifiers: newerModifierState, direction: 'below', landmarkPieceId: 'piece-5' })
    dragDropNewBlock({ blockCount: 1, modifiers: newerModifierState, direction: 'below', landmarkPieceId: 'piece-5' })
    dragDropNewBlock({ blockCount: 1, modifiers: newerModifierState, direction: 'below', landmarkPieceId: 'piece-5' })
  })
  // new pieces can be added upon
  it('should allow for new pieces to be added upon', () => {
    dragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'below', landmarkPieceId: 'piece-1' })
    relativeDragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'below', distance: 1, landmarkPieceId: 'piece-1' })
    relativeDragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'below', distance: 2, landmarkPieceId: 'piece-1' })
    relativeDragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'below', distance: 3, landmarkPieceId: 'piece-1' })
    dragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'above', landmarkPieceId: 'piece-4' })
    relativeDragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'above', distance: 1, landmarkPieceId: 'piece-4' })
    relativeDragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'above', distance: 2, landmarkPieceId: 'piece-4' })
    relativeDragDropNewBlock({ blockCount: 1, modifiers: defaultModifierState, direction: 'above', distance: 3, landmarkPieceId: 'piece-4' })
  })
  // make new stacks
  // new blocks can be made on new stacks
  // new stacks can be made on new stacks
})

import { type testModifiersT } from '../../../support/commands'

interface TestBlockI {
  height: number
  index: number
}

// newStack?: { stackIndex: number, stack: TestBlockI[] }
interface newBlockInfoI { location: { stackIndex: number, blockIndex: number }, block: TestBlockI, isNewStack?: boolean }
const getNewWorkspace = ({ workspaceToUpdate, newBlockInfo }: { workspaceToUpdate: TestBlockI[][], newBlockInfo: newBlockInfoI }) => {
  const newWorkspace = workspaceToUpdate.map(s => s.map(b => ({ ...b })))
  console.log('newBlockInfo', newBlockInfo)
  newBlockInfo.isNewStack
    ? newWorkspace.splice(newBlockInfo.location.stackIndex, 0, [newBlockInfo.block])
    : newWorkspace[newBlockInfo.location.stackIndex].splice(newBlockInfo.location.blockIndex, 0, newBlockInfo.block)
  newWorkspace.forEach((s) => {
    s.forEach((b, j) => {
      b.index = j
    })
  })
  console.log('newWorkspace', newWorkspace)
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
interface verifyWorkspaceAfterActionI {
  currentState: { workspace: TestBlockI[][], modifiers: testModifiersT }
  newState: { workspace: TestBlockI[][], modifiers: testModifiersT }
  action: () => void
}
const doActionThenVerify = ({ currentState, newState, action }: verifyWorkspaceAfterActionI) => {
  verifyWorkspace({ stacksConfig: currentState.workspace, modifiers: currentState.modifiers })
  action()
  verifyWorkspace({ stacksConfig: newState.workspace, modifiers: newState.modifiers })
}
interface drapDropNewBlockI { height: number, landmarkId: string, direction: 'above' | 'below' | 'left' | 'right', modifiers: testModifiersT, newBlockInfo?: newBlockInfoI, changeSelections?: boolean }
interface relativeDragDropNewBlockI extends drapDropNewBlockI { distance: number }
const dragDropNewBlock = ({ height, landmarkId, direction, modifiers, changeSelections = false }: drapDropNewBlockI) => {
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
const relativeDragDropNewBlock = ({ height, landmarkId: landmarkPieceId, direction, distance, modifiers, changeSelections = false }: relativeDragDropNewBlockI) => {
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
  const singleDropScenarios: drapDropNewBlockI[] = [
    // add new blocks to existing stacks
    { height: 1, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 1, index: 0 } } },
    { height: 1, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 1, index: 1 } } },
    { height: 2, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 2, index: 0 } } },
    { height: 2, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 2, index: 1 } } },
    { height: 4, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 4, index: 0 } } },
    { height: 4, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 4, index: 1 } } },
    { height: 1, modifiers: newModifierState, direction: 'above', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 1, index: 0 } } },
    { height: 1, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 1, index: 1 } } },
    { height: 2, modifiers: newModifierState, direction: 'above', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 2, index: 0 } } },
    { height: 2, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 1, index: 1 } } },
    { height: 4, modifiers: newModifierState, direction: 'above', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 4, index: 0 } } },
    { height: 4, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 4, index: 1 } } },
    // // add new blocks to new stacks
    { height: 1, modifiers: defaultModifierState, direction: 'right', landmarkId: '0', newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { height: 1, index: 0 }, isNewStack: true } },
    { height: 1, modifiers: defaultModifierState, direction: 'left', landmarkId: '0', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 1, index: 0 }, isNewStack: true } }
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
  singleDropScenarios.forEach(s => {
    it(`should allow *height-${s.height}* block to drag, apply *${s.changeSelections ? 'new' : 'default'}* selection, and drop *${s.direction}* the *${s.landmarkId}* ${s.direction === 'left' || s.direction === 'right' ? 'block' : 'stack'}`, () => {
      const newWorkspace = getNewWorkspace({ workspaceToUpdate: defaultWorkspace, newBlockInfo: s.newBlockInfo })
      doActionThenVerify({
        currentState: { workspace: defaultWorkspace, modifiers: defaultModifierState },
        newState: { workspace: newWorkspace, modifiers: s.changeSelections ? newModifierState : defaultModifierState },
        action: () => { dragDropNewBlock(s) }
      })
    })
  })
  it('should allow for multiple drops across the workspace, changing selections between some drops (no new stacks)', () => {
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 1, index: 0 } } })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 2 }, block: { height: 1, index: 0 } } })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 2 }, block: { height: 1, index: 0 } } })
    dragDropNewBlock({ height: 2, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 2 }, block: { height: 2, index: 0 } } })
    dragDropNewBlock({ height: 4, changeSelections: true, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-2', newBlockInfo: { location: { stackIndex: 0, blockIndex: 5 }, block: { height: 4, index: 0 } } })
    dragDropNewBlock({ height: 1, changeSelections: true, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-3', newBlockInfo: { location: { stackIndex: 0, blockIndex: 7 }, block: { height: 1, index: 0 } } })
    dragDropNewBlock({ height: 2, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-4', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 2, index: 0 } } })
    dragDropNewBlock({ height: 4, changeSelections: true, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 4, index: 0 } } })
    dragDropNewBlock({ height: 1, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 1, index: 0 } } })
    dragDropNewBlock({ height: 1, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 1, index: 0 } } })
  })
  it('should allow for new pieces to be added upon (no new stacks)', () => {
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { height: 1, index: 0 } } })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', distance: 1, landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { height: 1, index: 0 } } })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', distance: 2, landmarkId: 'piece-1' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', distance: 3, landmarkId: 'piece-1' })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', distance: 1, landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', distance: 2, landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', distance: 3, landmarkId: 'piece-4' })
  })
  // make new stacks
  // new blocks can be made on new stacks
  // new stacks can be made on new stacks
})

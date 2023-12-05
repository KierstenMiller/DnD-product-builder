import { dragDropNewBlock, relativeDragDropNewBlock, type drapDropNewBlockI } from './drag-drop.util'
import { doActionThenVerify, getNewWorkspace, verifyWorkspace, type newBlockInfoI } from './verfiy.util'

interface dragDropScenarioI extends drapDropNewBlockI { newBlockInfo: newBlockInfoI }
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
  const singleDropScenarios: dragDropScenarioI[] = [
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
    const newWorkspace = [
      [{ height: 1, index: 0 }, { height: 1, index: 1 }, { height: 2, index: 2 }, { height: 1, index: 3 }, { height: 1, index: 4 }, { height: 1, index: 5 }, { height: 4, index: 6 }, { height: 1, index: 7 }, { height: 1, index: 8 }],
      [{ height: 2, index: 0 }, { height: 2, index: 1 }],
      [{ height: 4, index: 0 }, { height: 1, index: 1 }, { height: 1, index: 2 }, { height: 1, index: 3 }],
      [{ height: 1, index: 0 }, { height: 1, index: 1 }, { height: 1, index: 2 }, { height: 1, index: 3 }]
    ]
    verifyWorkspace({ stacksConfig: defaultWorkspace, modifiers: defaultModifierState })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1' })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1' })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1' })
    dragDropNewBlock({ height: 2, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1' })
    dragDropNewBlock({ height: 4, changeSelections: true, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-2' })
    dragDropNewBlock({ height: 1, changeSelections: true, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-3' })
    dragDropNewBlock({ height: 2, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-4' })
    dragDropNewBlock({ height: 4, changeSelections: true, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5' })
    dragDropNewBlock({ height: 1, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5' })
    dragDropNewBlock({ height: 1, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5' })
    verifyWorkspace({ stacksConfig: newWorkspace, modifiers: newerModifierState })
  })
  it('should allow for new pieces to be added upon other new pieces (no new stacks)', () => {
    const newWorkspace = [
      [{ height: 1, index: 0 }, { height: 1, index: 1 }, { height: 1, index: 2 }, { height: 1, index: 3 }, { height: 1, index: 4 }, { height: 1, index: 5 }, { height: 1, index: 6 }],
      [{ height: 1, index: 0 }, { height: 1, index: 1 }, { height: 1, index: 2 }, { height: 1, index: 3 }, { height: 2, index: 4 }],
      [{ height: 4, index: 0 }],
      [{ height: 1, index: 0 }, { height: 1, index: 1 }, { height: 1, index: 2 }, { height: 1, index: 3 }]
    ]
    verifyWorkspace({ stacksConfig: defaultWorkspace, modifiers: defaultModifierState })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', distance: 1, landmarkId: 'piece-1' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', distance: 2, landmarkId: 'piece-1' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'below', distance: 3, landmarkId: 'piece-1' })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', distance: 1, landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', distance: 2, landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'above', distance: 3, landmarkId: 'piece-4' })
    verifyWorkspace({ stacksConfig: newWorkspace, modifiers: defaultModifierState })
  })
  it('should allow for multiple stacks to be added to the workspace, allow for new stacks to be added to other new stacks and changing selection between some drops', () => {
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'right', landmarkId: '3' })
    dragDropNewBlock({ height: 2, changeSelections: true, modifiers: newModifierState, direction: 'right', landmarkId: '3' })
    dragDropNewBlock({ height: 2, modifiers: newModifierState, direction: 'right', landmarkId: '3' })
    dragDropNewBlock({ height: 2, changeSelections: true, modifiers: newerModifierState, direction: 'right', landmarkId: '5' })
    dragDropNewBlock({ height: 2, modifiers: newerModifierState, direction: 'right', landmarkId: '6' })
    dragDropNewBlock({ height: 4, modifiers: newerModifierState, direction: 'left', landmarkId: '0' })
    dragDropNewBlock({ height: 4, changeSelections: true, modifiers: newModifierState, direction: 'right', landmarkId: '0' })
    dragDropNewBlock({ height: 2, changeSelections: true, modifiers: defaultModifierState, direction: 'right', landmarkId: '0' })
    dragDropNewBlock({ height: 1, modifiers: defaultModifierState, direction: 'left', landmarkId: '0' })
    dragDropNewBlock({ height: 4, modifiers: defaultModifierState, direction: 'right', landmarkId: '3' })
  })
})

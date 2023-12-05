import { dragDropNewBlock, relativeDragDropNewBlock, type drapDropNewBlockI } from './drag-drop.util'
import { doActionThenVerify, getNewWorkspace, verifyWorkspace, type newBlockInfoI } from './verfiy.util'

interface dragDropScenarioI extends drapDropNewBlockI { newBlockInfo: newBlockInfoI }
describe('Aggulative Workflow', () => {
  const uniqueKey = 'height'
  const singleBlock = { uniqueKey, uniqueValue: '1' }
  const doubleBlock = { uniqueKey, uniqueValue: '2' }
  const quadBlock = { uniqueKey, uniqueValue: '4' }
  const defaultWorkspace = [
    [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }],
    [{ ...doubleBlock, index: 0 }],
    [{ ...quadBlock, index: 0 }],
    [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }, { ...singleBlock, index: 3 }]
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
    { ...singleBlock, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 } } },
    { ...singleBlock, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, index: 1 } } },
    { ...doubleBlock, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...doubleBlock, index: 0 } } },
    { ...doubleBlock, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...doubleBlock, index: 1 } } },
    { ...quadBlock, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...quadBlock, index: 0 } } },
    { ...quadBlock, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1', newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...quadBlock, index: 1 } } },
    { ...singleBlock, modifiers: newModifierState, direction: 'above', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 } } },
    { ...singleBlock, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, index: 1 } } },
    { ...doubleBlock, modifiers: newModifierState, direction: 'above', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...doubleBlock, index: 0 } } },
    { ...doubleBlock, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, index: 1 } } },
    { ...quadBlock, modifiers: newModifierState, direction: 'above', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...quadBlock, index: 0 } } },
    { ...quadBlock, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1', changeSelections: true, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...quadBlock, index: 1 } } },
    // // add new blocks to new stacks
    { ...singleBlock, modifiers: defaultModifierState, direction: 'right', landmarkId: '0', newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { ...singleBlock, modifiers: defaultModifierState, direction: 'left', landmarkId: '0', newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } }
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
    it(`should allow *height-${s.uniqueValue}* block to drag, apply *${s.changeSelections ? 'new' : 'default'}* selection, and drop *${s.direction}* the *${s.landmarkId}* ${s.direction === 'left' || s.direction === 'right' ? 'block' : 'stack'}`, () => {
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
      [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...doubleBlock, index: 2 }, { ...singleBlock, index: 3 }, { ...singleBlock, index: 4 }, { ...singleBlock, index: 5 }, { ...quadBlock, index: 6 }, { ...singleBlock, index: 7 }, { ...singleBlock, index: 8 }],
      [{ ...doubleBlock, index: 0 }, { ...doubleBlock, index: 1 }],
      [{ ...quadBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }, { ...singleBlock, index: 3 }],
      [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }, { ...singleBlock, index: 3 }]
    ]
    verifyWorkspace({ stacksConfig: defaultWorkspace, modifiers: defaultModifierState })
    dragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-1' })
    dragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1' })
    dragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1' })
    dragDropNewBlock({ ...doubleBlock, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-1' })
    dragDropNewBlock({ ...quadBlock, changeSelections: true, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-2' })
    dragDropNewBlock({ ...singleBlock, changeSelections: true, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-3' })
    dragDropNewBlock({ ...doubleBlock, changeSelections: true, modifiers: newModifierState, direction: 'below', landmarkId: 'piece-4' })
    dragDropNewBlock({ ...quadBlock, changeSelections: true, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5' })
    dragDropNewBlock({ ...singleBlock, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5' })
    dragDropNewBlock({ ...singleBlock, modifiers: newerModifierState, direction: 'below', landmarkId: 'piece-5' })
    verifyWorkspace({ stacksConfig: newWorkspace, modifiers: newerModifierState })
  })
  it('should allow for new pieces to be added upon other new pieces (no new stacks)', () => {
    const newWorkspace = [
      [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }, { ...singleBlock, index: 3 }, { ...singleBlock, index: 4 }, { ...singleBlock, index: 5 }, { ...singleBlock, index: 6 }],
      [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }, { ...singleBlock, index: 3 }, { ...doubleBlock, index: 4 }],
      [{ ...quadBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }, { ...singleBlock, index: 3 }]
    ]
    verifyWorkspace({ stacksConfig: defaultWorkspace, modifiers: defaultModifierState })
    dragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'below', landmarkId: 'piece-1' })
    relativeDragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'below', distance: 1, landmarkId: 'piece-1' })
    relativeDragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'below', distance: 2, landmarkId: 'piece-1' })
    relativeDragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'below', distance: 3, landmarkId: 'piece-1' })
    dragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'above', landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'above', distance: 1, landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'above', distance: 2, landmarkId: 'piece-4' })
    relativeDragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'above', distance: 3, landmarkId: 'piece-4' })
    verifyWorkspace({ stacksConfig: newWorkspace, modifiers: defaultModifierState })
  })
  it('should allow for multiple stacks to be added to the workspace, allow for new stacks to be added to other new stacks and changing selection between some drops', () => {
    dragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'right', landmarkId: '3' })
    dragDropNewBlock({ ...doubleBlock, changeSelections: true, modifiers: newModifierState, direction: 'right', landmarkId: '3' })
    dragDropNewBlock({ ...doubleBlock, modifiers: newModifierState, direction: 'right', landmarkId: '3' })
    dragDropNewBlock({ ...doubleBlock, changeSelections: true, modifiers: newerModifierState, direction: 'right', landmarkId: '5' })
    dragDropNewBlock({ ...doubleBlock, modifiers: newerModifierState, direction: 'right', landmarkId: '6' })
    dragDropNewBlock({ ...quadBlock, modifiers: newerModifierState, direction: 'left', landmarkId: '0' })
    dragDropNewBlock({ ...quadBlock, changeSelections: true, modifiers: newModifierState, direction: 'right', landmarkId: '0' })
    dragDropNewBlock({ ...doubleBlock, changeSelections: true, modifiers: defaultModifierState, direction: 'right', landmarkId: '0' })
    dragDropNewBlock({ ...singleBlock, modifiers: defaultModifierState, direction: 'left', landmarkId: '0' })
    dragDropNewBlock({ ...quadBlock, modifiers: defaultModifierState, direction: 'right', landmarkId: '3' })
  })
})

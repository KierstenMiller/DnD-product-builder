import { directions as dirs, dragDropNewBlock, relativeDragDropNewBlock, type dragDropNewBlockI } from './drag-drop.util'
import { doActionThenVerify, getNewWorkspace, verifyWorkspace, type newBlockInfoI } from './verfiy.util'

interface dragDropScenarioI extends dragDropNewBlockI { newBlockInfo: newBlockInfoI }
describe('Aggulative Workflow', () => {
  const modId = 'height'
  const singleBlock = { modId, blockId: '1' }
  const doubleBlock = { modId, blockId: '2' }
  const quadBlock = { modId, blockId: '4' }
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
  // NOTE: formatted data for easy scanning
  const singleDropScenarios: dragDropScenarioI[] = [
    // add new blocks to existing stacks
    { drag: singleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 } } },
    { drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, index: 1 } } },
    { drag: doubleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...doubleBlock, index: 0 } } },
    { drag: doubleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...doubleBlock, index: 1 } } },
    { drag: quadBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...quadBlock, index: 0 } } },
    { drag: quadBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...quadBlock, index: 1 } } },
    { drag: singleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 } } },
    { drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, index: 1 } } },
    { drag: doubleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...doubleBlock, index: 0 } } },
    { drag: doubleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...doubleBlock, index: 1 } } },
    { drag: quadBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...quadBlock, index: 0 } } },
    { drag: quadBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...quadBlock, index: 1 } } },
    // add new blocks to new stacks
    { drag: singleBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { drag: singleBlock, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } }
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/aggulative')
  })
  it('should render the aggulative page as expected', () => {
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
    it(`should allow *${s.drag.modId}-${s.drag.blockId}* block to drag, apply *${s.state.changeSelections ? 'new' : 'default'}* selection, and drop *${s.drop.direction}* the *${s.drop.landmarkId}* ${s.drop.direction === dirs.left || s.drop.direction === dirs.right ? 'block' : 'stack'}`, () => {
      const newWorkspace = getNewWorkspace({ workspaceToUpdate: defaultWorkspace, newBlockInfo: s.newBlockInfo })
      doActionThenVerify({
        currentState: { workspace: defaultWorkspace, modifiers: defaultModifierState },
        newState: { workspace: newWorkspace, modifiers: s.state.changeSelections ? newModifierState : defaultModifierState },
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
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    dragDropNewBlock({ drag: doubleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true } })
    dragDropNewBlock({ drag: quadBlock, drop: { direction: dirs.below, landmarkId: 'piece-2' }, state: { modifiers: newerModifierState, changeSelections: true } })
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-3' }, state: { modifiers: defaultModifierState, changeSelections: true } })
    dragDropNewBlock({ drag: doubleBlock, drop: { direction: dirs.below, landmarkId: 'piece-4' }, state: { modifiers: newModifierState, changeSelections: true } })
    dragDropNewBlock({ drag: quadBlock, drop: { direction: dirs.below, landmarkId: 'piece-5' }, state: { modifiers: newerModifierState, changeSelections: true } })
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-5' }, state: { modifiers: newerModifierState } })
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-5' }, state: { modifiers: newerModifierState } })
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
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    relativeDragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, distance: 1, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    relativeDragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, distance: 2, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    relativeDragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.below, distance: 3, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.above, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    relativeDragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.above, distance: 1, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    relativeDragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.above, distance: 2, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    relativeDragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.above, distance: 3, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    verifyWorkspace({ stacksConfig: newWorkspace, modifiers: defaultModifierState })
  })
  it('should allow for multiple stacks to be added to the workspace, allow for new stacks to be added to other new stacks and changing selection between some drops', () => {
    const newWorkspace = [
      [{ ...singleBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }],
      [{ ...quadBlock, index: 0 }],
      [{ ...quadBlock, index: 0 }],
      [{ ...doubleBlock, index: 0 }],
      [{ ...quadBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }, { ...singleBlock, index: 1 }, { ...singleBlock, index: 2 }, { ...singleBlock, index: 3 }],
      [{ ...doubleBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }],
      [{ ...doubleBlock, index: 0 }]
    ]
    verifyWorkspace({ stacksConfig: defaultWorkspace, modifiers: defaultModifierState })
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.right, landmarkId: '3' }, state: { modifiers: defaultModifierState } })
    dragDropNewBlock({ drag: doubleBlock, drop: { direction: dirs.right, landmarkId: '3' }, state: { modifiers: newModifierState, changeSelections: true } })
    dragDropNewBlock({ drag: doubleBlock, drop: { direction: dirs.right, landmarkId: '5' }, state: { modifiers: newModifierState } })
    dragDropNewBlock({ drag: quadBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: newModifierState } })
    dragDropNewBlock({ drag: quadBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: newerModifierState, changeSelections: true } })
    dragDropNewBlock({ drag: singleBlock, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: newerModifierState } })
    verifyWorkspace({ stacksConfig: newWorkspace, modifiers: newerModifierState })
  })
  // TODO: should be able to drag blocks in the stacks to other stacks or another location in the same stack
})

import { directions as dirs, dragDropNewBlock, relativeDragDropNewBlock, type dragDropNewBlockI } from '../drag-drop.util'
import { doActionThenVerify, getNewWorkspace, verifyWorkspace, type newBlockInfoI } from '../verfiy.util'
import { defaultModifierState, defaultWorkspace, doubleBlock, newModifierState, newerModifierState, quadBlock, singleBlock } from './shared-data.util'

interface dragDropNewBlockScenarioI extends dragDropNewBlockI { index: number, newBlockInfo: newBlockInfoI }
describe('Aggulative Workflow', () => {
  // NOTE: formatted data for easy scanning
  const dragDropNewBlockScenarios: dragDropNewBlockScenarioI[] = [
    // add NEW blocks to existing stacks, no change in selections
    { index: 1, drag: singleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 } } },
    { index: 2, drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, index: 1 } } },
    { index: 3, drag: doubleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...doubleBlock, index: 0 } } },
    { index: 4, drag: doubleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...doubleBlock, index: 1 } } },
    { index: 5, drag: quadBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...quadBlock, index: 0 } } },
    { index: 6, drag: quadBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...quadBlock, index: 1 } } },
    // add NEW blocks to existing stacks, changing selections
    { index: 7, drag: singleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 } } },
    { index: 8, drag: singleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, index: 1 } } },
    { index: 9, drag: doubleBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...doubleBlock, index: 0 } } },
    { index: 10, drag: doubleBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...doubleBlock, index: 1 } } },
    { index: 11, drag: quadBlock, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...quadBlock, index: 0 } } },
    { index: 12, drag: quadBlock, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...quadBlock, index: 1 } } },
    // add new blocks to new stacks, no change in selections
    { index: 13, drag: singleBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { index: 14, drag: singleBlock, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { index: 15, drag: doubleBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...doubleBlock, index: 0 }, isNewStack: true } },
    { index: 16, drag: doubleBlock, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...doubleBlock, index: 0 }, isNewStack: true } },
    { index: 17, drag: quadBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...quadBlock, index: 0 }, isNewStack: true } },
    { index: 18, drag: quadBlock, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...quadBlock, index: 0 }, isNewStack: true } },
    // add new blocks to make new stacks, changing selections
    { index: 19, drag: singleBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { index: 20, drag: singleBlock, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { index: 21, drag: doubleBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...doubleBlock, index: 0 }, isNewStack: true } },
    { index: 22, drag: doubleBlock, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...doubleBlock, index: 0 }, isNewStack: true } },
    { index: 23, drag: quadBlock, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...quadBlock, index: 0 }, isNewStack: true } },
    { index: 24, drag: quadBlock, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: newModifierState, changeSelections: true }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...quadBlock, index: 0 }, isNewStack: true } }
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/aggulative')
  })
  dragDropNewBlockScenarios.forEach(s => {
    it(`${s.index}: should allow the NEW BLOCK *${s.drag.modId}-${s.drag.value}* to be dragged, application of *${s.state.changeSelections ? 'new' : 'default'}* selection(s), and drop it *${s.drop.direction}* of the *${s.drop.landmarkId}* ${s.drop.direction === dirs.left || s.drop.direction === dirs.right ? 'block' : 'stack'}`, () => {
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
})

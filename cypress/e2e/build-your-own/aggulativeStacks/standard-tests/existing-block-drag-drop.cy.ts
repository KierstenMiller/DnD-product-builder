import { directions as dirs, dragDropBlock, type dragDropBlockI } from '../drag-drop.util'
import { doActionThenVerify, getNewWorkspace, verifyWorkspace, type newBlockInfoI } from '../verfiy.util'
import { defaultModifierState, defaultWorkspace, doubleBlock, newModifierState, quadBlock, singleBlock } from './shared-data.util'

interface dragDropExistingBlockScenarioI extends dragDropBlockI { index: number, newBlockInfo: newBlockInfoI }
describe('Aggulative Workflow', () => {
  // NOTE: formatted data for easy scanning
  const dragDropExistingBlockScenarios: dragDropExistingBlockScenarioI[] = [
    // move EXISTING blocks inside same stack, no change to selection
    { index: 1, drag: { ...singleBlock, id: 'piece-1' }, drop: { direction: dirs.below, landmarkId: 'piece-2' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, id: 'piece-1', index: 1 } } },
    { index: 2, drag: { ...singleBlock, id: 'piece-2' }, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, id: 'piece-2', index: 1 } } },
    { index: 3, drag: { ...singleBlock, id: 'piece-3' }, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, id: 'piece-3', index: 1 } } },
    { index: 4, drag: { ...singleBlock, id: 'piece-9' }, drop: { direction: dirs.below, landmarkId: 'piece-6' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 3, blockIndex: 1 }, block: { ...singleBlock, id: 'piece-9', index: 1 } } },
    // move EXISTING blocks to same location in stack, no change to selection
    { index: 5, drag: { ...singleBlock, id: 'piece-1' }, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, id: 'piece-1', index: 1 } } },
    { index: 6, drag: { ...singleBlock, id: 'piece-2' }, drop: { direction: dirs.below, landmarkId: 'piece-2' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleBlock, id: 'piece-2', index: 1 } } },
    { index: 7, drag: { ...doubleBlock, id: 'piece-4' }, drop: { direction: dirs.below, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...doubleBlock, id: 'piece-4', index: 1 } } },
    { index: 8, drag: { ...quadBlock, id: 'piece-5' }, drop: { direction: dirs.below, landmarkId: 'piece-5' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 2, blockIndex: 0 }, block: { ...quadBlock, id: 'piece-5', index: 1 } } },
    // move EXISTING blocks to other stacks, no change to selection
    { index: 9, drag: { ...singleBlock, id: 'piece-2' }, drop: { direction: dirs.above, landmarkId: 'piece-5' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 2, blockIndex: 0 }, block: { ...singleBlock, id: 'piece-2', index: 1 } } },
    { index: 10, drag: { ...singleBlock, id: 'piece-3' }, drop: { direction: dirs.below, landmarkId: 'piece-7' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 3, blockIndex: 2 }, block: { ...singleBlock, id: 'piece-3', index: 1 } } },
    { index: 11, drag: { ...singleBlock, id: 'piece-6' }, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, id: 'piece-6', index: 1 } } },
    // move EXISTING blocks to create a new stack, no change to selection
    { index: 12, drag: { ...singleBlock, id: 'piece-1' }, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { index: 13, drag: { ...singleBlock, id: 'piece-3' }, drop: { direction: dirs.right, landmarkId: '0' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { index: 14, drag: { ...singleBlock, id: 'piece-7' }, drop: { direction: dirs.right, landmarkId: '2' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 3, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    { index: 15, drag: { ...singleBlock, id: 'piece-8' }, drop: { direction: dirs.right, landmarkId: '3' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 4, blockIndex: 0 }, block: { ...singleBlock, index: 0 }, isNewStack: true } },
    // from a stack with only one block, drag that block to create a new stack, and make sure the old stack is removed
    { index: 16, drag: { ...doubleBlock, id: 'piece-4' }, drop: { direction: dirs.right, landmarkId: '3' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 4, blockIndex: 0 }, block: { ...doubleBlock, index: 0 }, isNewStack: true }, customValidation: { id: '3' } },
    // from a stack with only one block, drag that block to replace itself
    { index: 17, drag: { ...doubleBlock, id: 'piece-4' }, drop: { direction: dirs.right, landmarkId: '1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 1, blockIndex: 0 }, block: { ...doubleBlock, index: 0 }, isNewStack: true }, customValidation: { id: '1' } }
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/aggulative')
  })
  dragDropExistingBlockScenarios.forEach(s => {
    it(`${s.index}: should allow EXISTING block *${s.drag.id}* to be dragged, application of *${s.state.changeSelections ? 'new' : 'default'}* selection(s), and dropped *${s.drop.direction}* relative to *${s.drop.landmarkId}*'}`, () => {
      const newWorkspace = getNewWorkspace({ workspaceToUpdate: defaultWorkspace, newBlockInfo: s.newBlockInfo, id: s.drag.id })
      console.log('newWorkspace', newWorkspace)
      doActionThenVerify({
        currentState: { workspace: defaultWorkspace, modifiers: defaultModifierState },
        newState: { workspace: newWorkspace, modifiers: s.state.changeSelections ? newModifierState : defaultModifierState },
        action: () => { dragDropBlock(s) }
      })
    })
  })
  // TODO: ONLY WORKS LOCALLY - MAKE FIX FOR THIS
  it('should allow for all blocks in the workspace to become one stack', () => {
    const newWorkspace = [
      [
        { ...singleBlock, index: 0 },
        { ...singleBlock, index: 1 },
        { ...singleBlock, index: 2 },
        { ...doubleBlock, index: 3 },
        { ...quadBlock, index: 4 },
        { ...singleBlock, index: 5 },
        { ...singleBlock, index: 6 },
        { ...singleBlock, index: 7 },
        { ...singleBlock, index: 8 }
      ]
    ]
    verifyWorkspace({ stacksConfig: defaultWorkspace, modifiers: defaultModifierState })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-1' }, drop: { direction: dirs.above, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-3' }, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-2' }, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-9' }, drop: { direction: dirs.below, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-8' }, drop: { direction: dirs.below, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-8' }, drop: { direction: dirs.below, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-7' }, drop: { direction: dirs.below, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...quadBlock, id: 'piece-5' }, drop: { direction: dirs.below, landmarkId: 'piece-4' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-6' }, drop: { direction: dirs.below, landmarkId: 'piece-5' }, state: { modifiers: defaultModifierState } })
    verifyWorkspace({ stacksConfig: newWorkspace, modifiers: defaultModifierState })
  })
  it.only('should allow for all blocks in the workspace to become one stack', () => {
    const newWorkspace = [
      [{ ...singleBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }],
      [{ ...doubleBlock, index: 0 }],
      [{ ...quadBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }],
      [{ ...singleBlock, index: 0 }]
    ]
    verifyWorkspace({ stacksConfig: defaultWorkspace, modifiers: defaultModifierState })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-2' }, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: defaultModifierState } })
    dragDropBlock({ drag: { ...singleBlock, id: 'piece-1' }, drop: { direction: dirs.left, landmarkId: '0' }, state: { modifiers: defaultModifierState } })
    // dragDropBlock({ drag: { ...singleBlock, id: 'piece-9' }, drop: { direction: dirs.right, landmarkId: '5' }, state: { modifiers: defaultModifierState } })
    // dragDropBlock({ drag: { ...singleBlock, id: 'piece-6' }, drop: { direction: dirs.right, landmarkId: '4' }, state: { modifiers: defaultModifierState } })
    // dragDropBlock({ drag: { ...singleBlock, id: 'piece-7' }, drop: { direction: dirs.right, landmarkId: '5' }, state: { modifiers: defaultModifierState } })
    // verifyWorkspace({ stacksConfig: newWorkspace, modifiers: defaultModifierState })
  })
})

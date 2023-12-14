import { directions as dirs, dragDropBlock, type dragDropBlockI } from '../drag-drop.util'
import { doActionThenVerify, getNewWorkspace, type newBlockInfoI } from '../verfiy.util'
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
    { index: 11, drag: { ...singleBlock, id: 'piece-6' }, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleBlock, id: 'piece-6', index: 1 } } }
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/aggulative')
  })
  // TODO: should be able to drag blocks in the stacks to other stacks or another location in the same stack
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
  // it.only('should allow for blocks to be dropped into another location in the same stack', () => {
  //   dragDropBlock({ })
  //   dragDropBlock({ drag: { blockId: 'piece-3' }, drop: { direction: dirs.below, landmarkId: 'piece-2' }, state: { modifiers: defaultModifierState } })
  //   // dragDropBlock({ drag: { blockId: 'piece-8' }, drop: { direction: dirs.below, landmarkId: 'piece-6' }, state: { modifiers: defaultModifierState } })
  // })
  // TODO: If a stack only has one block, and that block is dragged away, the stack should be removed
})

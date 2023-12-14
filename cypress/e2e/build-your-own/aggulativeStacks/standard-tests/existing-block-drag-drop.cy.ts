import { directions as dirs, dragDropBlock, type dragDropBlockI } from '../drag-drop.util'
import { doActionThenVerify, getNewWorkspace, type newBlockInfoI } from '../verfiy.util'
import { defaultModifierState, defaultWorkspace, newModifierState } from './shared-data.util'

interface dragDropExistingBlockScenarioI extends dragDropBlockI { index: number, newBlockInfo: newBlockInfoI }
describe('Aggulative Workflow', () => {
  const singleExistingBlock = { blockId: '1' }
  const doubleExistingBlock = { blockId: '2' }
  const quadExistingBlock = { blockId: '4' }
  // NOTE: formatted data for easy scanning
  const dragDropExistingBlockScenarios: dragDropExistingBlockScenarioI[] = [
    // move EXISTING blocks inside same stack, no change to selection
    { index: 1, drag: { blockId: 'piece-1' }, drop: { direction: dirs.below, landmarkId: 'piece-2' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleExistingBlock, index: 1 } } },
    { index: 2, drag: { blockId: 'piece-9' }, drop: { direction: dirs.below, landmarkId: 'piece-6' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 3, blockIndex: 1 }, block: { ...singleExistingBlock, index: 1 } } }
    // { index: 2, drag: { blockId: 'piece-3' }, drop: { direction: dirs.above, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 0 }, block: { ...singleExistingBlock, index: 0 } } },
    // { index: 3, drag: { blockId: 'piece-3' }, drop: { direction: dirs.below, landmarkId: 'piece-1' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 1 }, block: { ...singleExistingBlock, index: 1 } } },
    // { index: 4, drag: { blockId: 'piece-3' }, drop: { direction: dirs.below, landmarkId: 'piece-2' }, state: { modifiers: defaultModifierState }, newBlockInfo: { location: { stackIndex: 0, blockIndex: 2 }, block: { ...singleExistingBlock, index: 2 } } }
    // move EXISTING blocks to other stacks
  ]
  beforeEach(() => {
    cy.visit('/build-your-own/aggulative')
  })
  // TODO: should be able to drag blocks in the stacks to other stacks or another location in the same stack
  dragDropExistingBlockScenarios.forEach(s => {
    it(`${s.index}: should allow EXISTING block *${s.drag.blockId}* to be dragged, application of *${s.state.changeSelections ? 'new' : 'default'}* selection(s), and dropped *${s.drop.direction}* relative to *${s.drop.landmarkId}* in the SAME stack '}`, () => {
      const newWorkspace = getNewWorkspace({ workspaceToUpdate: defaultWorkspace, newBlockInfo: s.newBlockInfo, id: s.drag.blockId })
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

import { type testModifiersT } from '../../../support/commands'
import { type dragBlockI } from './drag-drop.util'

const findIndex = (stacks: TestBlockI[][], id: string) => {
  let block = -1
  const stack = stacks.findIndex(s => {
    block = s.findIndex(b => b.id === id)
    return block >= 0
  })
  return stack >= 0 ? { stack, block } : null
}
interface TestBlockI extends dragBlockI { index: number, modId?: string }
export interface newBlockInfoI { location: { stackIndex: number, blockIndex: number }, block: TestBlockI, isNewStack?: boolean }
interface verifyWorkspaceAfterActionI {
  currentState: { workspace: TestBlockI[][], modifiers: testModifiersT }
  newState: { workspace: TestBlockI[][], modifiers: testModifiersT }
  action: () => void
}

// TODO: MAKE THIS BETTER
export const getNewWorkspace = ({ workspaceToUpdate, newBlockInfo, id }: { workspaceToUpdate: TestBlockI[][], newBlockInfo: newBlockInfoI, id?: string }) => {
  const newWorkspace = workspaceToUpdate.map(s => s.map(b => ({ ...b })))
  const match = id ? findIndex(newWorkspace, id) : null
  if (match) newWorkspace[match.stack].splice(match.block, 1)
  if (match && match.block < newBlockInfo.location.blockIndex) newBlockInfo.location.blockIndex -= 1
  newBlockInfo.isNewStack
    ? newWorkspace.splice(newBlockInfo.location.stackIndex, 0, [newBlockInfo.block])
    : newWorkspace[newBlockInfo.location.stackIndex].splice(newBlockInfo.location.blockIndex, 0, newBlockInfo.block)
  newWorkspace.forEach((s) => {
    s.forEach((b, j) => {
      b.index = j
    })
  })
  return newWorkspace
}
export const verifyStack = ({ index, blocksConfig, modifiers }: { index: number, blocksConfig: TestBlockI[], modifiers: testModifiersT }) => {
  cy.getByTestId(`stack-container_${index}`)
    .find('[data-testid^="block-container_"]')
    .should('have.length', blocksConfig.length)
    .then($block => {
      blocksConfig.forEach((b, i) => {
        cy.wrap($block)
          .should('contain', `${b.modId}: ${b.value}`)
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
export const verifyWorkspace = ({ stacksConfig, modifiers }: { stacksConfig: TestBlockI[][], modifiers: testModifiersT }) => {
  cy.log('RUNNING verifyWorkspace')
  cy.get('[data-testid^="stack-container_"]').should('have.length', stacksConfig.length)
  cy.get('[data-testid^="block-container_"]').should('have.length', stacksConfig.flat().length)
  stacksConfig.forEach((stack, i) => {
    verifyStack({ index: i, blocksConfig: stack, modifiers })
  })
}
export const doActionThenVerify = ({ currentState, newState, action }: verifyWorkspaceAfterActionI) => {
  verifyWorkspace({ stacksConfig: currentState.workspace, modifiers: currentState.modifiers })
  cy.log('RUNNING action')
  action()
  verifyWorkspace({ stacksConfig: newState.workspace, modifiers: newState.modifiers })
}

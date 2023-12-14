import { type aggulativeStacksListT, type pieceI } from '-/page-components/build-your-own/build-your-own.types'
import { isNum } from '-/util/helpers'

export const generateId = () => 'id' + (new Date()).getTime()
export const findIndex2D = (stacks: aggulativeStacksListT, id: string) => {
  let block = -1
  const stack = stacks.findIndex(s => {
    block = s.findIndex(b => b.piece.id === id)
    return block >= 0
  })
  return stack >= 0 ? { stack, block } : null
}
export const findPiece = (id: string, stacksData: aggulativeStacksListT): { index: { stack: number, block: number } | null, piece: pieceI | null } => {
  const index = findIndex2D(stacksData, id)
  const piece = (index && isNum(index.stack) && isNum(index.block)) ? (stacksData[index.stack][index.block])?.piece : null
  return { index, piece }
}
export const findAndRemoveBlock = (id: string, stacksData: aggulativeStacksListT) => {
  const { index, piece } = findPiece(id, stacksData)
  if (index && stacksData[index.stack]) stacksData[index.stack].splice(index.block, 1)
  return piece
}
export const clearEmptyStacks = (stacksData: aggulativeStacksListT) => {
  return stacksData.filter(s => s.length > 0)
}
export const addStack = (stackIndex: number, piece: pieceI, stacksData: aggulativeStacksListT) => {
  findAndRemoveBlock(piece.id, stacksData)
  stacksData.splice(stackIndex, 0, [{ piece }])
  return clearEmptyStacks(stacksData)
}
export const addPieceToStack = (stackIndex: number, blockIndex: number, piece: pieceI, stacksData: aggulativeStacksListT, isDroppingInSameStack?: boolean) => {
  // console.log('blockIndex2', blockIndex2)
  findAndRemoveBlock(piece.id, stacksData)
  stacksData[stackIndex].splice(blockIndex, 0, { piece })
  return clearEmptyStacks(stacksData)
}

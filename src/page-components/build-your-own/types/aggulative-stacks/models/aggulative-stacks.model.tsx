import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx'

import { type aggulativeStacksListT, type configT } from '-/page-components/build-your-own/build-your-own.types'
import { modifierChunkKeyValues } from '-/page-components/build-your-own/shared/modifier/modifier.types'
import { addPieceToStack, addStack, clearEmptyStacks, findAndRemoveBlock, findPiece, generateId } from '-/page-components/build-your-own/types/aggulative-stacks/utils/builder.util'

class Piece {
  id
  config
  constructor ({ id, config }: { id: string, config: configT }) {
    this.id = id
    this.config = config
    makeObservable(this, {
      config: observable,
      setConfig: action.bound
    })
  }

  setConfig = (newConfig: configT) => { this.config = newConfig }
}
export class AggulativeStacksBuildModel {
  config
  stacksData
  constructor ({ config, stacks: stacksData }: { config: configT, stacks: aggulativeStacksListT }) {
    this.config = config
    this.stacksData = stacksData
    makeAutoObservable(this, {
      stacks: computed,
      setConfig: action.bound,
      addStack: action.bound,
      addToStack: action.bound,
      findAndRemoveBlock: action.bound,
      generatePiece: action.bound,
      clearEmptyStacks: action.bound
    })
  }

  get stacks () {
    return this.stacksData.map(s => s.map(b => ({
      ...b,
      piece: new Piece({
        id: b.piece.id,
        config:
          this.config.map(c => c.modifierChunkKey === modifierChunkKeyValues.unique ? (b.piece.config.find(pC => pC.id === c.id) ?? c) : c)
      })
    })))
  }

  // util actions
  generatePiece = (id?: string, config?: configT) => {
    return { id: id ?? generateId(), config: config ?? this.config.map(c => c.modifierChunkKey === modifierChunkKeyValues.unique ? { ...c } : c) }
  }

  // setting actions
  setConfig = (newConfig: configT) => {
    this.config = newConfig
  }

  // adding actions
  addStack = (stackIndex: number, pieceId?: string) => {
    const { piece } = pieceId ? findPiece(pieceId, this.stacksData) : { piece: null }
    this.stacksData = addStack(stackIndex, piece ?? this.generatePiece(), this.stacksData)
  }

  addToStack = (stackIndex: number, blockIndex: number, pieceId?: string) => {
    const { index, piece } = pieceId ? findPiece(pieceId, this.stacksData) : { index: {}, piece: null }
    // TODO: FIX THIS BUG. When I drag a block and drop it in its origin stack below its current position it in 1 off in position. I think it has to do with the fact that the block is removed from the stack before being added back in. I think the index is off by 1 because of this. I think the fix is to not remove the block from the stack until after the new block is added. I think this is a bug in the addPieceToStack() function
    const isDroppingInSameStack = index?.stack === stackIndex
    if (index?.stack === stackIndex) console.log('SAME STACK')
    this.stacksData = addPieceToStack(stackIndex, blockIndex, piece ?? this.generatePiece(), this.stacksData, isDroppingInSameStack)
  }

  // removal actions
  findAndRemoveBlock = (id: string) => {
    return findAndRemoveBlock(id, this.stacksData)
  }

  clearEmptyStacks = () => {
    this.stacksData = clearEmptyStacks(this.stacksData)
  }

  clearWorkspace = () => {
    this.stacksData = []
  }
}

import { observer } from 'mobx-react-lite'

import { type aggulativeStackIndexI, type stackI } from '-/build-your-own/shared/typing/build-your-own.types'
import { DropZone } from './DropZone'
import { Block } from './block'

interface propsI {
  index: number
  stack: stackI
  isDragging: boolean
  isDraggingPieceId: string
  validDrop: (dropPosition: aggulativeStackIndexI, creatingNewStackOnDrop: boolean) => boolean
  onStackDrop: (stackIndex: number) => void
  onBlockDrop: (stackIndex: number, blockIndex: number) => void
  onBlockDrag: (isDraggingState: boolean) => void
}
export const Stack = observer(({ index, stack, isDragging, isDraggingPieceId, validDrop, onStackDrop, onBlockDrop, onBlockDrag }: propsI) => {
  const canDropLeft = index === 0 && isDragging && validDrop({ stack: index, block: 0 }, true)
  const canDropRight = isDragging && validDrop({ stack: index + 1, block: 0 }, true)
  return (<div data-testid={`stack-container_${index}`} className="flex a-i-end">
    {canDropLeft && <DropZone testId={`${index}-left`} onDrop={() => { onStackDrop(index) }} />}
    <div>
      {stack.map((block, blockIndex) => <Block
        key={blockIndex}
        block={block}
        index={blockIndex}
        validDrop={(blockIndex: number) => validDrop({ stack: index, block: blockIndex }, false)}
        onDrop={(blockIndex) => { onBlockDrop(index, blockIndex) }}
        onDrag={onBlockDrag}
        isDragging={isDragging}
        isDraggingPieceId={isDraggingPieceId}
      />)}
    </div>
    {canDropRight && <DropZone testId={`${index}-right`} onDrop={() => { onStackDrop(index + 1) }} />}
  </div>)
})

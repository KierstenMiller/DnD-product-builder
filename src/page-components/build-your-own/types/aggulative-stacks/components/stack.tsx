import { observer } from 'mobx-react-lite'

import { type aggulativeStackIndexI, type stackI } from '-/page-components/build-your-own/build-your-own.types'
import { DropZone } from './DropZone'
import { Block } from './block'

interface propsI {
  index: number
  stack: stackI
  isDragging: boolean
  validDrop: (dropPosition: aggulativeStackIndexI, creatingNewStackOnDrop: boolean) => boolean
  onStackDrop: (stackIndex: number) => void
  onBlockDrop: (stackIndex: number, blockIndex: number) => void
  onBlockDrag: (isDraggingState: boolean) => void
}
export const Stack = observer(({ index, stack, isDragging, validDrop, onStackDrop, onBlockDrop, onBlockDrag }: propsI) => {
  const canDropLeft = index === 0 && isDragging && validDrop({ stack: index, block: 0 }, true)
  const canDropRight = isDragging && validDrop({ stack: index + 1, block: 0 }, true)
  return (<div className="flex a-i-end">
        {canDropLeft && <DropZone onDrop={() => { onStackDrop(index) }} />}
        <div data-testid={`stack-container_${index}`}>
            {stack.map((block, blockIndex) => <Block
                key={blockIndex}
                block={block}
                index={blockIndex}
                validDrop={(blockIndex: number) => validDrop({ stack: index, block: blockIndex }, false)}
                onDrop={(blockIndex) => { onBlockDrop(index, blockIndex) }}
                onDrag={onBlockDrag}
                isDragging={isDragging}
            />)}
        </div>
        {canDropRight && <DropZone onDrop={() => { onStackDrop(index + 1) }} />}
    </div>)
})

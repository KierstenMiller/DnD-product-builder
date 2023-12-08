import { observer } from 'mobx-react-lite'

import { type blockI } from '-/page-components/build-your-own/build-your-own.types'
import { DragZone } from '-/page-components/build-your-own/shared/DnD/dragZone'
import { DnDItemTypes, generateBlock } from '-/page-components/build-your-own/types/freeform-matrix/utils/shapes.util'
import { DropZone } from './DropZone'

interface propsI {
  index: number
  block: blockI
  isDragging: boolean
  isDraggingPieceId: string
  validDrop: (index: number) => boolean
  onDrop: (index: number) => void
  onDrag: (isDraggingState: boolean) => void
}
export const Block = observer(({ block, index, isDragging, isDraggingPieceId, validDrop, onDrop, onDrag }: propsI) => {
  const isDraggingSelf = isDragging && isDraggingPieceId === block.piece.id
  const canDropAbove = index === 0 && isDragging && validDrop(index)
  const canDropBelow = isDragging && validDrop(index + 1)
  const aboveDrop = () => { onDrop(index) }
  const belowDrop = () => { onDrop(index + 1) }
  return <div data-testid={`block-container_${block.piece.id}`}>
        <>{canDropAbove && <DropZone testId={`${block.piece.id}-above`} onDrop={aboveDrop} />}</>
        <DragZone
            type={DnDItemTypes.WORKSPACE_ITEM}
            id={block.piece.id}
            setIsDraggingState={onDrag}
        >
            <div data-testid="config" className="text-xx-small">
                <b>{block.piece.id}{isDraggingPieceId === block.piece.id ? 'DRAGGING' : ''}</b><br />
                {block.piece.config.map(c => c.id + ': ' + c.selection + ' - ')}<br />
            </div>

            {generateBlock(block.piece.config)}
        </DragZone>
        <>{canDropBelow && <DropZone testId={`${block.piece.id}-below`} onDrop={belowDrop} />}</>
    </div>
})

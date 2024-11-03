import { observer } from 'mobx-react-lite'

import { ThemeContext } from '-/page-components/build-your-own/build-your-own-page'
import { type blockI } from '-/page-components/build-your-own/build-your-own.types'
import { DragZone } from '-/page-components/build-your-own/shared/DnD/dragZone'
import { DnDItemTypes, generateBlock } from '-/page-components/build-your-own/types/freeform-matrix/utils/shapes.util'
import { getStyles } from '-/util/helpers'
import classNames from 'classnames'
import { useContext } from 'react'
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
  const theme = useContext(ThemeContext)
  const styles = (id: string) => getStyles({}, theme, id)
  const canDropAbove = index === 0 && isDragging && validDrop(index)
  const canDropBelow = isDragging && validDrop(index + 1)
  const aboveDrop = () => { onDrop(index) }
  const belowDrop = () => { onDrop(index + 1) }
  return <div className={styles('block-container')} data-testid={`block-container_${block.piece.id}`}>
        <>{canDropAbove && <DropZone testId={`${block.piece.id}-above`} onDrop={aboveDrop} />}</>
        <DragZone
            type={DnDItemTypes.WORKSPACE_ITEM}
            id={block.piece.id}
            setIsDraggingState={onDrag}
        >
            {/* TODO: Make this understandable for screen reader users. It is dispay: none until then */}
            <div data-testid="config" className={classNames('text-xx-small', styles('config'))}>
                <b>{block.piece.id}{isDraggingPieceId === block.piece.id ? 'DRAGGING' : ''}</b><br />
                {block.piece.config.map(c => c.id + ': ' + c.selection + ' - ')}<br />
            </div>

            {generateBlock(block.piece.config)}
        </DragZone>
        <>{canDropBelow && <DropZone testId={`${block.piece.id}-below`} onDrop={belowDrop} />}</>
    </div>
})

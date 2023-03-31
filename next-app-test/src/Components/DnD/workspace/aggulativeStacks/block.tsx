import { observer } from 'mobx-react-lite'

import { blockI } from '-/page-components/build-your-own/build-your-own.types'
import { generateBlock } from '../shared/shapes.util';
import { canDrop, DragZone, DropZone } from './aggulativeStacks';

interface propsI {
    index: number,
    block: blockI,
    isDragging: boolean,
    onDrop: (index: number) => void,
    onDrag: (isDraggingState: boolean) => void
}
export const Block = observer(({ block, index, isDragging, onDrop, onDrag }: propsI) => {
    const aboveDrop = () => onDrop(index);
    const belowDrop = () => onDrop(index + 1);
    const canDropAbove = index === 0 && isDragging && canDrop();
    const canDropBelow = isDragging && canDrop();
    return <div>
        <>{canDropAbove && <DropZone onDrop={aboveDrop} />}</>
        <DragZone piece={block.piece} setIsDraggingState={onDrag}>
            <div className="text-small">
                {block.piece.id}<br />
                {block.piece.config.map(c => c.id + ': ' + c.selection + ' - ')}<br />
            </div>

            {generateBlock(block.piece.config)}
        </DragZone>
        <>{canDropBelow && <DropZone onDrop={belowDrop} />}</>
    </div>;
})
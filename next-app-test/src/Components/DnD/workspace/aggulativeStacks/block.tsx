import { observer } from 'mobx-react-lite'

import { blockI } from '-/page-components/build-your-own/build-your-own.types'
import { generateBlock } from '../shared/shapes.util';
import { DragZone, DropZone } from './aggulativeStacks';

interface propsI {
    index: number,
    block: blockI,
    isDragging: boolean,
    validDrop: (index: number) => boolean,
    onDrop: (index: number) => void,
    onDrag: (isDraggingState: boolean) => void
}
export const Block = observer(({ block, index, isDragging, validDrop, onDrop, onDrag }: propsI) => {
    const aboveDrop = () => onDrop(index);
    const belowDrop = () => onDrop(index + 1);
    const isValidAbove = validDrop(index);
    const isValidBelow = validDrop(index + 1);
    // console.log(`validity of ${index}`, {isValidAbove, isValidBelow});
    const canDropAbove = index === 0 && isDragging && isValidAbove; // && validDrop();
    const canDropBelow = isDragging && isValidBelow; // && validDrop();
    return <div>
        <>{canDropAbove && <DropZone onDrop={aboveDrop} />}</>
        <DragZone pieceId={block.piece.id} setIsDraggingState={onDrag}>
            <div className="text-small">
                {block.piece.id}<br />
                {block.piece.config.map(c => c.id + ': ' + c.selection + ' - ')}<br />
            </div>

            {generateBlock(block.piece.config)}
        </DragZone>
        <>{canDropBelow && <DropZone onDrop={belowDrop} />}</>
    </div>;
})
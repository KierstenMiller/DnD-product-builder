import { observer } from 'mobx-react-lite'

import { blockI } from '-/page-components/build-your-own/build-your-own.types'
import { DnDItemTypes, generateBlock } from '../../freeform-matrix/utils/shapes.util';
import { DragZone } from '../../../shared/DnD/dragZone';
import { DropZone } from './DropZone';

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
    const canDropAbove = index === 0 && isDragging && validDrop(index);
    const canDropBelow = isDragging && validDrop(index + 1);
    return <div>
        <>{canDropAbove && <DropZone onDrop={aboveDrop} />}</>
        <DragZone
            type={DnDItemTypes.WORKSPACE_ITEM}
            id={block.piece.id}
            setIsDraggingState={onDrag}
        >
            <div className="text-xx-small">
                {block.piece.id}<br />
                {block.piece.config.map(c => c.id + ': ' + c.selection + ' - ')}<br />
            </div>

            {generateBlock(block.piece.config)}
        </DragZone>
        <>{canDropBelow && <DropZone onDrop={belowDrop} />}</>
    </div>;
})
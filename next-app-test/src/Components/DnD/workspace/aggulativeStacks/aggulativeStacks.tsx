import { observer } from 'mobx-react-lite'
import { useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';

import { modifiersT, pieceI } from '-/page-components/build-your-own/build-your-own.types'
import { DnDItemTypes, generateBlock } from '../shared/shapes.util';
import { AggulativeStacks } from '-/page-components/build-your-own/aggulative-stacks.model';
import { overrideConfig } from '-/page-components/build-your-own/build-your-own.util';

interface propsI {
    build: AggulativeStacks,
    modifiers: modifiersT,
}
interface dragZonePropsI {
    piece: pieceI,
    setIsDraggingState: (arg: boolean) => void,
    children: React.ReactNode
}

export const WorkspaceAggulativeStacks = observer(({ build }: propsI) => {
    const { isDraggingDndLayer, draggingPiece } = useDragLayer(monitor => ({
        isDraggingDndLayer: monitor.isDragging() && monitor.getItemType() === DnDItemTypes.ITEM,
        draggingPiece: monitor.getItem()?.piece
    }));
    // using useState hook to track workspace piece dragging. BIG WHY: show/hiding <DropZone /> component shifts the DOM/mouse position of drag action, canceling React DnD's drag. FIX: Setting a timeout to let DnD's onDrag state 'solidify' before show/hiding
    const [isDraggingWorkspacePiece, setIsDraggingWorkspacePiece] = useState(false);
    const isDragging = isDraggingWorkspacePiece || isDraggingDndLayer;
    return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, stackIndex) => <div
            key={stackIndex}
            className="flex a-i-end"
        >
            {stackIndex}
            {isDragging && stackIndex === 0 && <DropZone onDrop={() => build.addStack(stackIndex, draggingPiece)} />}
            <div>
                {stack.map((block, blockIndex) => <div key={block.piece.id}>
                    {blockIndex === 0 && isDragging && <DropZone onDrop={() => build.addToStack(stackIndex, blockIndex, draggingPiece)} />}
                    <DragZone
                        piece={block.piece}
                        setIsDraggingState={setIsDraggingWorkspacePiece}
                    >
                        {block.piece.id}<br/>
                        {block.piece.config.map(c => c.id + ': ' + c.selection + ' - ')}<br/>
                        {generateBlock(overrideConfig(build.config, block.piece.config))}
                    </DragZone>
                    {isDragging && <DropZone onDrop={() => build.addToStack(stackIndex, blockIndex + 1, draggingPiece)} />}
                </div>)}
            </div>
            {isDragging && <DropZone onDrop={() => build.addStack(stackIndex + 1, draggingPiece)} />}
        </div>)}
    </div>)
})
// TODO: generalize and share with freeformMatrix dropZone component
const DragZone = observer(({ piece, setIsDraggingState, children }: dragZonePropsI) => {
    const [, drag] = useDrag(() => ({
        type: DnDItemTypes.WORKSPACE_ITEM,
        item: { piece },
        collect: (monitor) => {
            if (piece && piece.id === monitor?.getItem()?.piece?.id) setTimeout(() => setIsDraggingState(true), 250);
            return { isDragging: !!monitor.isDragging() }
        },
        end: () => setTimeout(() => setIsDraggingState(false), 250)
    }), [])
    return <div ref={drag}>{children}</div>
})
const DropZone = observer(({ onDrop }: { onDrop: () => void }) => {
    const [dropInfo, drop] = useDrop(() => ({
        accept: [DnDItemTypes.ITEM, DnDItemTypes.WORKSPACE_ITEM],
        drop: () => onDrop(),
        collect: (monitor) => ({ isOver: !!monitor.isOver(), canDrop: !!monitor.canDrop(), }),
    }), []);
    return (<div ref={drop} style={{ background: dropInfo.isOver ? 'yellow' : 'white', color: dropInfo.canDrop ? 'blue' : 'red' }}>
        + Add item
    </div>)
})
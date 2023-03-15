import { observer } from 'mobx-react-lite'
import { modifiersT, blockI, pieceI, configT } from '-/page-components/build-your-own/build-your-own.types'
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { blockKeys, blocks, DnDItemTypes, generateBlock } from '../shared/shapes.util';
import { useState } from 'react';
import { AggulativeStacks } from '-/page-components/build-your-own/aggulative-stacks.model';

interface propsI {
    build: AggulativeStacks,
    modifiers: modifiersT,
}
interface dragZonePropsI {
    piece: pieceI,
    setIsDraggingState: (arg: boolean) => void,
    children: React.ReactNode
}
const overrideConfig = (config: configT, overrideConfig: configT) => {
    return config.map(c => (overrideConfig.find(o => o.id === c.id) || c));
}
export const WorkspaceAggulativeStacks = observer(({ build }: propsI) => {
    // for dragging from modifier
    const { isDraggingOutside, draggingPiece } = useDragLayer(monitor => ({
        isDraggingOutside: monitor.isDragging() && monitor.getItemType() === DnDItemTypes.ITEM,
        draggingPiece: monitor.getItem()?.piece
    }));
    // for dragging from workspace. BIG WHY: show/hiding <DropZone /> component shifts the DOM/mouse position of drag action, canceling React DnD's drag. FIX: Setting a timeout to let DnD's onDrag state 'solidify' before show/hiding
    const [isDraggingInside, setIsDraggingInside] = useState(false);
    const isDragging = isDraggingInside || isDraggingOutside;
    return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, stackIndex) => <div
            key={stackIndex}
            // style={{'border': '1px solid red'}}
            className="flex a-i-end"
        >
            {isDragging && stackIndex === 0 && <DropZone onDrop={() => build.addStack(stackIndex, draggingPiece)} />}
            <div>
                {stack.map((block, blockIndex) => <div key={block.piece.id}>
                    {blockIndex === 0 && isDragging && <DropZone onDrop={() => build.addToStack(stackIndex, blockIndex, draggingPiece)} />}
                    <DragZone
                        piece={block.piece}
                        setIsDraggingState={setIsDraggingInside}
                    >
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
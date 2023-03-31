import { observer } from 'mobx-react-lite'
import { useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';

import { modifiersT, pieceI, validationT } from '-/page-components/build-your-own/build-your-own.types'
import { DnDItemTypes } from '../shared/shapes.util';
import { AggulativeStacks } from '-/page-components/build-your-own/aggulative-stacks.model';
import { Stack } from './stack';

export const canDrop = () => { /*TODO: implement*/ return true; }

interface propsI {
    build: AggulativeStacks,
    modifiers: modifiersT,
    validation: validationT,
}

export const WorkspaceAggulativeStacks = observer(({ build, validation }: propsI) => {
    // using useState hook to track workspace piece dragging. BIG WHY: show/hiding <DropZone /> component shifts the DOM/mouse position of drag action, canceling React DnD's drag. FIX: Setting a timeout to let DnD's onDrag state 'solidify' before show/hiding
    const [isDraggingWorkspace, setIsDraggingWorkspace] = useState(false);
    const { isDraggingDndLayer, draggingPieceId } = useDragLayer(monitor => {
        console.log('DND PIECE', monitor.getItem()?.pieceId);
        return {
            isDraggingDndLayer: monitor.isDragging() && monitor.getItemType() === DnDItemTypes.ITEM,
            draggingPieceId: monitor.getItem()?.pieceId
        }
    }); 
    const isDragging = isDraggingWorkspace || isDraggingDndLayer;
    const onStackDrop = (stackIndex: number) => build.addStack(stackIndex, draggingPieceId)
    const onBlockDrop = (stackIndex: number, blockIndex: number) => build.addToStack(stackIndex, blockIndex, draggingPieceId)
    const onBlockDrag = (isDraggingState: boolean) => setIsDraggingWorkspace(isDraggingState);
    return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, index) => <Stack
            key={index}
            index={index}
            stack={stack}
            isDragging={isDragging}
            onStackDrop={onStackDrop}
            onBlockDrop={onBlockDrop}
            onBlockDrag={onBlockDrag}
        />)}
    </div>)
})

// TODO: move to another file
interface dragZonePropsI {
    pieceId: string,
    setIsDraggingState: (arg: boolean) => void,
    children: React.ReactNode
}
// TODO: generalize and share with freeformMatrix dropZone component
export const DragZone = observer(({ pieceId, setIsDraggingState, children }: dragZonePropsI) => {
    console.log('----DragZone rerender', pieceId)
    const [, drag] = useDrag(() => ({
        type: DnDItemTypes.WORKSPACE_ITEM,
        item: () => {
            console.log('SETTING ITEM TO BE', pieceId);
            return { pieceId: pieceId }
        }, // HERE
        collect: (monitor) => {
            if ( pieceId === monitor?.getItem()?.pieceId) setTimeout(() => setIsDraggingState(true), 250);
            return { isDragging: !!monitor.isDragging() }
        },
        end: () => setTimeout(() => setIsDraggingState(false), 250)
    }), [])
    return <div ref={drag}>{children}</div>
})
export const DropZone = observer(({ onDrop }: { onDrop: () => void }) => {
    const [dropInfo, drop] = useDrop(() => ({
        accept: [DnDItemTypes.ITEM, DnDItemTypes.WORKSPACE_ITEM],
        drop: () => onDrop(),
        collect: (monitor) => ({ isOver: !!monitor.isOver(), canDrop: !!monitor.canDrop(), }),
    }), []);
    return (<div ref={drop} style={{ background: dropInfo.isOver ? 'yellow' : 'white', color: dropInfo.canDrop ? 'blue' : 'red' }}>
        + Add item
    </div>)
})
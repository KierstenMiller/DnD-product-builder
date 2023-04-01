import { observer } from 'mobx-react-lite'
import { useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';

import { modifiersT, pieceI, stackI, validationLibraryT, validationT } from '-/page-components/build-your-own/build-your-own.types'
import { DnDItemTypes } from '../shared/shapes.util';
import { AggulativeStacks } from '-/page-components/build-your-own/aggulative-stacks.model';
import { Stack } from './stack';
import { validationValues } from '-/Components/modifier/modifier.types';

interface propsI {
    build: AggulativeStacks,
    modifiers: modifiersT,
    validationLibrary: validationLibraryT,
}

export const WorkspaceAggulativeStacks = observer(({ build, validationLibrary }: propsI) => {
    // using useState hook to track workspace piece dragging. BIG WHY: show/hiding <DropZone /> component shifts the DOM/mouse position of drag action, canceling React DnD's drag. FIX: Setting a timeout to let DnD's onDrag state 'solidify' before show/hiding
    const [isDraggingWorkspace, setIsDraggingWorkspace] = useState(false);
    // only passing pieceId at reccommendation of DnD Documentation
    const { draggingPieceId, isDraggingDndLayer } = useDragLayer(monitor => ({ draggingPieceId: monitor.getItem()?.id, isDraggingDndLayer: monitor.isDragging() && monitor.getItemType() === DnDItemTypes.ITEM }));
    const isDragging = isDraggingWorkspace || isDraggingDndLayer;

    const draggingPiece = build.findPiece(draggingPieceId);
    const validDrop = (dropPosition: {stack: number, block: number}) => {
        const applicableValidation = validationLibrary.map(modLevel => {
            const options = draggingPiece?.config?.filter(c => c.id === modLevel.id);
            return modLevel.validation.filter(v => options?.some(o => o.selection === v.id));
        })[0][0];
        return (applicableValidation?.validation) ? build.isValidDrop(dropPosition, applicableValidation.validation) : true;
    }
    
    const onStackDrop = (stackIndex: number) => build.addStack(stackIndex, draggingPieceId)
    const onBlockDrop = (stackIndex: number, blockIndex: number) => build.addToStack(stackIndex, blockIndex, draggingPieceId)
    const onBlockDrag = (isDraggingState: boolean) => setIsDraggingWorkspace(isDraggingState);
    console.log('build.stacks', build.stacks);
    return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, index) => <Stack
            key={index}
            index={index}
            stack={stack}
            isDragging={isDragging}
            validDrop={validDrop}
            onStackDrop={onStackDrop}
            onBlockDrop={onBlockDrop}
            onBlockDrag={onBlockDrag}
        />)}
    </div>)
})

// TODO: move to another file
interface dragZonePropsI {
    pieceId: string,
    setIsDraggingState: (isDragging: boolean) => void,
    children: React.ReactNode
}
// TODO: generalize and share with freeformMatrix dropZone component
export const DragZone = observer(({ pieceId, setIsDraggingState, children }: dragZonePropsI) => {
    const [, drag] = useDrag(() => ({
        type: DnDItemTypes.WORKSPACE_ITEM,
        item: { id: pieceId },
        collect: (monitor) => {
            if (pieceId && pieceId === monitor.getItem()?.id) setTimeout(() => setIsDraggingState(true), 250);
            return { isDragging: !!monitor.isDragging() }
        },
        end: () => setTimeout(() => setIsDraggingState(false), 250)
    }), [pieceId])
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
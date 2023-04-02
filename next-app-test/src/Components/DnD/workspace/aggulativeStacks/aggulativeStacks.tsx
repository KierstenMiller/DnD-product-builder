import { observer } from 'mobx-react-lite'
import { useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';

import { blockIndexI, modifiersT, pieceI, stackI, validationLibraryT, validationT } from '-/page-components/build-your-own/build-your-own.types'
import { DnDItemTypes } from '../shared/shapes.util';
import { addPieceToStack, AggulativeStacks, pieceInValidPosition, validDrop } from '-/page-components/build-your-own/aggulative-stacks.model';
import { Stack } from './stack';
import { validationValues } from '-/Components/modifier/modifier.types';

interface propsI {
    build: AggulativeStacks,
    modifiers: modifiersT,
    validationLibrary: validationLibraryT,
}

const getValidation = (validationLibrary: validationLibraryT, piece: pieceI) => {
    const result = validationLibrary.map(modLevel => {
        const options = piece?.config?.filter(c => c.id === modLevel.id);
        return modLevel.validation.filter(v => options?.some(o => o.selection === v.id));
    })[0][0]?.validation
    return result;
}

const isValidStack = (validationLibrary: validationLibraryT, stack: stackI) => {
    const result = stack.map((b, index) => ({index, pieceValidation:getValidation(validationLibrary, b.piece)}))
    return result.map(r => (pieceInValidPosition(r.index, r.pieceValidation))).every(r => r);
    //console.log('RESULT: ', result);
    //validDrop(dropPosition, getValidation(validationLibrary, b.piece), stack)
    //console.log('valid position', result.map(r => (pieceInValidPosition(r.index, r.v))))
    //const result2 = result.validDrop(result.inde, validation: validationT, stack: stackI)
}

export const WorkspaceAggulativeStacks = observer(({ build, validationLibrary }: propsI) => {
    // using useState hook to track workspace piece dragging. BIG WHY: show/hiding <DropZone /> component shifts the DOM/mouse position of drag action, canceling React DnD's drag. FIX: Setting a timeout to let DnD's onDrag state 'solidify' before show/hiding
    const [isDraggingWorkspace, setIsDraggingWorkspace] = useState(false);
    // only passing pieceId at reccommendation of DnD Documentation
    const { draggingPieceId, isDraggingDndLayer } = useDragLayer(monitor => ({ draggingPieceId: monitor.getItem()?.id, isDraggingDndLayer: monitor.isDragging() && monitor.getItemType() === DnDItemTypes.ITEM }));
    const isDragging = isDraggingWorkspace || isDraggingDndLayer;

    const draggingPiece = build.findPiece(draggingPieceId);
    
    const isValidPositionForDraggingPieceValidationCriteria = (dropPosition: blockIndexI) => {
        const applicableValidation = getValidation(validationLibrary, dropPosition.stack);
        return (applicableValidation) ? build.isValidDrop(dropPosition, applicableValidation) : true;
    }
    const validDrop2 = (dropPosition: blockIndexI) => {
        if (!draggingPiece) return true;
        const validForPiece = isValidPositionForDraggingPieceValidationCriteria(dropPosition);
        if (!validForPiece) return false;
        const ghostStacks = build.stacks.map(s => s.map(b => ({piece: {...b.piece, config: b.piece.config.map(c => ({...c}))}}))).slice(); // MAKE NON-OBSERVABLE COPY
        const ghostPiece = {...draggingPiece, config: draggingPiece.config.map(c => ({...c}))};
        const newGhostStacks = addPieceToStack(dropPosition.stack, dropPosition.block, ghostPiece, ghostStacks)
        const ghostValidation1 = getValidation(validationLibrary, ghostPiece);
        const allStacksAreValid = newGhostStacks.map(s => isValidStack(validationLibrary, s));
        console.log('allStacksAreValid', allStacksAreValid);
        // const ghostyValidStack = validDrop(dropPosition.block, ghostValidation, newGhostStacks[dropPosition.stack]) //ghostStacks.map(s => validDrop(dropPosition.block, ghostValidation, s)).every(i => i);
        // console.log('testing', getValidation(validationLibrary, newGhostStacks[dropPosition.stack][1].piece), validDrop(
        //     1,
        //     getValidation(validationLibrary, newGhostStacks[dropPosition.stack][1].piece),
        //     newGhostStacks[dropPosition.stack]
        // ))
        // console.log('result', {validForPiece, newGhostStacks, dropPosition})
        return validForPiece && allStacksAreValid.every(s => s);
    }

    const onStackDrop = (stackIndex: number) => build.addStack(stackIndex, draggingPieceId)
    const onBlockDrop = (stackIndex: number, blockIndex: number) => build.addToStack(stackIndex, blockIndex, draggingPieceId)
    const onBlockDrag = (isDraggingState: boolean) => setIsDraggingWorkspace(isDraggingState);
    // console.log('build.stacks', build.stacks);
    return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, index) => <Stack
            key={index}
            index={index}
            stack={stack}
            isDragging={isDragging}
            validDrop={validDrop2}
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
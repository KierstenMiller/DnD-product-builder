import { observer } from 'mobx-react-lite'
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import { DnDItemTypes, matrixIndexI, pieceI } from './workspace.util'

export type onDropI = (matrixIndex: matrixIndexI, swapIndex?: matrixIndexI) => void;
export type onRemoveI = (matrixIndex: matrixIndexI) => void;
export type onMoveI = (matrixIndex: matrixIndexI) => void;

interface propsI {
    matrixIndex: matrixIndexI,
    onDrop: onDropI,
    // optional
    piece?: pieceI,
    onRemove?: onRemoveI,
    onMove?: onMoveI,
}

export const DropZone = observer(({matrixIndex, piece, onDrop, onRemove, onMove}: propsI) => {
    const realizedImage = (typeof piece?.image === 'function') ? piece.image() : piece?.image
    const zoneRef = useRef();
    const [dropInfo, drop] = useDrop(
        () => ({
            accept: [DnDItemTypes.ITEM, DnDItemTypes.WORKSPACE_ITEM],
            drop: ({dragStartIndex}: any) => { // TODO: figure out better typing
                console.log('item DROPPED', dragStartIndex)
                onDrop(matrixIndex, dragStartIndex)
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [],
    )
    const [dragInfo, drag, preview] = useDrag(
        () => ({
            type: DnDItemTypes.WORKSPACE_ITEM,
            item: {dragStartIndex: matrixIndex},
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [],
    )
    drop(drag(zoneRef));
   return (<div
        ref={zoneRef}
        style={{
            width: '100px',
            height: '100px',
            background: dropInfo.isOver ? 'yellow' : 'white',
            color: dropInfo.canDrop ? 'blue' : 'red',
        }}
    >
        {matrixIndex.column} - {matrixIndex.row}
        {realizedImage}
        {realizedImage && onRemove && <button onClick={() => onRemove(matrixIndex)}>Clear</button>}
        {realizedImage && onMove && <button onClick={() => onMove(matrixIndex)}>Move</button>}
    </div>)
})

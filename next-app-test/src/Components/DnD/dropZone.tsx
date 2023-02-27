import { matrixIndexCoordinatesI, pieceI } from '-/page-components/build-your-own/build-your-own.types';
import { observer } from 'mobx-react-lite'
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import { DnDItemTypes } from './workspace/freeformMatrix/freeformMatrix.util'

export type onDropI = (matrixIndex: matrixIndexCoordinatesI, swapIndex?: matrixIndexCoordinatesI) => void;
export type onRemoveI = (matrixIndex: matrixIndexCoordinatesI) => void;
export type onMoveI = (matrixIndex: matrixIndexCoordinatesI) => void;
interface propsI {
    matrixIndex: matrixIndexCoordinatesI,
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
        {matrixIndex.row} - {matrixIndex.column}
        {realizedImage}
        {realizedImage && onRemove && <button onClick={() => onRemove(matrixIndex)}>Clear</button>}
        {realizedImage && onMove && <button onClick={() => onMove(matrixIndex)}>Move</button>}
    </div>)
})

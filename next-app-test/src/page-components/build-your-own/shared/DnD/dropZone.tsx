import { matrixIndexCoordinatesI, pieceI } from '-/page-components/build-your-own/build-your-own.types';
import { observer } from 'mobx-react-lite'
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import { DnDItemTypes, generateImage } from '../../types/freeform-matrix/utils/shapes.util'

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
    const zoneRef = useRef();
    const image = piece ? generateImage(piece.config) : null;
    const [dropInfo, drop] = useDrop(
        () => ({
            accept: [DnDItemTypes.ITEM, DnDItemTypes.WORKSPACE_ITEM],
            drop: ({dragStartIndex}: {dragStartIndex: matrixIndexCoordinatesI}) => {
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
        <div className="text-small">{piece?.config.map(c => <div key={c.value}>{c.value}</div>)}</div>
        {matrixIndex.row} - {matrixIndex.column}
        {image}
        {image && onRemove && <button onClick={() => onRemove(matrixIndex)}>Clear</button>}
        {image && onMove && <button onClick={() => onMove(matrixIndex)}>Move</button>}
    </div>)
})

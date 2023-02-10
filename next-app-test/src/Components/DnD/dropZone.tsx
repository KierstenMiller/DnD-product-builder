import { observer } from 'mobx-react-lite'
import { useDrop } from 'react-dnd'
import { DnDItemTypes, matrixIndexI, pieceI } from './workspace.util'

export type onDropI = (matrixIndex: matrixIndexI) => void;
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
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: DnDItemTypes.ITEM,
            drop: () => onDrop(matrixIndex),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [],
    )
    const realizedImage = (typeof piece?.image === 'function') ? piece.image() : piece?.image
    return (<div
        ref={drop}
        style={{
            width: '100px',
            height: '100px',
            background: isOver ? 'yellow' : 'white',
            color: canDrop ? 'blue' : 'red',
        }}
    >
        {realizedImage}
        {onRemove && <button onClick={() => onRemove(matrixIndex)}>Clear</button>}
        {onMove && <button onClick={() => onMove(matrixIndex)}>Move</button>}
    </div>)
})

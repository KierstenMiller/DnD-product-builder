import { observer } from 'mobx-react-lite'
import { useDrop } from 'react-dnd'
import { DnDItemTypes, matrixIndexI, pieceI } from './workspace.util'

export type onDropI = (matrixIndex: matrixIndexI) => void;
export type onEditI = (matrixIndex: matrixIndexI) => void;

interface propsI {
    matrixIndex: matrixIndexI,
    onDrop: onDropI,
    // optional
    piece?: pieceI,
    onEdit?: (matrixIndex: matrixIndexI) => void,
}

export const DropZone = observer(({matrixIndex, piece, onDrop, onEdit }: propsI) => {
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
        <div className="flex">
            {onEdit && <button style={{minHeight: '44px', minWidth: '44px'}} onClick={() => onEdit(matrixIndex)}>Edit</button>}
            <button style={{minHeight: '44px', minWidth: '44px'}} onClick={() => console.log('todo: drag')}>Drag</button>
        </div>
    </div>)
})

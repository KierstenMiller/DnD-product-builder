import { observer } from 'mobx-react-lite'
import { useDrop } from 'react-dnd'
import { DnDItemTypes, matrixIndexI, pieceI } from './workspace.util'

export type onDropI = (matrixIndex: matrixIndexI) => void

interface propsI {
    matrixIndex: matrixIndexI,
    onDrop: onDropI,
    piece?: pieceI
}

export const DropZone = observer(({matrixIndex, onDrop, piece}: propsI) => {
    // console.log('rerender DropZone', {matrixIndex, piece});
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: DnDItemTypes.ITEM,
            //   canDrop: () => game.canMoveKnight(x, y),
            drop: () => onDrop(matrixIndex),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [],
    )
    return (<div
        ref={drop}
        style={{
            width: '100px',
            height: '100px',
            background: isOver ? 'yellow' : 'white',
            color: canDrop ? 'blue' : 'red',
        }}
    >
        DROP ZONE
        {piece && piece.id}
        {piece?.image && piece.image}
    </div>)
})

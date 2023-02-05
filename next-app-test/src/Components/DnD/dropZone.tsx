import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export enum DnDItemTypes {
    ITEM = "item",
}

export interface matrixIndexI {
    row: number,
    column: number,
}

interface propsI {
    matrixIndex: matrixIndexI,
    onDrop: (matrixIndex: matrixIndexI) => void,
    piece?: {id: string, imageUrl: string},
}

export const DropZone = observer(({matrixIndex, onDrop, piece}: propsI) => {
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
        {piece && <img height={30} width={30} src={piece?.imageUrl} />}
    </div>)
})

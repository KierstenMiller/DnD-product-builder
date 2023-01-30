import { observer } from 'mobx-react-lite'
import { useDrag, useDrop } from 'react-dnd'

export enum DnDItemTypes {
    ITEM = "item",
}

export const DropZone = observer(() => {
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: DnDItemTypes.ITEM,
            //   canDrop: () => game.canMoveKnight(x, y),
            //   drop: () => game.moveKnight(x, y),
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
    </div>)
})

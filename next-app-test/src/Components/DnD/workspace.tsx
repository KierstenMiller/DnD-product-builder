import { observer } from 'mobx-react-lite'
import { useDrag, useDrop } from 'react-dnd'

export enum DnDItemTypes {
    ITEM = "item",
}

export const Workspace = observer(() => {
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
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: DnDItemTypes.ITEM,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [],
    )
    return (<div>
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            ♘
        </div>
        <div
            ref={drop}>
            DROP ZONE
            {isOver && !canDrop && "is over - can't drop"}
            {!isOver && canDrop && "is not over - can drop"}
            {isOver && canDrop && "is over - can drop"}
        </div>
    </div>
    )
})

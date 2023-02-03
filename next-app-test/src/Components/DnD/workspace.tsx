import { observer } from 'mobx-react-lite'
import { useDrag, useDrop } from 'react-dnd'
import { DropZone } from './dropZone'

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
    return (<div className="flex">
        <div>
            <DropZone />
            <DropZone />
            <DropZone />
            <DropZone />
        </div>
        <div>
            <DropZone />
            <DropZone />
            <DropZone />
            <DropZone />
        </div>
        <div>
            <DropZone />
            <DropZone />
            <DropZone />
            <DropZone />
        </div>
    </div>)
})

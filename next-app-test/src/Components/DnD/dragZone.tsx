import { observer } from 'mobx-react-lite'
import { useDrag, useDrop } from 'react-dnd'
import { DropZone } from './dropZone'

export enum DnDItemTypes {
    ITEM = "item",
}

export const DragZone = observer(() => {
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: DnDItemTypes.ITEM,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [],
    )
    return (<div
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
        }}
    >
        Drag me
    </div>)
})

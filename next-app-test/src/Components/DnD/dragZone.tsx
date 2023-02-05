import { observer } from 'mobx-react-lite'
import { useDrag } from 'react-dnd'
import { colors, DnDItemTypes, icons } from './workspace.util'

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
    const image = icons.star({fill: colors.red, stroke: colors.blue})
    return (<div
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
        }}
    >
        Drag me
        {image}
    </div>)
})

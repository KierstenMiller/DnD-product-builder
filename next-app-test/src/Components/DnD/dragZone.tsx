import { observer } from 'mobx-react-lite'
import { useDrag } from 'react-dnd'
import { DnDItemTypes } from './workspace.util'

export const DragZone = observer(({children}: {children: React.ReactNode}) => {
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
        {children}
    </div>)
})

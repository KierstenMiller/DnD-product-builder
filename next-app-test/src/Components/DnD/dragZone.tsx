import { observer } from 'mobx-react-lite'
import { useDrag } from 'react-dnd'
import { DnDItemTypes } from './workspace/freeformMatrix/freeformMatrix.util'

export const DragZone = observer(({onDrag, children}: {onDrag?: () => void, children: React.ReactNode}) => {
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: DnDItemTypes.ITEM,
            collect: (monitor) => {
                console.log('isDragging monitor', monitor.isDragging());
                if(onDrag && monitor.isDragging()) onDrag();
                return {isDragging: !!monitor.isDragging()};
            },
        }),
        [],
    )
    return (<div
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
        }}
    >
        Drag me {isDragging ? 'DRAGGING' : 'NAH'}
        {children}
    </div>)
})

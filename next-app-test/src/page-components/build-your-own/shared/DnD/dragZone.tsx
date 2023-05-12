import { observer } from 'mobx-react-lite'
import { useDrag } from 'react-dnd'
import { DnDItemTypes } from '../../types/freeform-matrix/utils/shapes.util'

interface dragZonePropsI {
    type: DnDItemTypes,
    children: React.ReactNode
    // optional
    id?: string,
    onDrag?: () => void | undefined,
    setIsDraggingState?: (isDragging: boolean) => void,

}

export const DragZone = observer(({ type, id, setIsDraggingState, onDrag, children }: dragZonePropsI) => {
    const [, drag] = useDrag(() => ({
        type: type,
        item: { id },
        collect: (monitor) => {
            if (setIsDraggingState && id && id === monitor.getItem()?.id) setTimeout(() => setIsDraggingState(true), 250);
            if (onDrag && !!monitor.isDragging()) onDrag();
        },
        end: () => setTimeout(() => setIsDraggingState && setIsDraggingState(false), 250)
    }), [id])
    return <div ref={drag}>{children}</div>
})

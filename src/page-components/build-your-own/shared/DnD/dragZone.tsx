import { observer } from 'mobx-react-lite'
import { useDrag } from 'react-dnd'

import { type DnDItemTypes } from '-/page-components/build-your-own/types/freeform-matrix/utils/shapes.util'

interface dragZonePropsI {
  type: DnDItemTypes
  children: React.ReactNode
  // optional
  id?: string
  onDrag?: () => void
  setIsDraggingState?: (isDragging: boolean) => void

}

export const DragZone = observer(({ type, id, setIsDraggingState, onDrag, children }: dragZonePropsI) => {
  const [, drag] = useDrag(() => ({
    type,
    item: { id },
    collect: (monitor) => {
      if (setIsDraggingState && id && id === monitor.getItem()?.id) setTimeout(() => { setIsDraggingState(true) }, 250)
      if (onDrag && !!monitor.isDragging()) onDrag()
    },
    end: () => setTimeout(() => { setIsDraggingState && setIsDraggingState(false) }, 250)
  }), [id])
  return <div data-testid={`dragzone_${id}`} ref={drag}>{children}</div>
})

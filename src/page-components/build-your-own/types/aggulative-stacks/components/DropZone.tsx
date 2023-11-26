import { observer } from 'mobx-react-lite'
import { useDrop } from 'react-dnd'

import { DnDItemTypes } from '-/page-components/build-your-own/types/freeform-matrix/utils/shapes.util'

export const DropZone = observer(({ onDrop, testId }: { onDrop: () => void, testId?: string }) => {
  const [dropInfo, drop] = useDrop(() => ({
    accept: [DnDItemTypes.ITEM, DnDItemTypes.WORKSPACE_ITEM],
    drop: () => { onDrop() },
    collect: (monitor) => ({ isOver: !!monitor.isOver(), canDrop: !!monitor.canDrop() })
  }), [])
  return (<div data-testid={`dropzone_${testId}`} ref={drop} style={{ background: dropInfo.isOver ? 'yellow' : 'white', color: dropInfo.canDrop ? 'blue' : 'red' }}>
    + Add item
  </div>)
})

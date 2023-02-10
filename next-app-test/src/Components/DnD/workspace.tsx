import { observer } from 'mobx-react-lite'
import { DropZone, onDropI, onMoveI, onRemoveI,  } from './dropZone'
import { matrixMock,  } from './workspace.util'

interface propsI {
    matrix: typeof matrixMock, // TODO: make matrix typing
    onDrop: onDropI,
    onRemove: onRemoveI,
    onMove: onMoveI,
}

export const Workspace = observer(({matrix, onDrop, onRemove, onMove}: propsI) => { 
    return (<div className="flex">
        {/* TODO: make a index that isn't from the iterator index */}
        {matrix.map((r, i) => <div key={i}>
            {r.map(c => <DropZone
                key={`${c.matrixIndex.row}-${c.matrixIndex.column}`}
                matrixIndex={c.matrixIndex}
                onDrop={onDrop}
                piece={c.piece}
                onRemove={onRemove}
            />)}
        </div>)}
    </div>)
})

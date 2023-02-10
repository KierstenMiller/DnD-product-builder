import { observer } from 'mobx-react-lite'
import { DropZone, onDropI, onRemoveI,  } from './dropZone'
import { matrixMock,  } from './workspace.util'

export const Workspace = observer(({matrix, onDrop, onRemove}: {matrix: typeof matrixMock, onDrop: onDropI, onRemove: onRemoveI}) => { // TODO: make matrix typing
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

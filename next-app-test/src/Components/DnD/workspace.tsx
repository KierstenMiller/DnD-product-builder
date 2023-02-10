import { observer } from 'mobx-react-lite'
import { DropZone, onDropI } from './dropZone'
import { matrixMock,  } from './workspace.util'

export const Workspace = observer(({matrix, onDrop}: {matrix: typeof matrixMock, onDrop: onDropI}) => { // TODO: make matrix typing
    return (<div className="flex">
        {/* TODO: make a index that isn't from the iterator index */}
        {matrix.map((r, i) => <div key={i}>
            {r.map(c => <DropZone
                key={`${c.matrixIndex.row}-${c.matrixIndex.column}`}
                matrixIndex={c.matrixIndex}
                onDrop={onDrop}
                piece={c.piece}
                onEdit={() => console.log('todo')}
            />)}
        </div>)}
    </div>)
})

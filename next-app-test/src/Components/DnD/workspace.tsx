import { observer } from 'mobx-react-lite'
import { DropZone, onDropI } from './dropZone'
import { matrixMock } from './workspace.util'

export const Workspace = observer(({matrix, onDrop}: {matrix: typeof matrixMock,onDrop: onDropI}) => {
    return (<div className="flex">
        {/* TODO: make a index that isn't from the iterator index */}
        {matrixMock.map((r, i) => <div key={i}>
            {r.map(c => <DropZone
                key={`${c.matrixIndex.row}-${c.matrixIndex.column}`}
                piece={c.piece}
                matrixIndex={c.matrixIndex}
                onDrop={onDrop}
            />)}
        </div>)}
    </div>)
})

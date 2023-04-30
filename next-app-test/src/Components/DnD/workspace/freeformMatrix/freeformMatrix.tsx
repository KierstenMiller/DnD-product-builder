import { observer } from 'mobx-react-lite'
import { DropZone } from '../../dropZone'
import { matrixIndexCoordinatesI } from '-/page-components/build-your-own/build-your-own.types'
import { FreeformMatrixModel } from '-/page-components/build-your-own/models/freeform-grid.model';

interface propsI {
    build: FreeformMatrixModel,
}

export const WorkspaceFreeformMatrix = observer(({build}: propsI) => { 
    const onDrop = (matrixIndex: matrixIndexCoordinatesI, swapIndex?: matrixIndexCoordinatesI) => {
        swapIndex ? build.swapPieces(matrixIndex, swapIndex) : build.setMatrixIndexPiece({matrixIndex});  
    };
    const onRemove = (matrixIndex: matrixIndexCoordinatesI) => build.removeMatrixIndexPiece(matrixIndex);
    return (<div className="flex">
        {/* TODO: make a index that isn't from the iterator index */}
        {build.matrix.map((r, i) => <div key={i}>
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

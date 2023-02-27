import { observer } from 'mobx-react-lite'

import { DropZone } from '../../dropZone'
import { matrixIndexCoordinatesI } from '-/page-components/build-your-own/build-your-own.types'
import { Matrix } from '-/page-components/build-your-own/freeform-grid.model';

interface propsI {
    matrix: Matrix,
}

export const WorkspaceFreeformMatrix = observer(({matrix}: propsI) => { 
    const onDrop = (matrixIndex: matrixIndexCoordinatesI, swapIndex?: matrixIndexCoordinatesI) => {
        swapIndex ? matrix.swapPieces(matrixIndex, swapIndex) : matrix.setMatrixIndexPiece({matrixIndex});  
    };
    const onRemove = (matrixIndex: matrixIndexCoordinatesI) => matrix.removeMatrixIndexPiece(matrixIndex);
    return (<div className="flex">
        {/* TODO: make a index that isn't from the iterator index */}
        {matrix.matrix.map((r, i) => <div key={i}>
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

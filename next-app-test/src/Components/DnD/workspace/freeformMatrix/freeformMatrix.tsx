import { observer } from 'mobx-react-lite'

import { Matrix } from '-/page-components/build-your-own/build-your-own-model'
import { DropZone } from '../../dropZone'
import { matrixIndexCoordinatesI, modifiersT } from '-/page-components/build-your-own/build-your-own.types'

interface propsI {
    matrix: Matrix,
    modifiers: modifiersT,
}

export const WorkspaceFreeformMatrix = observer(({matrix, modifiers}: propsI) => { 
    const onDrop = (matrixIndex: matrixIndexCoordinatesI, swapIndex?: matrixIndexCoordinatesI) => {
        if(swapIndex) matrix.swapPieces(matrixIndex, swapIndex)
        else {
            matrix.setMatrixIndexPiece(matrixIndex);
            matrix.setMatrixIndexPieceImage(matrixIndex, modifiers);
        }
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

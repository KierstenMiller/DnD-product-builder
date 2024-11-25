import { observer } from 'mobx-react-lite'

import { type matrixIndexCoordinatesI } from '-/build-your-own/shared/typing/build-your-own.types'
import { type FreeformMatrixBuildModel } from '-/build-your-own/workspace-specific-files/freeform-matrix/models/freeform-grid.model'
import { DropZone } from './dropZone'

interface propsI {
  build: FreeformMatrixBuildModel
}

export const FreeformMatrixWorkspace = observer(({ build }: propsI) => {
  const onDrop = (matrixIndex: matrixIndexCoordinatesI, swapIndex?: matrixIndexCoordinatesI) => { swapIndex ? build.swapPieces(matrixIndex, swapIndex) : build.setMatrixIndexPiece({ matrixIndex }) }
  const onRemove = (matrixIndex: matrixIndexCoordinatesI) => { build.removeMatrixIndexPiece(matrixIndex) }
  // NOTE: using the map method's index is ok here as the matrix indices should never change.
  return (<div className="flex">
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

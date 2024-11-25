import { observer } from 'mobx-react-lite'

import { AddModal, type AddModalOnClickI } from '-/build-your-own/shared/add-modal-component/addModal'
import { DragZone } from '-/build-your-own/shared/dnd-compnents/dragZone'
import { type configT } from '-/build-your-own/shared/typing/build-your-own.types'
import { type FreeformMatrixBuildModel } from '-/build-your-own/workspace-specific-files/freeform-matrix/models/freeform-grid.model'
import { DnDItemTypes, generateImage } from '-/build-your-own/workspace-specific-files/freeform-matrix/utils/shapes.util'

export const FreeformMatrixDisplay = observer(({ config, build }: { config: configT, build: FreeformMatrixBuildModel }) => {
  const image = generateImage(config)
  const onModalAdd = ({ matrixIndex }: AddModalOnClickI) => { build.setMatrixIndexPiece({ matrixIndex }) }
  return (<div data-testid="freeform-dragzone" className="flex">
    <DragZone type={DnDItemTypes.ITEM}>
      {image}
    </DragZone>
    <AddModal image={image} onSubmit={onModalAdd} />
  </div>)
})

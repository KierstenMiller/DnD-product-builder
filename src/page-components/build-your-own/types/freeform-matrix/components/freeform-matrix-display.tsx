import { observer } from 'mobx-react-lite'

import { type configT } from '-/page-components/build-your-own/build-your-own.types'
import { DragZone } from '-/page-components/build-your-own/shared/DnD/dragZone'
import { AddModal, type AddModalOnClickI } from '-/page-components/build-your-own/shared/addModal'
import { type FreeformMatrixBuildModel } from '-/page-components/build-your-own/types/freeform-matrix/models/freeform-grid.model'
import { DnDItemTypes, generateImage } from '-/page-components/build-your-own/types/freeform-matrix/utils/shapes.util'

export const FreeformMatrixDisplay = observer(({ config, build }: { config: configT, build: FreeformMatrixBuildModel }) => {
  const image = generateImage(config)
  const onModalAdd = ({ matrixIndex }: AddModalOnClickI) => { build.setMatrixIndexPiece({ matrixIndex }) }
  return (<div className="flex">
        <DragZone type={DnDItemTypes.ITEM}>
            {image}
        </DragZone>
        <AddModal image={image} onSubmit={onModalAdd} />
    </div>)
})

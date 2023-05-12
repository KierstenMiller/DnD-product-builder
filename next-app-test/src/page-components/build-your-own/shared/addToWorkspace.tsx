import { observer } from 'mobx-react-lite'

import { DragZone } from '-/page-components/build-your-own/shared/DnD/dragZone'
import { AddModal, AddModalOnClickI } from './addModal'
import { FreeformMatrixBuildModel } from '-/page-components/build-your-own/types/freeform-matrix/models/freeform-grid.model'
import { DnDItemTypes } from '../types/freeform-matrix/utils/shapes.util'

interface propsI {
    matrix: FreeformMatrixBuildModel,
    image: JSX.Element,
}

export const AddToWorkspace = observer(({ matrix, image }: propsI) => {
    const onModalAdd = ({ matrixIndex }: AddModalOnClickI) => {
        matrix.setMatrixIndexPiece({ matrixIndex });
    }
    return (<>
        <DragZone type={DnDItemTypes.ITEM}>
            {image}
        </DragZone>
        <AddModal image={image} onSubmit={onModalAdd} />
    </>)
})

import { observer } from 'mobx-react-lite'

import { DragZone } from '-/Components/DnD/dragZone'
import { AddModal, AddModalOnClickI } from './addModal'
import { Matrix } from '-/page-components/build-your-own/freeform-grid.model'
import { DnDItemTypes } from './shapes.util'

interface propsI {
    matrix: Matrix,
    image: JSX.Element,
}

export const AddToWorkspace = observer(({ matrix, image }: propsI) => {
    const onModalAdd = ({matrixIndex}: AddModalOnClickI) => {
        matrix.setMatrixIndexPiece({matrixIndex});
    }
    return (<>
        <DragZone type={DnDItemTypes.ITEM}>
            {image}
        </DragZone>
        <AddModal image={image} onSubmit={onModalAdd}/>
    </>)
})

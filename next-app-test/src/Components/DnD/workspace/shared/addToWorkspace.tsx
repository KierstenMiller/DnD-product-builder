import { observer } from 'mobx-react-lite'

import { DragZone } from '-/Components/DnD/dragZone'
import { AddModal, AddModalOnClickI } from './addModal'
import { Matrix } from '-/page-components/build-your-own/freeform-grid.model'

interface propsI {
    matrix: Matrix,
    image: JSX.Element,
}

export const AddToWorkspace = observer(({ matrix, image }: propsI) => {
    const onModalAdd = ({matrixIndex}: AddModalOnClickI) => {
        matrix.setMatrixIndexPiece({matrixIndex, image});
    }
    return (<>
        <DragZone>
            {image}
        </DragZone>
        <AddModal image={image} onSubmit={onModalAdd}/>
    </>)
})

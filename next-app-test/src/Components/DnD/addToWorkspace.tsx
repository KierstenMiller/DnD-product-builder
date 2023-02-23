import { observer } from 'mobx-react-lite'

import { Matrix } from '-/page-components/build-your-own/build-your-own-model'
import { DragZone } from '-/Components/DnD/dragZone'
import { generateImage } from '-/Components/DnD/workspace.util'
import { configT, modifiersT } from '-/page-components/build-your-own/build-your-own.util'
import { AddModal, AddModalOnClickI } from './addModal'

interface propsI {
    config: configT,
    matrix: Matrix,
    modifiers: modifiersT,
}

export const AddToWorkspace = observer(({ config, matrix, modifiers }: propsI) => {
    const workingImage = generateImage(config, modifiers);
    const onModalAdd = ({matrixIndex}: AddModalOnClickI) => {
        matrix.setMatrixIndexPiece(matrixIndex);
        matrix.setMatrixIndexPieceImage(matrixIndex, modifiers);
    }
    return (<>
        <DragZone>
            {workingImage}
        </DragZone>
        {workingImage && <AddModal image={workingImage} onSubmit={onModalAdd}/>}
    </>)
})

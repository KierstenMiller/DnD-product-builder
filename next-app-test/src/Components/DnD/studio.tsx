import { observer } from 'mobx-react-lite'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { Modifiers } from '-/Components/modifier/modifier'
import { Workspace } from '-/Components/DnD/workspace'
import { DragZone } from '-/Components/DnD/dragZone'
import { generateImage, matrixIndexI } from '-/Components/DnD/workspace.util'
import { modifiersT } from '-/page-components/build-your-own/build-your-own.util'
import { ModalTrigger } from '../modal/modalTrigger'

import styles from '#/Home.module.scss'

interface propsI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export const Studio = observer(({ model, modifiers }: propsI) => {
    console.log(model)
    const workingImage = generateImage(model.config, modifiers);
    const onDrop = (matrixIndex: matrixIndexI, swapIndex?: matrixIndexI) => {
        if(swapIndex) model.swapPieces(matrixIndex, swapIndex)
        else {
            model.setMatrixIndexPiece(matrixIndex);
            model.setMatrixIndexPieceImage(matrixIndex, modifiers);
        }
    };
    const onRemove = (matrixIndex: matrixIndexI) => model.removeMatrixIndexPiece(matrixIndex);
    const onMove = (matrixIndex: matrixIndexI) => console.log('matrixIndex to move from', matrixIndex);
    return (<DndProvider backend={HTML5Backend}>
        <div className={styles.row}>
            <div className={`${styles.column} ${styles.columnLeft}`}>
                <div className={styles.image}>
                    <Workspace matrix={model.matrix} onDrop={onDrop} onRemove={onRemove} onMove={onMove} />
                </div>
            </div>
            <div className={`${styles.column} ${styles.columnRight} ${styles.isSticky}`}>
                <div className="flex">
                    <div className={styles.description}>
                        <h1 className={styles.header}>Build Your Own</h1>
                        <p>Click on a square to edit it</p>
                    </div>
                    <div>
                        <h2>Current Selections</h2>
                        {model.config.map(c => <div key={c.id}>Selected {c.id}: {c.selection}</div>)}
                        <DragZone>
                            {workingImage}
                        </DragZone>
                        <ModalTrigger
                            triggerConfig={{
                                text: 'Add to workspace',
                            }}
                            modalConfig={{
                                header: { content: 'Add Piece to Workspace' },
                                body: <div>
                                    <div>
                                        {workingImage}
                                    </div>
                                    <label>
                                        <span className="label_text">Street:</span>
                                        <input type="text" className="wide_input"/>
                                    </label>
                                    <label>Row</label><input />
                                    <label>Column</label><input />
                                </div>,
                                footer: { buttons: [{ text: 'Cancel' }, { text: 'Ok' }] }
                            }}

                        />
                    </div>
                </div>
                <Modifiers model={model} modifiers={modifiers} />
            </div>
        </div>
    </DndProvider>)
})

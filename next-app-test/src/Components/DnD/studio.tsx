import { observer } from 'mobx-react-lite'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { Modifiers } from '-/Components/modifier/modifier'
import { Workspace } from '-/Components/DnD/workspace'
import { DragZone } from '-/Components/DnD/dragZone'
import { matrixIndexI } from '-/Components/DnD/workspace.util'
import {  modifiersT } from '-/page-components/build-your-own/build-your-own.util'

import styles from '#/Home.module.scss'

interface propsI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export enum DnDItemTypes {
    ITEM = "item",
}

export const Studio = observer(({ model, modifiers }: propsI) => {
    const onDrop = (matrixIndex : matrixIndexI) => model.updateMatrixIndexPiece(matrixIndex);
    const onRemove = (matrixIndex : matrixIndexI) => model.updateMatrixIndexPiece(matrixIndex, true);
    return (<DndProvider backend={HTML5Backend}>
        <div className={styles.row}>
            <div className={`${styles.column} ${styles.columnLeft}`}>
                <div className={styles.image}>
                    <Workspace matrix={model.matrix} onDrop={onDrop} onRemove={onRemove}/>
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
                            {model.configuredImage}
                        </DragZone>
                    </div>
                </div>
                <Modifiers model={model} modifiers={modifiers} />
            </div>
        </div>
    </DndProvider>)
})

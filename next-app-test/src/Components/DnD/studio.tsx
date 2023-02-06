import { observer } from 'mobx-react-lite'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { Modifiers } from '-/Components/modifier/modifier'
import { Workspace } from '-/Components/DnD/workspace'
import { DragZone } from '-/Components/DnD/dragZone'
import { colors, icons, matrixIndexI, matrixMock, pieceI, shapeIds } from '-/Components/DnD/workspace.util'
import { configT, modifiersT } from '-/page-components/build-your-own/build-your-own.util'

import styles from '#/Home.module.scss'
import { useState } from 'react'

interface propsI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export enum DnDItemTypes {
    ITEM = "item",
}

// great article on data structure of matrix, include sort algo https://www.geeksforgeeks.org/introduction-to-matrix-or-grid-data-structure-and-algorithms-tutorial/
// TODO: trigger update to studio without replacing entire matrix array each update
const addToMatrix = ({matrix, addIndex, piece}: {matrix: typeof matrixMock, addIndex: matrixIndexI, piece: pieceI}) => {
    const matrixCopy = [...matrix];
    matrixCopy[addIndex.row][addIndex.column].piece = piece
    return matrixCopy;
}

const getImage = (config: configT) => {
    const shapeSelection = config.find(c => c.id === 'mod-shape')?.selection as shapeIds;
    const shapeIcon = shapeSelection && Object.values(shapeIds).includes(shapeSelection)
    ? icons[shapeSelection as shapeIds]
    : null;
    const fillSelection = config.find(c => c.id === 'mod-fill')?.selection as colors;
    const strokeSelection = config.find(c => c.id === 'mod-stroke')?.selection as colors;
    return  shapeIcon && fillSelection && strokeSelection
    ? shapeIcon({fill: fillSelection, stroke: strokeSelection})
    : icons.circle({fill: colors.green, stroke: colors.blue}) // TODO: FAIL HARD

}

export const Studio = observer(({ model, modifiers }: propsI) => {
    const [matrix, setMatrix] = useState(matrixMock);
    const image = getImage(model.config);
    const onDrop = (matrixIndex : matrixIndexI) => {   
        const image2 = getImage(model.config)
        const newMatrix = addToMatrix({
            matrix,
            addIndex: matrixIndex,
            piece: {id:"newPiece", image: image2}
        })
        setMatrix(newMatrix);
    }
    return (<DndProvider backend={HTML5Backend}>
        <div className={styles.row}>
            <div className={`${styles.column} ${styles.columnLeft}`}>
                <div className={styles.image}>
                    <Workspace matrix={matrix} onDrop={onDrop}/>
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
                            {image}
                        </DragZone>
                    </div>
                </div>
                <Modifiers model={model} modifiers={modifiers} />
            </div>
        </div>
    </DndProvider>)
})

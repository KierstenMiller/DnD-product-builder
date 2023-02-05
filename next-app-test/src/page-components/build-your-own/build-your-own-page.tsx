import { observer } from 'mobx-react-lite'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifiersT } from './build-your-own.util'
import { Modifiers } from '-/Components/modifier/modifier'
import { Workspace } from '-/Components/DnD/workspace'

import styles from '#/Home.module.scss'
import { DropZone } from '-/Components/DnD/dropZone'
import { DragZone } from '-/Components/DnD/dragZone'
import { colors, icons } from '-/Components/DnD/workspace.util'


interface BuildYourOwnPageI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export enum DnDItemTypes {
    ITEM = "item",
}

export const BuildYourOwnPage = observer(({ model, modifiers }: BuildYourOwnPageI) => {
    const image = icons.star({fill: colors.red, stroke: colors.blue})
    return (<>
        <div className={styles.app}>
            <div className={styles.container}>
                <DndProvider backend={HTML5Backend}>
                    <div className={styles.row}>
                        <div className={`${styles.column} ${styles.columnLeft}`}>
                            <div className={styles.image}>
                                <Workspace dropImage={image}/>
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
                </DndProvider>
                <div className={styles.row}>
                    <div className={styles.column}>
                        blank
                    </div>
                    <div className={styles.column}>
                        <div className={styles.summary}>
                            summary
                        </div>
                    </div>
                </div>
                <div className={styles.otherContent}>
                    other content
                </div>
            </div>
        </div>
    </>
    )
})

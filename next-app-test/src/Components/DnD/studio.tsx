import { observer } from 'mobx-react-lite'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { Modifiers } from '-/Components/modifier/modifier'
import { modifiersT } from '-/page-components/build-your-own/build-your-own.types'
import { builderKeys, getWorkspace } from '-/page-components/build-your-own/build-your-own.util'
import { AddToWorkspace } from './workspace/shared/addToWorkspace'

import styles from '#/Home.module.scss'
import { WorkspaceFreeformMatrix } from './workspace/freeformMatrix/freeformMatrix'
import { generateImage } from './workspace/freeformMatrix/freeformMatrix.util'

interface propsI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export const Studio = observer(({ model, modifiers }: propsI) => {
    const image = generateImage(model.config);
    const WorkspaceThing = getWorkspace(model.builder.type);
    // const addToWorkspace = getAddTo({builder: model.builder, })
    return (<DndProvider backend={HTML5Backend}>
        <div className={styles.row}>
            <div className={`${styles.column} ${styles.columnLeft}`}>
                <div className={styles.image}>
                    <WorkspaceThing build={model.builder.build}/>
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
                        {model.builder.type === builderKeys.freeformMatrix && <AddToWorkspace matrix={model.builder.build} image={image}/>}
                    </div>
                </div>
                <Modifiers model={model} modifiers={modifiers} />
            </div>
        </div>
    </DndProvider>)
})

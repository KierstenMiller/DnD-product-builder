import { observer } from 'mobx-react-lite'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { ModifierGroups } from '-/page-components/build-your-own/shared/modifier/modifierGroups'
import { StandardModelT, globalRulesI, modifiersT, validationLibraryT } from '-/page-components/build-your-own/build-your-own.types'
import { getDisplay, getWorkspace } from '-/page-components/build-your-own/build-your-own.util'

import styles from '#/Home.module.scss'

interface propsI {
    model: StandardModelT,
    modifiers: modifiersT,
    globalValidation: globalRulesI,
    validationLibrary: validationLibraryT,
}

export const Studio = observer(({ model, modifiers, globalValidation, validationLibrary }: propsI) => {
    const Workspace = getWorkspace(model.builder.type);
    const Display = getDisplay(model.builder.type);
    return (<DndProvider backend={HTML5Backend}>
        <div className={styles.row}>
            <div className={`${styles.column} ${styles.columnLeft}`}>
                {model.builder.build && <div className={styles.image}>
                    <Workspace build={model.builder.build} globalValidation={globalValidation} validationLibrary={validationLibrary} />
                </div>}
            </div>
            <div className={`${styles.column} ${styles.columnRight} ${styles.isSticky}`}>
                <div className="flex">
                    <div className={styles.description}>
                        <h1 className={styles.header}>Build Your Own</h1>
                    </div>
                    <div>
                        <Display build={model.builder.build} config={model.config} />
                    </div>
                </div>
                <ModifierGroups model={model} modifiers={modifiers} />
            </div>
        </div>
    </DndProvider>)
})

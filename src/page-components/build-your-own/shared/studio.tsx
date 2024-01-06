import { observer } from 'mobx-react-lite'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { type StandardModelT, type globalRulesI, type modifiersT, type validationLibraryT } from '-/page-components/build-your-own/build-your-own.types'
import { getDisplay, getWorkspace } from '-/page-components/build-your-own/build-your-own.util'
import { ModifierGroups } from '-/page-components/build-your-own/shared/modifier/modifierGroups'

interface propsI {
  model: StandardModelT
  modifiers: modifiersT
  styles: any // K-TODO: type this
  globalValidation?: globalRulesI
  validationLibrary?: validationLibraryT
}

export const Studio = observer(({ model, modifiers, styles, globalValidation, validationLibrary }: propsI) => {
  const Workspace = getWorkspace(model.builder.type)
  const Display = getDisplay(model.builder.type)
  return (<DndProvider backend={HTML5Backend}>
        <div className={styles.row}>
            <div className={`${styles.column} ${styles.columnLeft}`}>
                {model.builder.build && <div data-testid="workspace" className={styles.image}>
                    <Workspace build={model.builder.build} globalValidation={globalValidation} validationLibrary={validationLibrary} />
                </div>}
            </div>
            <div className={`${styles.column} ${styles.columnRight} ${styles.isSticky}`}>
                <div className="flex">
                    <div className={styles.description}>
                        <h1 className={styles.header}>Build Your Own</h1>
                        <h2>Current Selections</h2>
                        <div>
                            {model.config.map(c => <div key={c.id} data-testid={`${c.id}-selection-group`}>
                                <span data-testid="selection-id">{c.id}</span>:
                                <span data-testid="selection-value">{c.selection}</span>
                            </div>)}
                        </div>
                    </div>
                    <div>
                        <Display build={model.builder.build} config={model.config} />
                    </div>
                </div>
                <ModifierGroups model={model} modifiers={modifiers} styles={styles}/>
            </div>
        </div>
    </DndProvider>)
})

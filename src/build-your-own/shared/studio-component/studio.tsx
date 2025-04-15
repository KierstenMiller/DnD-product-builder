import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { getDisplay, getWorkspace } from '-/build-your-own/page-state/builder-key-getters'
import { ModifierGroups } from '-/build-your-own/shared/modifier-components/base-modifier-component/modifier-groups'
import { type StandardModelT, type globalRulesI, type modifiersT, type validationLibraryT } from '-/build-your-own/shared/typing/build-your-own.types'

// TODO: seperate this from global styles
import styles from '-/build-your-own/page-layout/build-your-own-layout.module.scss'

interface propsI {
  title: string
  model: StandardModelT
  modifiers: modifiersT
  globalValidation?: globalRulesI
  validationLibrary?: validationLibraryT
}

export const Studio = observer(({ title, model, modifiers, globalValidation, validationLibrary }: propsI) => {
  const Workspace = getWorkspace(model.builder.type)
  const Display = getDisplay(model.builder.type)
  return (<DndProvider backend={HTML5Backend}>
    <div className={classNames(styles.row, styles.sticky)}>
      <div className={`${styles.column} ${styles.columnLeft}`}>
        {Workspace && <div data-testid="workspace" className={styles.image}>
          <Workspace build={model.builder.build} globalValidation={globalValidation} validationLibrary={validationLibrary} />
        </div>}
      </div>
      <div className={`${styles.column} ${styles.columnRight} ${styles.isSticky}`}>
        <div className={classNames(styles.headline, { [styles.displayed]: Display })}>
          <div className={styles.description}>
            <h1 className={styles.mainHeading}>{title}</h1>
            <div className={styles.pricing}>
              <span className={styles.label}>Total Price: {' '}</span>
              <span className={styles.data}>$0,000.00</span>
            </div>
            <p className={styles.breakdown}>This copy is a quick breakdown of this page or product. It can help the viewer learn about the page’s usage and goals as well as define it’s purpose within this project. Maybe it’s a little longer or perhaps it’s kept short - either way, the reader should leave this copy with greater knowledge moving forward.</p>
            <h2 className={styles.selectionsHeading}>Current Selections</h2>
            <div className={styles.selectionContainer}>
              {model.config.map(c => <div className={styles.selection} key={c.id} data-testid={`${c.id}-selection-group`}>
                <span className={styles.label} data-testid="selection-id">{c.id}:</span>
                <span className={styles.data} data-testid="selection-value">{c.selection}</span>
              </div>)}
            </div>
          </div>
          {Display && <div className={styles.displayContainer}>
            <Display build={model.builder.build} config={model.config} />
          </div>}
        </div>
        <ModifierGroups model={model} modifiers={modifiers} />
      </div>
    </div>
  </DndProvider>)
})

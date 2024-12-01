import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { ThemeContext } from '-/build-your-own/page-layout/build-your-own-page'
import { getDisplay, getWorkspace } from '-/build-your-own/page-state/compile-page-data.util'
import { ModifierGroups } from '-/build-your-own/shared/modifier-components/base-modifier-component/modifier-groups'
import { type StandardModelT, type globalRulesI, type modifiersT, type validationLibraryT } from '-/build-your-own/shared/typing/build-your-own.types'
import { BasicAccordion } from '-/component-library/accordion/basic-accordion'
import { getStyles } from '-/util-library/helpers'

// TODO: seperate this from global styles
import defaultStyles from '-/build-your-own/page-layout/build-your-own-layout.module.scss'

interface propsI {
  model: StandardModelT
  modifiers: modifiersT
  globalValidation?: globalRulesI
  validationLibrary?: validationLibraryT
}

export const Studio = observer(({ model, modifiers, globalValidation, validationLibrary }: propsI) => {
  const theme = useContext(ThemeContext)
  const styles = (id: string) => getStyles(defaultStyles, theme, id)
  const Workspace = getWorkspace(model.builder.type)
  const Display = getDisplay(model.builder.type)
  console.log('Display', Display)
  return (<DndProvider backend={HTML5Backend}>
    <div className={classNames(styles('row'), styles('sticky'))}>
      <div className={`${styles('column')} ${styles('columnLeft')}`}>
        {model.builder.build && <div data-testid="workspace" className={styles('image')}>
          <Workspace build={model.builder.build} globalValidation={globalValidation} validationLibrary={validationLibrary} />
        </div>}
      </div>
      <div className={`${styles('column')} ${styles('columnRight')} ${styles('isSticky')}`}>
        <div className={classNames(styles('headline'), { [styles('displayed')]: Display })}>
          <div className={styles('description')}>
            <h1 className={styles('header')}>Build Your Own</h1>
            <h2>Current Selections</h2>
            <div>
              {model.config.map(c => <div key={c.id} data-testid={`${c.id}-selection-group`}>
                <span data-testid="selection-id">{c.id}</span>:
                <span data-testid="selection-value">{c.selection}</span>
              </div>)}
            </div>
          </div>
          {Display && <div className={styles('displayContainer')}>
            <Display build={model.builder.build} config={model.config} />
          </div>}
        </div>
        <ModifierGroups model={model} modifiers={modifiers} />
        <div className={styles('cost')}>
          <BasicAccordion id="cost" triggerText="Total Cost: $000,000" headerLevel={2}>
            <div>Materials: $000,000</div>
            <div>Labor: $000,000</div>
            <div>Logistics: $000,000</div>
            <div>Overall cost of build: $000,000</div>
            <div>Tax: $000,000</div>
            <div>Insurance: $000,000</div>
            <div>Total: $000,000</div>
          </BasicAccordion>
        </div>
      </div>
    </div>
  </DndProvider>)
})

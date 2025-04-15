import { observer } from 'mobx-react-lite'

import { Studio } from '-/build-your-own/shared/studio-component/studio'
import { type StandardModelT, type globalRulesI, type modifiersT, type validationLibraryT } from '-/build-your-own/shared/typing/build-your-own.types'

import styles from './build-your-own-layout.module.scss'

interface BuildYourOwnPageI {
  title: string
  model: StandardModelT
  modifiers: modifiersT
  globalValidation?: globalRulesI
  validationLibrary?: validationLibraryT
}

export const BuildYourOwnLayout = observer(({ title, model, modifiers, globalValidation, validationLibrary }: BuildYourOwnPageI) => {
  return (<>
    <div className={styles.app}>
      <div className={styles.pageContainer}>
        <Studio title={title} model={model} modifiers={modifiers} globalValidation={globalValidation} validationLibrary={validationLibrary} />
      </div>
    </div>
  </>
  )
})

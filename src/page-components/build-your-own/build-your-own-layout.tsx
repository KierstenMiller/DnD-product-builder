import { observer } from 'mobx-react-lite'

import { Studio } from '-/page-components/build-your-own/shared/studio'
import { type StandardModelT, type globalRulesI, type modifiersT, type validationLibraryT } from './build-your-own.types'

interface BuildYourOwnPageI {
  model: StandardModelT
  modifiers: modifiersT
  styles: any // K-TODO: type this
  globalValidation?: globalRulesI
  validationLibrary?: validationLibraryT
}

export const BuildYourOwnLayout = observer(({ model, modifiers, styles, globalValidation, validationLibrary }: BuildYourOwnPageI) => {
  return (<>
        <div className={styles.app}>
            <div className={styles.pageContainer}>
                <Studio model={model} modifiers={modifiers} styles={styles} globalValidation={globalValidation} validationLibrary={validationLibrary} />
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

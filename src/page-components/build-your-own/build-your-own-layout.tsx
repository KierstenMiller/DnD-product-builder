import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { ThemeContext } from '-/page-components/build-your-own/build-your-own-page'
import { type StandardModelT, type globalRulesI, type modifiersT, type validationLibraryT } from '-/page-components/build-your-own/build-your-own.types'
import { Studio } from '-/page-components/build-your-own/shared/studio'
import { getStyles } from '-/util/helpers'

import defaultStyles from '-/page-components/build-your-own/build-your-own-layout.module.scss'

interface BuildYourOwnPageI {
  model: StandardModelT
  modifiers: modifiersT
  globalValidation?: globalRulesI
  validationLibrary?: validationLibraryT
}

export const BuildYourOwnLayout = observer(({ model, modifiers, globalValidation, validationLibrary }: BuildYourOwnPageI) => {
  const theme = useContext(ThemeContext)
  const styles = (id: string) => getStyles(defaultStyles, theme, id)
  return (<>
        <div className={styles('app')}>
            <div className={styles('pageContainer')}>
                <Studio model={model} modifiers={modifiers} globalValidation={globalValidation} validationLibrary={validationLibrary} />
                <div className={styles('row')}>
                    <div className={styles('column')}>
                        blank
                    </div>
                    <div className={styles('column')}>
                        <div className={styles('summary')}>
                            summary
                        </div>
                    </div>
                </div>
                <div className={styles('otherContent')}>
                    other content
                </div>
            </div>
        </div>
    </>
  )
})

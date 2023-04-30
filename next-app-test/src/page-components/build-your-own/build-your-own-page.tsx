import { observer } from 'mobx-react-lite'

import { StandardModelT } from '-/page-components/build-your-own/models/standard.model'
import { globalRulesI, modifiersT, validationLibraryT } from './build-your-own.types'
import { Studio } from '-/Components/DnD/studio'

import styles from '#/Home.module.scss'

interface BuildYourOwnPageI {
    model: StandardModelT,
    modifiers: modifiersT,
    globalValidation: globalRulesI,
    validationLibrary: validationLibraryT,
}

export const BuildYourOwnPage = observer(({ model, modifiers, globalValidation, validationLibrary }: BuildYourOwnPageI) => {
    return (<>
        <div className={styles.app}>
            <div className={styles.container}>
                <Studio model={model} modifiers={modifiers} globalValidation={globalValidation} validationLibrary={validationLibrary}/>
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

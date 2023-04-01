import { observer } from 'mobx-react-lite'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifiersT, validationLibraryT, validationT } from './build-your-own.types'
import { Studio } from '-/Components/DnD/studio'

import styles from '#/Home.module.scss'

interface BuildYourOwnPageI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
    validationLibrary: validationLibraryT,
}

export const BuildYourOwnPage = observer(({ model, modifiers, validationLibrary }: BuildYourOwnPageI) => {
    return (<>
        <div className={styles.app}>
            <div className={styles.container}>
                <Studio model={model} modifiers={modifiers} validationLibrary={validationLibrary}/>
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

import { observer } from 'mobx-react-lite'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifiersT } from './build-your-own.util'
import { Studio } from '-/Components/DnD/studio'

import styles from '#/Home.module.scss'

interface BuildYourOwnPageI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export const BuildYourOwnPage = observer(({ model, modifiers }: BuildYourOwnPageI) => {
    console.log('page rerender');
    return (<>
        <div className={styles.app}>
            <div className={styles.container}>
                <Studio model={model} modifiers={modifiers}/>
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

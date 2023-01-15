import { observer } from 'mobx-react-lite'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifiersT } from './build-your-own.util'
import { Modifiers } from '-/Components/modifier/modifier'

import styles from '#/Home.module.scss'

interface BuildYourOwnPageI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export const BuildYourOwnPage = observer(({model, modifiers}: BuildYourOwnPageI) => {
    return (<>
            <div className={styles.app}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={`${styles.column} ${styles.columnLeft}`}>
                            <div className={styles.image}>
                                <h2>Current Selections</h2>
                                {model.config.map(c => <div key={c.id}>Selected {c.id}: {c.selection}</div>)}
                            </div>
                        </div>
                        <div className={`${styles.column} ${styles.columnRight} ${styles.isSticky}`}>
                            <div className={styles.description}>
                                <h1 className={styles.header}>Build Your Own</h1>
                                <p>Click on a square to edit it</p>
                            </div>
                            <Modifiers model={model} modifiers={modifiers}/>
                        </div>
                    </div>
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

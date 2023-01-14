import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { InputRadio } from '-/Components/form-controls/input-radio'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'

import BYOStyles from '#/build-your-own.module.scss'
import styles from '#/Home.module.scss'
import { modifiersT } from './build-your-own.util'
import { GroupedList } from '-/Components/organizer/groupedList'
import { Modifiers } from '-/Components/modifier/modifier'

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
                                {model.config.map(c => <div>Selected {c.id}: {c.selection}</div>)}
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

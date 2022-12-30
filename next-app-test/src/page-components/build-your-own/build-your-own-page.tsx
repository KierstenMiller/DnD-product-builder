import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { InputRadio } from '-/Components/form-controls/input-radio'
import { OPTIONS, rawData } from './build-your-own.util'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'

import BYOStyles from '#/build-your-own.module.scss'
import styles from '#/Home.module.scss'

export const BuildYourOwnPage = observer(({model, data}: {model: BuildYourOwnModel, data: rawData}) => {
    return (<>
            <div className={styles.app}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={`${styles.column} ${styles.columnLeft}`}>
                            <div className={styles.image}>
                                <h3>Builder</h3>
                                <div>Selected dimension: {model.dimensions}</div>
                                <div>Selected stitch: {model.stitch}</div>
                                <div>Selected print: {model.print}</div>
                                <div>Selected colorway: {model.colorway}</div>
                                <div>Selected texture: {model.texture}</div>
                            </div>
                        </div>
                        <div className={`${styles.column} ${styles.columnRight} ${styles.isSticky}`}>
                            <div className={styles.description}>
                                <h2 className={styles.header}>Quilt Builder</h2>
                                <p>Click on a square to edit it</p>
                            </div>
                            <h3 className="ml-medium">Quilt Group</h3>
                            <BasicAccordionGroup>
                                <BasicAccordion
                                    stylesOverride={BYOStyles}
                                    headerText="Dimensions"
                                    headerLevel={3}
                                    id="basic-accordion-example"
                                >
                                    <InputRadio
                                        heading="Pick a dimension"
                                        onChange={({newSelection}: {newSelection: string}) => model.setDimensions(newSelection)}
                                        options={data.options[OPTIONS.DIMENSION]}
                                    />
                                </BasicAccordion>
                                <BasicAccordion
                                    stylesOverride={BYOStyles}
                                    headerText="Stitch"
                                    headerLevel={3}
                                    id="basic-accordion-example"
                                >
                                    <InputRadio
                                        heading="Pick a stitch"
                                        onChange={({newSelection}: {newSelection: string}) => model.setStitch(newSelection)}
                                        options={data.options[OPTIONS.STITCH]}
                                    />
                                </BasicAccordion>
                            </BasicAccordionGroup>
                            <h3 className='ml-medium'>Selected Patch Group</h3>
                            <BasicAccordionGroup>
                                <BasicAccordion
                                    stylesOverride={BYOStyles}
                                    headerText="Print"
                                    headerLevel={3}
                                    id="basic-accordion-example"
                                >
                                    <InputRadio
                                        heading="Pick a print"
                                        onChange={({newSelection}: {newSelection: string}) => model.setPrint(newSelection)}
                                        options={data.options[OPTIONS.PRINT]}
                                    />
                                </BasicAccordion>
                                <BasicAccordion
                                    stylesOverride={BYOStyles}
                                    headerText="Print Colorway"
                                    headerLevel={3}
                                    id="basic-accordion-example"
                                >
                                    <InputRadio
                                        heading="Pick a colorway"
                                        onChange={({newSelection}: {newSelection: string}) => model.setColorway(newSelection)}
                                        options={data.options[OPTIONS.COLORWAY]}
                                    />
                                </BasicAccordion>
                                <BasicAccordion
                                    stylesOverride={BYOStyles}
                                    headerText="Texture"
                                    headerLevel={3}
                                    id="basic-accordion-example"
                                >
                                    <InputRadio
                                        heading="Pick a texture"
                                        onChange={({newSelection}: {newSelection: string}) => model.setTexture(newSelection)}
                                        options={data.options[OPTIONS.TEXTURE]}
                                    />
                                </BasicAccordion>
                            </BasicAccordionGroup>

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

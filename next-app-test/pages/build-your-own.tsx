import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { BasicAccordion } from '../src/Components/accordion/basic-accordion'

const BuildYourOwn = () => {
    return (
        <>
            <Head>
                <title>Custom Quilt Builder</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.app}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={`${styles.column} ${styles.columnLeft}`}>
                            <div className={styles.image}>builder</div>
                        </div>
                        <div className={`${styles.column} ${styles.columnRight} ${styles.isSticky}`}>
                            <div className={styles.description}>Description</div>
                            <BasicAccordion
                                className={styles.selector}
                                headerText="Accordion Header"
                                headerLevel={3}
                                id="basic-accordion-example"
                            >
                                Basic Accordion Content
                            </BasicAccordion>
                            <BasicAccordion
                                className={styles.selector}
                                headerText="Accordion Header"
                                headerLevel={3}
                                id="basic-accordion-example"
                            >
                                Basic Accordion Content
                            </BasicAccordion>
                            <BasicAccordion
                                className={styles.selector}
                                headerText="Accordion Header"
                                headerLevel={3}
                                id="basic-accordion-example"
                            >
                                Basic Accordion Content
                            </BasicAccordion>
                            <BasicAccordion
                                className={styles.selector}
                                headerText="Accordion Header"
                                headerLevel={3}
                                id="basic-accordion-example"
                            >
                                Basic Accordion Content
                            </BasicAccordion>
                            <BasicAccordion
                                className={styles.selector}
                                headerText="Accordion Header"
                                headerLevel={3}
                                id="basic-accordion-example"
                            >
                                Basic Accordion Content
                            </BasicAccordion>
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
}

export default BuildYourOwn;

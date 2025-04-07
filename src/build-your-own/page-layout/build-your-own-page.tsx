import Head from 'next/head'
import { useState } from 'react'

import { BuildYourOwnDevBar } from '-/build-your-own/page-layout/build-your-own-dev-bar'
import { BuildYourOwnLayout } from '-/build-your-own/page-layout/build-your-own-layout'
import { formatBuilderData } from '-/build-your-own/page-state/compile-builder-helpers'
import { type buildYourOwnRawDataI } from '-/build-your-own/shared/typing/build-your-own.types'
import { BasicAccordion } from '-/component-library/accordion/basic-accordion'

import styles from './build-your-own-page.module.scss'

export const BuildYourOwnPage = ({ data }: { data: buildYourOwnRawDataI }) => {
  const inTestMode = true
  const [viewData, setData] = useState(data)
  const { model, validationLibrary } = formatBuilderData(viewData) // K-TODO: do this data massaging in getServerSideProps (if that is the method you choose for getting data)
  const setDataCallback = (newData: buildYourOwnRawDataI) => {
    model?.builder?.build?.clearWorkspace() // clearing to ensure there are no conflicts between workspace data
    setData(newData)
  }
  console.log('model', model)
  return (
    <>
      <Head>
        <title>Custom Quilt Builder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* TODO: import via another means */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {inTestMode && <BuildYourOwnDevBar setData={setDataCallback} />}
      <div className={styles.headerLevelOne}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.productNav}>
          <div className={styles.product}>Cubby Unit</div>
          <div className={styles.product}>Cabinet</div>
          <div className={styles.product}>Media Cabinet</div>
        </div>
      </div>
      <div className={styles.results}>
        <BasicAccordion
          triggerText={'Results'}
          headerLevel={2}
          id={'results'}
          drawerOpen={true}
        >
          <div className={styles.resultsContent}>
          <div className={styles.price}>
            <div className={styles.label}>Total Price</div>
            <div className={styles.data}>$0,000.00</div>
          </div>
          <div className={styles.selectionList}>
            <div className={styles.selection}>
              <div className={styles.label}>Cabinet Dim:</div>
              <div className={styles.data}>00 H x 00 L x 00 D</div>
            </div>
            <div className={styles.selection}>
              <div className={styles.label}>Color:</div>
              <div className={styles.data}>Blue</div>
            </div>
            <div className={styles.selection}>
              <div className={styles.label}>Handles:</div>
              <div className={styles.data}>Option 1</div>
            </div>
            <div className={styles.selection}>
              <div className={styles.label}>Legs:</div>
              <div className={styles.data}>Option 1</div>
            </div>
          </div>
        </div>
        </BasicAccordion>
      </div>
      <BuildYourOwnLayout model={model} modifiers={viewData.modifiers} globalValidation={viewData.builder?.rules} {...validationLibrary.length > 0 && { validationLibrary }} />
    </>
  )
}

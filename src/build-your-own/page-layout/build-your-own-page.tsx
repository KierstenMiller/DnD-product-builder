import Head from 'next/head'
import { useState } from 'react'

import { BuildYourOwnDevBar } from '-/build-your-own/page-layout/build-your-own-dev-bar'
import { BuildYourOwnLayout } from '-/build-your-own/page-layout/build-your-own-layout'
import { formatBuilderData } from '-/build-your-own/page-state/compile-builder-helpers'
import { type buildYourOwnRawDataI } from '-/build-your-own/shared/typing/build-your-own.types'

export const BuildYourOwnPage = ({ data }: { data: buildYourOwnRawDataI }) => {
  const [viewData, setData] = useState(data)
  const { model, validationLibrary } = formatBuilderData(viewData) // K-TODO: do this data massaging in getServerSideProps (if that is the method you choose for getting data)
  const setDataCallback = (newData: buildYourOwnRawDataI) => {
    model?.builder?.build?.clearWorkspace() // clearing to ensure there are no conflicts between workspace data
    setData(newData)
  }
  return (
    <>
      <Head>
        <title>Custom Quilt Builder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BuildYourOwnDevBar setData={setDataCallback} />
      <BuildYourOwnLayout model={model} modifiers={viewData.modifiers} globalValidation={viewData.builder?.rules} {...validationLibrary.length > 0 && { validationLibrary }} />
    </>
  )
}

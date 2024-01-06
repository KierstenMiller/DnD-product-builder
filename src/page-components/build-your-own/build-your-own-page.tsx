import Head from 'next/head'
import { useState } from 'react'

import baseStyles from '#/Home.module.scss'
import pencilSchemeStyles from '#/pencil-scheme.module.scss'

import { BuildYourOwnDevBar } from '-/page-components/build-your-own/build-your-own-dev-bar'
import { BuildYourOwnLayout } from '-/page-components/build-your-own/build-your-own-layout'
import { type buildYourOwnRawDataI } from '-/page-components/build-your-own/build-your-own.types'
import { formatBuilderData } from './shared/compilePageData'

// TODO: refactor
const combineSCSSModules = (module1: any, module2: any) => {
  const combinedStyles = { ...module1 }

  for (const className in module2) {
    if (combinedStyles[className]) {
      // If the class ID already exists, merge the styles with priority to module2
      combinedStyles[className] = `${combinedStyles[className]} ${module2[className]}`
    } else {
      // If the class ID doesn't exist, add it to the combined styles
      combinedStyles[className] = module2[className]
    }
  }

  return combinedStyles
}

export const BuildYourOwnPage = ({ data }: { data: buildYourOwnRawDataI }) => {
  const styles = combineSCSSModules(baseStyles, pencilSchemeStyles)
  const [viewData, setData] = useState(data)
  const { model, validationLibrary } = formatBuilderData(viewData) // K-TODO: do this data massaging in getServerSideProps (if that is the method you choose for getting data)
  const setDataCallback = (newData: buildYourOwnRawDataI) => {
    model?.builder?.build?.clearWorkspace() // clearing to ensure there are no conflicts between workspace data
    setData(newData)
  }
  console.log('styles', styles)
  return (
        <>
            <Head>
                <title>Custom Quilt Builder</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BuildYourOwnDevBar setData={setDataCallback} />
            <BuildYourOwnLayout model={model} modifiers={viewData.modifiers} styles={styles} globalValidation={viewData.builder?.rules} { ...validationLibrary.length > 0 && { validationLibrary }}/>
        </>
  )
}

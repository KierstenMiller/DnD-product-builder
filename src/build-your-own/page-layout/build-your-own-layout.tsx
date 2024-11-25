import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { ThemeContext } from '-/build-your-own/page-layout/build-your-own-page'
import { Studio } from '-/build-your-own/shared/studio-component/studio'
import { type StandardModelT, type globalRulesI, type modifiersT, type validationLibraryT } from '-/build-your-own/shared/typing/build-your-own.types'
import { getStyles } from '-/util-library/helpers'

import defaultStyles from './build-your-own-layout.module.scss'

interface BuildYourOwnPageI {
  model: StandardModelT
  modifiers: modifiersT
  globalValidation?: globalRulesI
  validationLibrary?: validationLibraryT
}

export const BuildYourOwnLayout = observer(({ model, modifiers, globalValidation, validationLibrary }: BuildYourOwnPageI) => {
  const theme = useContext(ThemeContext)
  const styles = (id: string) => getStyles(defaultStyles, theme, id)
  return (<>
    <div className={styles('app')}>
      <div className={styles('pageContainer')}>
        <Studio model={model} modifiers={modifiers} globalValidation={globalValidation} validationLibrary={validationLibrary} />
        <div className={styles('information')}>
          <h2>Get To Know Your Build</h2>
          <div className={styles('row')}>
            <div className={styles('column')}>
              <h3>Adjectives</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dui leo, tempus ut posuere vel, ullamcorper quis est. Nullam ipsum erat, tincidunt eget quam id, maximus tempus eros. Sed ullamcorper nisl at est luctus, a condimentum augue elementum. Mauris lobortis lectus et tortor sodales cursus. Donec finibus ex placerat massa condimentum dignissim. Donec in enim quis ligula molestie rutrum. Fusce in aliquam dolor. Nam et accumsan dui.</p>
              <h4>Most prominent adjective</h4>
              <p>Pellentesque in massa venenatis, tincidunt odio non, laoreet magna. Phasellus scelerisque ut erat ut sollicitudin. Donec augue felis, imperdiet in ex quis, cursus vehicula arcu. Etiam a molestie odio. Pellentesque quis pulvinar massa.</p>
              <h4>Prominent adjective</h4>
              <p>Proin pulvinar sodales lacus a ullamcorper. Etiam mattis ipsum sit amet interdum vulputate. Aliquam posuere lacus quis urna luctus hendrerit. Maecenas et consequat nisi.</p>
              <h4>Adjective</h4>
              <p>Nunc et nibh pretium, commodo enim sed, vulputate nisi. Proin ante felis, auctor ut ex in, porttitor cursus magna. Nunc augue libero, ultrices id ipsum accumsan, tincidunt suscipit libero. Nunc elementum dolor vitae est elementum, eget fermentum sapien condimentum.</p>
              <h4>Minor adjective</h4>
              <p>Sed convallis sapien at libero blandit, id finibus arcu varius. Maecenas mattis urna vitae magna molestie suscipit. In quis felis mollis odio cursus condimentum et ut augue. Vivamus id accumsan nisl, id scelerisque lacus. Nam lectus diam, egestas et efficitur sed, pellentesque vel urna. </p>
              <h4>Most minor adjective</h4>
              <p>Phasellus a lectus libero. Phasellus cursus pulvinar fringilla. In malesuada non urna iaculis tempus. Morbi massa quam, posuere mattis mauris nec, dapibus facilisis risus.</p>
            </div>
            <div className={styles('column')}>
              <h3>Specifications Summary</h3>
              <h4>Block types</h4>
              <ul>
                <li>3x block type abc</li>
                <li>4x block type abc</li>
                <li>5x block type abc</li>
                <li>6x block type abc</li>
              </ul>
              <h4>Approximate Area by Utility</h4>
              <ul>
                <li>Community space: 000unit</li>
                <li>Residential space: 000unit</li>
                <li>Commercial space: 000unit</li>
              </ul>
              <h4>Dimensions</h4>
              <p>Overall dimensions of build: 000x000x000</p>
              <ul>
                <li>
                  stack A
                  <ul>
                    <li>block 1: 00x00x00</li>
                    <li>block 2: 00x00x00</li>
                    <li>block 3: 00x00x00</li>
                  </ul>
                </li>
                <li>
                  stack B
                  <ul>
                    <li>block 1: 00x00x00</li>
                    <li>block 2: 00x00x00</li>
                    <li>block 3: 00x00x00</li>
                  </ul>
                </li>
                <li>
                  stack C
                  <ul>
                    <li>block 1: 00x00x00</li>
                    <li>block 2: 00x00x00</li>
                    <li>block 3: 00x00x00</li>
                  </ul>
                </li>
              </ul>
              <h4>Materials</h4>
              <ul>
                <li>metal</li>
                <li>wood</li>
                <li>glass</li>
              </ul>
              <h4>Colors</h4>
              <ul>
                <li>red</li>
                <li>blue</li>
                <li>green</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles('otherContent')}>
          other content
        </div>
      </div>
    </div>
  </>
  )
})

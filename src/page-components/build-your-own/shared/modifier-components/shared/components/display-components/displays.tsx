import { type mirageCallbackPropsI } from '-/Components/form-controls/radioInput/radioInput'
import { DragZone } from '-/page-components/build-your-own/shared/DnD/dragZone'
import { AddModal } from '-/page-components/build-your-own/shared/add-modal/addModal'
import { adderDisplayValues, radioDisplayValues } from '-/page-components/build-your-own/shared/modifier-components/shared/components/display-components/displays.types'
import { DnDItemTypes } from '-/page-components/build-your-own/types/freeform-matrix/utils/shapes.util'

import cardStyles from '-/page-components/build-your-own/shared/modifier-components/shared/components/display-components/styles/card-styles.module.scss'
import imageFirstStyles from '-/page-components/build-your-own/shared/modifier-components/shared/components/display-components/styles/image-first-styles.module.scss'
import titledStyles from '-/page-components/build-your-own/shared/modifier-components/shared/components/display-components/styles/titled-styles.module.scss'

export const displays = {
  [adderDisplayValues.card]: {
    styles: cardStyles,
    view: ({ id, image, label, onClick }: mirageCallbackPropsI) => <div className={cardStyles.option}>
      <DragZone type={DnDItemTypes.ITEM} id={id} onDrag={() => { onClick && onClick({ newSelection: id }) }}>
        <div aria-hidden={true} className={cardStyles.image}>{image}</div>
      </DragZone>
      <div>
        <div>{label}</div>
        <div>{id}</div>
        <AddModal image={image} onSubmit={() => { onClick && onClick({ newSelection: id }) }} />
      </div>
    </div>
  },
  [adderDisplayValues.imageFirst]: {
    styles: imageFirstStyles,
    view: ({ id, image, label, onClick }: mirageCallbackPropsI) => <div className={imageFirstStyles.option}>
      <DragZone type={DnDItemTypes.ITEM} id={id} onDrag={() => { onClick && onClick({ newSelection: id }) }}>
        <div aria-hidden={true} className={imageFirstStyles.image}>{image}</div>
      </DragZone>
      <div>{label}</div>
      <div>{id}</div>
      <AddModal image={image} onSubmit={() => { onClick && onClick({ newSelection: id }) }} />
    </div>
  },
  [radioDisplayValues.card]: {
    styles: cardStyles,
    view: ({ id, image, label }: mirageCallbackPropsI) => <div className={cardStyles.option}>
      <div aria-hidden={true} className={cardStyles.image}>{image}</div>
      <div>
        <div>{label}</div>
        <div>{id}</div>
      </div>
    </div>
  },
  [radioDisplayValues.titled]: {
    styles: titledStyles,
    view: ({ id, image, label }: mirageCallbackPropsI) => <div className={titledStyles.option}>
      <div>{label}</div>
      <div aria-hidden={true} className={titledStyles.image}>{image}</div>
      <div>{id}</div>
    </div>
  },
  [radioDisplayValues.imageFirst]: {
    styles: imageFirstStyles,
    view: ({ id, image, label }: mirageCallbackPropsI) => <div className={imageFirstStyles.option}>
      <div aria-hidden={true} className={imageFirstStyles.image}>{image}</div>
      <div>{label}</div>
      <div>{id}</div>
    </div>
  }
}

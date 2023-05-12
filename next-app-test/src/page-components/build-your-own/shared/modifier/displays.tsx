// typing
import { DnDItemTypes } from '../../types/freeform-matrix/utils/shapes.util'
import { mirageI } from '../../../../Components/form-controls/radioInput'
import { adderDisplayValues, radioDisplayValues } from './modifier.types'
// components
import { DragZone } from '../DnD/dragZone'
import { AddModal } from '../addModal'
// styles
import titledStyles from './titled-styles.module.scss'
import cardStyles from './card-styles.module.scss'
import imageFirstStyles from './image-first-styles.module.scss'

export const displays = {
    [adderDisplayValues.card]: {
        styles: cardStyles,
        view: ({ id, image, label, onClick }: mirageI) => <div className={cardStyles.option}>
            <DragZone type={DnDItemTypes.ITEM} id={id} onDrag={() => onClick && onClick({ newSelection: id })}>
                <div aria-hidden={true} className={cardStyles.image}>{image}</div>
            </DragZone>
            <div>
                <div>{label}</div>
                <div>{id}</div>
                <AddModal image={image} onSubmit={() => onClick && onClick({ newSelection: id })} />
            </div>
        </div>
    },
    [adderDisplayValues.imageFirst]: {
        styles: imageFirstStyles,
        view: ({ id, image, label, onClick }: mirageI) => <div className={imageFirstStyles.option}>
            <DragZone type={DnDItemTypes.ITEM} id={id} onDrag={() => onClick && onClick({ newSelection: id })}>
                <div aria-hidden={true} className={imageFirstStyles.image}>{image}</div>
            </DragZone>
            <div>{label}</div>
            <div>{id}</div>
            <AddModal image={image} onSubmit={() => onClick && onClick({ newSelection: id })} />
        </div>
    },
    [radioDisplayValues.card]: {
        styles: cardStyles,
        view: ({ id, image, label }: mirageI) => <div className={cardStyles.option}>
            <div aria-hidden={true} className={cardStyles.image}>{image}</div>
            <div>
                <div>{label}</div>
                <div>{id}</div>
            </div>
        </div>
    },
    [radioDisplayValues.titled]: {
        styles: titledStyles,
        view: ({ id, image, label }: mirageI) => <div className={titledStyles.option}>
            <div>{label}</div>
            <div aria-hidden={true} className={titledStyles.image}>{image}</div>
            <div>{id}</div>
        </div>
    },
    [radioDisplayValues.imageFirst]: {
        styles: imageFirstStyles,
        view: ({ id, image, label }: mirageI) => <div className={imageFirstStyles.option}>
            <div aria-hidden={true} className={imageFirstStyles.image}>{image}</div>
            <div>{label}</div>
            <div>{id}</div>
        </div>
    },
}
import { optionI } from '-/page-components/build-your-own/build-your-own.types'
import cardStyles from './card-styles.module.scss'
import imageFirstStyles from './image-first-styles.module.scss'
import { radioDisplayValues } from './modifier.types'
import titledStyles from './titled-styles.module.scss'

export const radioDisplays = {
    [radioDisplayValues.card]: {
        styles: cardStyles,
        mirage: (opt: optionI) => <div className={cardStyles.option}>
            <div aria-hidden={true} className={cardStyles.image}>{opt.image}</div>
            <div>
                <div>{opt.label}</div>
                <div>{opt.id}</div>
            </div>
        </div>
    },
    [radioDisplayValues.titled]: {
        styles: titledStyles,
        mirage: (opt: optionI) => <div className={titledStyles.option}>
            <div>{opt.label}</div>
            <div aria-hidden={true} className={titledStyles.image}>{opt.image}</div>
            <div>{opt.id}</div>
        </div>
    },
    [radioDisplayValues.imageFirst]: {
        styles: imageFirstStyles,
        mirage: (opt: optionI) => <div className={imageFirstStyles.option}>
            <div aria-hidden={true} className={imageFirstStyles.image}>{opt.image}</div>
            <div>{opt.label}</div>
            <div>{opt.id}</div>
        </div>
    },
}
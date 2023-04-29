import { optionI } from '-/page-components/build-your-own/build-your-own.types'
import { DragZone } from '../DnD/dragZone'
import { AddModal } from '../DnD/workspace/shared/addModal'
import { DnDItemTypes } from '../DnD/workspace/shared/shapes.util'
import { onChangeI } from '../form-controls/radioInput'
import cardStyles from './card-styles.module.scss'
import imageFirstStyles from './image-first-styles.module.scss'
import { adderDisplayValues, radioDisplayValues } from './modifier.types'
import titledStyles from './titled-styles.module.scss'

export const displays = {
    [adderDisplayValues.card]: {
        styles: cardStyles,
        view: (opt: optionI, onClick: ({ event, newSelection }: onChangeI) => void) => <div className={cardStyles.option}>
        <DragZone type={DnDItemTypes.ITEM} id={opt.id} onDrag={() => onClick({event: null, newSelection: opt.id})}>
            <div aria-hidden={true} className={cardStyles.image}>{opt.image}</div>
        </DragZone>
        <div>
            <div>{opt.label}</div>
            <div>{opt.id}</div> 
            <AddModal image={opt.image} onSubmit={(event) => onClick({event, newSelection: opt.id})}/>
        </div>
    </div>
    },
    [adderDisplayValues.imageFirst]: {
        styles: imageFirstStyles,
        view: (opt: optionI, onClick: ({ event, newSelection }: onChangeI) => void) => <div className={imageFirstStyles.option}>
        <DragZone type={DnDItemTypes.ITEM} id={opt.id} onDrag={() => onClick({event: null, newSelection: opt.id})}>
            <div aria-hidden={true} className={imageFirstStyles.image}>{opt.image}</div>
        </DragZone>
        <div>{opt.label}</div>
        <div>{opt.id}</div>
        <AddModal image={opt.image} onSubmit={(event) => onClick({event, newSelection: opt.id})}/>
    </div>
    },
    [radioDisplayValues.card]: {
        styles: cardStyles,
        view: (opt: optionI) => <div className={cardStyles.option}>
            <div aria-hidden={true} className={cardStyles.image}>{opt.image}</div>
            <div>
                <div>{opt.label}</div>
                <div>{opt.id}</div>
            </div>
        </div>
    },
    [radioDisplayValues.titled]: {
        styles: titledStyles,
        view: (opt: optionI) => <div className={titledStyles.option}>
            <div>{opt.label}</div>
            <div aria-hidden={true} className={titledStyles.image}>{opt.image}</div>
            <div>{opt.id}</div>
        </div>
    },
    [radioDisplayValues.imageFirst]: {
        styles: imageFirstStyles,
        view: (opt: optionI) => <div className={imageFirstStyles.option}>
            <div aria-hidden={true} className={imageFirstStyles.image}>{opt.image}</div>
            <div>{opt.label}</div>
            <div>{opt.id}</div>
        </div>
    },
}
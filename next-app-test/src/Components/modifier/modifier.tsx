import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifiersT, optionI } from '-/page-components/build-your-own/build-your-own.util'
import { modifierCollectionDisplayValues } from '-/data/mockUtil.data'
import { CategorizedRadioInputGroup } from '../form-controls/categorized-radio-input-group'

import cardStyles from './card-styles.module.scss'
import imageFirstStyles from './image-first-styles.module.scss'
import titledStyles from './titled-styles.module.scss'
import BYOStyles from '#/build-your-own.module.scss'

interface BuildYourOwnPageI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

// from https://stackoverflow.com/questions/42136098/array-groupby-in-typescript
// K-TODO: put this somewhere else
const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

const collectionDisplays = {
    [modifierCollectionDisplayValues.card]: {
        styles: cardStyles,
        mirage: (opt: optionI) => <div className={cardStyles.option}>
            <div aria-hidden={true} className={cardStyles.image}>{opt.image}</div>
            <div>
                <div>{opt.label}</div>
                <div>{opt.id}</div>
            </div>
        </div>
    },
    [modifierCollectionDisplayValues.titled]: {
        styles: titledStyles,
        mirage: (opt: optionI) => <div className={titledStyles.option}>
            <div>{opt.label}</div>
            <div aria-hidden={true} className={titledStyles.image}>{opt.image}</div>
            <div>{opt.id}</div>
        </div>
    },
    [modifierCollectionDisplayValues.imageFirst]: {
        styles: imageFirstStyles,
        mirage: (opt: optionI) => <div className={imageFirstStyles.option}>
            <div aria-hidden={true} className={imageFirstStyles.image}>{opt.image}</div>
            <div>{opt.label}</div>
            <div>{opt.id}</div>
        </div>
    },
}

const makeId = (toId: string) => toId.replace(/ /g,"-");

export const Modifiers = observer(({model, modifiers}: BuildYourOwnPageI) => {
    const newModifiers = modifiers.map((mod) => {
        const groupedOptions = groupBy(mod.options, i => {
            const [, value] = Object.entries(i).find(([key,]) => key === mod.groupBy) || [];
            return value;
        });
        return {...mod, id:`${makeId(mod.label)}`,  groupedOptions: groupedOptions};
    })
    return <BasicAccordionGroup>
        {newModifiers.map(mod => <BasicAccordion
            key={mod.id}
            stylesOverride={BYOStyles}
            headerText={mod.label}
            headerLevel={3}
            id={mod.id}
        >
            <CategorizedRadioInputGroup
                heading={`${mod.label} ${mod.groupBy}`}
                onChange={({newSelection}) => model.updateConfigItemSelection({id: mod.label, selection: newSelection})}
                categorizedOptions={Object.entries(mod.groupedOptions)
                    .map(([category, options]) => ({id:`${mod.id}_${category}`, category, options}))
                }
                styles={collectionDisplays[mod.display]?.styles}
                mirage={collectionDisplays[mod.display]?.mirage} 
            />
        </BasicAccordion>)}
    </BasicAccordionGroup>
})

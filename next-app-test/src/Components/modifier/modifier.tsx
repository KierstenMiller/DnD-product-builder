import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { InputRadio } from '-/Components/form-controls/input-radio'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { GroupedList } from '-/Components/organizer/groupedList'
import { modifiersT, optionI } from '-/page-components/build-your-own/build-your-own.util'
import { groupByValues, modifierCollectionDisplayValues } from '-/data/mockUtil.data'

import cardStyles from './card-styles.module.scss'
import imageFirstStyles from './image-first-styles.module.scss'
import titledStyles from './titled-styles.module.scss'
import BYOStyles from '#/build-your-own.module.scss'
import styles from '#/Home.module.scss'

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
            <div className={cardStyles.image}>{opt.image}</div>
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
            <div className={titledStyles.image}>{opt.image}</div>
            <div>{opt.id}</div>
        </div>
    },
    [modifierCollectionDisplayValues.imageFirst]: {
        styles: imageFirstStyles,
        mirage: (opt: optionI) => <div className={imageFirstStyles.option}>
            <div className={imageFirstStyles.image}>{opt.image}</div>
            <div>{opt.label}</div>
            <div>{opt.id}</div>
        </div>
    },
}

export const Modifiers = observer(({model, modifiers}: BuildYourOwnPageI) => {
    const newModifiers = modifiers.map(mod => {
        const groupedOptions = groupBy(mod.options, i => {
            const [, value] = Object.entries(i).find(([key,]) => key === mod.groupBy) || []
            return value;
        });
        return {...mod, groupedOptions: groupedOptions};
    })
    return <BasicAccordionGroup>
        {newModifiers.map(mod => <BasicAccordion
            stylesOverride={BYOStyles}
            headerText={mod.label}
            headerLevel={3}
            id={mod.label}
        >
            {Object.entries(mod.groupedOptions).map(([key, value]) => <InputRadio
                key={key}
                heading={`${key} ${mod.groupBy}`}
                onChange={({newSelection}) => model.updateConfigItemSelection({id: mod.label, selection: newSelection})}
                options={value}
                styles={collectionDisplays[mod.display]?.styles}
                mirage={collectionDisplays[mod.display]?.mirage}
            />)}
        </BasicAccordion>)}
    </BasicAccordionGroup>
})

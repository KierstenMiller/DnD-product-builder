import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifiersT, optionI, optionsT } from '-/page-components/build-your-own/build-your-own.util'
import { groupByValues, modifierCollectionDisplayValues, sortByValues } from '-/data/mock/mockUtil.data'
import { CategorizedRadioInputGroup } from '../form-controls/categorized-radio-input-group'

import cardStyles from './card-styles.module.scss'
import imageFirstStyles from './image-first-styles.module.scss'
import titledStyles from './titled-styles.module.scss'
import BYOStyles from '#/build-your-own.module.scss'
import { RadioInputGroup } from '../form-controls/radio-input-group'

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

const groupByMap = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    const keyThing = key(item);
    const valueThing = groups.get(keyThing);
    if(keyThing && !valueThing) groups.set(keyThing, [item]);
    else if(keyThing && Array.isArray(valueThing)) valueThing.push(item);
    return groups;
}, new Map());

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

interface sortNumI {
    toSort: number[],
    sortBy: sortByValues,
}
interface sortAlphaI {
    toSort: string[],
    sortBy: sortByValues,
}

const sortAlpha = ({toSort, sortBy}: sortAlphaI) => toSort.sort((a, b) =>  sortBy === sortByValues.ascending
    ? a.toLowerCase() < b.toLowerCase() ? -1 : 1
    : a.toLowerCase() < b.toLowerCase() ? 1 : -1
)
const sortNum = ({toSort, sortBy}: sortNumI) => toSort.sort((a, b) => sortBy === sortByValues.ascending
    ? a - b
    : b - a
);
const sortList = (toSort: any[], sortBy: sortByValues) => {
    if (toSort.every((i) =>  typeof i === "number")) return sortNum({toSort, sortBy});
    if (toSort.every((i) =>  typeof i === "string")) return sortAlpha({toSort, sortBy});
    console.warn('Could not perform sort');
}
// Could use this function when we move data massaging to serverside
// using map to ensure stability of key order. BIG WHY:Object.entries(someObject) converts numbers to strings, someMap.entries() keeps numbers as numbers (numbers and strings can't be sorted the same, so converting all numbers to strings is problematic)
const assembleOptionsMap = (options: optionsT, groupBy?: groupByValues , sortBy?: sortByValues) => {
    const groupedMap = groupByMap(options, opt => { 
        const [, value] = Object.entries(opt).find(([key,]) => key === groupBy) || [];
        // TODO: add optional groupByLabel for 'having' sorted mod options
        const groupLabel = typeof value === "boolean" ? `${groupBy}: ${value.toString()}`: value
        return groupLabel;
    }); 
    return (!sortBy || sortBy === sortByValues.having)
    ? groupedMap
    : new Map((sortList([...groupedMap.keys()], sortBy) || []).map( key => [key, groupedMap.get(key)]))
}

export const Modifiers = observer(({model, modifiers}: BuildYourOwnPageI) => {
    const newModifiers = modifiers.map((mod) => {
        const theSort = Array.isArray(mod.sortBy) ? mod.sortBy[0] : mod.sortBy; // TODO: implement more than 1 sort
        return {
            ...mod,
            id:`${mod.id}`,
            ...(mod.groupBy || theSort) && {
                composedOptions: assembleOptionsMap(mod.options, mod.groupBy, theSort)
            }
        }
    });
    return <BasicAccordionGroup>
        {newModifiers.map(mod => <BasicAccordion
            key={mod.id}
            stylesOverride={BYOStyles}
            headerText={mod.label}
            headerLevel={3}
            id={mod.id}
        >
            {mod.composedOptions
                ? <CategorizedRadioInputGroup
                    heading={`${mod.label} ${mod.groupBy}`}
                    onChange={({newSelection}) => model.updateConfigSelection({id: mod.id, selection: newSelection})}
                    categorizedOptions={[...mod.composedOptions.entries()].map(([category, options]) => ({id:`${mod.id}_${category}`, category, options}))}
                    styles={collectionDisplays[mod.display]?.styles}
                    mirage={collectionDisplays[mod.display]?.mirage} 
                />
                : <RadioInputGroup
                    heading={mod.label}
                    options={mod.options}
                    onChange={({newSelection}) => model.updateConfigSelection({id: mod.id, selection: newSelection})}
                    styles={collectionDisplays[mod.display]?.styles}
                    mirage={collectionDisplays[mod.display]?.mirage} 
                />
            }
            
        </BasicAccordion>)}
    </BasicAccordionGroup>
})

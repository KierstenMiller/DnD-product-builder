import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { InputRadio } from '-/Components/form-controls/input-radio'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { GroupedList } from '-/Components/organizer/groupedList'
import { modifiersT } from '-/page-components/build-your-own/build-your-own.util'
import { groupByValues } from '-/data/mockUtil.data'

import mirageStyles from './mirage-styles.module.scss'
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

export const Modifiers = observer(({model, modifiers}: BuildYourOwnPageI) => {
    const newModifiers = modifiers.map(mod => {
        const groupedOptions = groupBy(mod.options, i => {
            const [, value] = Object.entries(i).find(([key,]) => key === mod.groupBy) || []
            return value;
        });
        return {...mod, groupedOptions: groupedOptions};
    })
    console.log('newModifier', newModifiers);
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
                styles={mirageStyles}
                mirage={(opt) => <div>IM A MIRAGE OF {opt.label}</div>}
            />)}
        </BasicAccordion>)}
    </BasicAccordionGroup>
})

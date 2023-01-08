import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { InputRadio } from '-/Components/form-controls/input-radio'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'

import BYOStyles from '#/build-your-own.module.scss'
import styles from '#/Home.module.scss'
import { GroupedList } from '-/Components/organizer/groupedList'
import { modifiersT } from '-/page-components/build-your-own/build-your-own.util'
import { groupByValues } from '-/data/mockUtil.data'

interface BuildYourOwnPageI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}
// from https://stackoverflow.com/questions/42136098/array-groupby-in-typescript
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
            <GroupedList groupByKey={mod.groupBy} itemsToGroup={mod.options}/>
            <InputRadio
                heading={mod.label}
                onChange={({newSelection}) => model.updateConfigItemSelection({id: mod.label, selection: newSelection})}
                options={mod.options}
            />
        </BasicAccordion>)}
    </BasicAccordionGroup>
})

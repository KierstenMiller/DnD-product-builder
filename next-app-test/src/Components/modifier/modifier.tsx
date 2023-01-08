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

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export const Modifier = observer(({model, modifiers}: BuildYourOwnPageI) => {
    
    const whatIsThis = modifiers.map(mod => {
        console.log('----------', mod.groupBy);
        const thing = groupBy(mod.options, i => {
            const [, value] = Object.entries(i).find(([key,]) => key === mod.groupBy) || []
            return value;
        });
        console.log(thing);
        return thing;
    })
    console.log('whatIsThis', whatIsThis);
    return <BasicAccordionGroup>
        {modifiers.map(mod => <BasicAccordion
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

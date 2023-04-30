import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { StandardModelT } from '-/page-components/build-your-own/models/standard.model'
import { modifierI, modifiersT } from '-/page-components/build-your-own/build-your-own.types'
import { ModifierInstance } from './modifier'
import { onChangeI } from '../form-controls/radioInput'
import { assembleModifierMap } from './modifier.util'
import { sortByValues } from './modifier.types'

interface BuildYourOwnPageI {
    model: StandardModelT,
    modifiers: modifiersT,
}

export const ModifierGroups = observer(({ model, modifiers }: BuildYourOwnPageI) => {
    const sortedGroupedModifiers = assembleModifierMap(modifiers, 'groupKey', sortByValues.descending)
    const getOptionValue = (modId: string, selectionId: string) => {
        const match = modifiers.find(mod => mod.id === modId)?.options.find(o => o.id === selectionId)?.value;
        if (!match) throw new Error(`${selectionId} was not found as a value in modifier ${modId}`)
        return match;
    }
    const onChange = ({ newSelection }: onChangeI, mod: modifierI) => {
        console.log('RUNNING onChange');
        model.updateConfigSelection({ id: mod.id, selection: newSelection, value: getOptionValue(mod.id, newSelection) })

    }
    return <>
        {[...sortedGroupedModifiers.entries()].map(([category, modifierGroup]) => <BasicAccordionGroup key={category} className="mt-large">
            {modifierGroup.map(mod => <ModifierInstance key={mod.id} mod={mod} onChange={(args) => onChange(args, mod)} />)}
        </BasicAccordionGroup>)
        }
    </>
})

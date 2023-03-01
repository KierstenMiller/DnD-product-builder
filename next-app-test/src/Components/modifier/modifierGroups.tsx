import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifierI, modifiersT } from '-/page-components/build-your-own/build-your-own.types'
import { ModifierInstance } from './modifier'
import { onChangeI } from '../form-controls/radio-input'
import { assembleModifierMap } from './modifier.util'
import { sortByValues } from './modifier.types'

interface BuildYourOwnPageI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export const ModifierGroups = observer(({ model, modifiers }: BuildYourOwnPageI) => {
    const sortedGroupedModifiers = assembleModifierMap(modifiers, 'groupKey', sortByValues.descending)
    const getOptionValue = (modId: string, selectionId: string) => {
        const match = modifiers.find(mod => mod.id === modId)?.options.find(o => o.id === selectionId)?.optionKey;
        if (!match) throw new Error(`${selectionId} was not found as an optionkey in modifier ${modId}`)
        return match;
    }
    const onChange = ({ newSelection }: onChangeI, mod: modifierI) => model.updateConfigSelection({ id: mod.id, selection: newSelection, value: getOptionValue(mod.id, newSelection) })
    return <>
        {[...sortedGroupedModifiers.entries()].map(([category, modifierGroup]) => <BasicAccordionGroup className="mt-large">
            {modifierGroup.map(mod => <ModifierInstance mod={mod} onChange={(args) => onChange(args, mod)} />)}
        </BasicAccordionGroup>)
        }
    </>
})

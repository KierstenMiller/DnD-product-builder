import { observer } from 'mobx-react-lite'

import { assembleModifierMap } from '-/build-your-own/shared/modifier-components/shared/logic/modifier.util'
import { sortByValues } from '-/build-your-own/shared/modifier-components/shared/typing/modifier.types'
import { type StandardModelT, type modifierI, type modifiersT } from '-/build-your-own/shared/typing/build-your-own.types'
import { BasicAccordionGroup } from '-/component-library/accordion/basic-accordion-group'
import { type onChangeI } from '-/component-library/form-controls/radioInput/radio-input'
import { ModifierInstance } from './modifier'

interface BuildYourOwnPageI {
  model: StandardModelT
  modifiers: modifiersT
}

export const ModifierGroups = observer(({ model, modifiers }: BuildYourOwnPageI) => {
  const sortedGroupedModifiers = assembleModifierMap(modifiers, 'modifierChunkKey', sortByValues.descending)
  const getOptionValue = (modId: string, selectionId: string) => {
    const match = modifiers.find(mod => mod.id === modId)?.options.find(o => o.id === selectionId)?.value
    if (!match) throw new Error(`${selectionId} was not found as a value in modifier ${modId}`)
    return match
  }
  const onChange = ({ newSelection }: onChangeI, mod: modifierI) => {
    model.updateConfigSelection({ id: mod.id, selection: newSelection, value: getOptionValue(mod.id, newSelection) })
  }
  return <>
    {[...sortedGroupedModifiers.entries()].map(([category, modifierGroup]) => <BasicAccordionGroup key={category} className="mt-large">
      {modifierGroup.map((mod: modifierI) => <ModifierInstance key={mod.id} mod={mod} onChange={(args) => { onChange(args, mod) }} />)}
    </BasicAccordionGroup>)
    }
  </>
})

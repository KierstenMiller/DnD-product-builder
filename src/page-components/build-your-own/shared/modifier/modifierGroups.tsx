import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { type onChangeI } from '-/Components/form-controls/radioInput/radioInput'
import { type StandardModelT, type modifierI, type modifiersT } from '-/page-components/build-your-own/build-your-own.types'
import { ModifierInstance } from './modifier'
import { sortByValues } from './modifier.types'
import { assembleModifierMap } from './modifier.util'

interface BuildYourOwnPageI {
  model: StandardModelT
  modifiers: modifiersT
  styles: any // K-TODO: type this
}

export const ModifierGroups = observer(({ model, modifiers, styles }: BuildYourOwnPageI) => {
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
      {modifierGroup.map((mod: modifierI) => <ModifierInstance key={mod.id} mod={mod} styles={styles} onChange={(args) => { onChange(args, mod) }} />)}
    </BasicAccordionGroup>)
    }
  </>
})

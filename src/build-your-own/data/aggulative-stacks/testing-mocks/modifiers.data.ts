import { adderDisplayValues, radioDisplayValues } from '-/build-your-own/shared/modifier-components/shared/components/display-components/displays.types'
import { modifierChunkKeyValues } from '-/build-your-own/shared/modifier-components/shared/typing/modifier.types'
import { fillOptions, heightOptions, strokeOptions } from './options.data'

export const modifiers = [
  {
    id: 'mod-height',
    label: 'Block Height',
    modifierChunkKey: modifierChunkKeyValues.unique,
    display: adderDisplayValues.imageFirst,
    options: heightOptions
  },
  {
    id: 'mod-fill',
    label: 'Fill Color',
    modifierChunkKey: modifierChunkKeyValues.global,
    display: radioDisplayValues.titled,
    options: fillOptions
  },
  {
    id: 'mod-stroke',
    label: 'Stroke Color',
    modifierChunkKey: modifierChunkKeyValues.global,
    display: radioDisplayValues.titled,
    options: strokeOptions
  }
]

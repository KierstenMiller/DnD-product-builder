import { radioDisplayValues } from '-/build-your-own/shared/modifier-components/shared/components/display-components/displays.types'
import { modifierChunkKeyValues } from '-/build-your-own/shared/modifier-components/shared/typing/modifier.types'
import { fillOptions, shapeOptions, strokeOptions } from './options.data'

export const shapeModifiers = [
  {
    id: 'mod-shape',
    label: 'Shape',
    modifierChunkKey: modifierChunkKeyValues.global,
    display: radioDisplayValues.imageFirst,
    options: shapeOptions
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

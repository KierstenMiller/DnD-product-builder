import { adderDisplayValues, groupByValues, modifierChunkKeyValues, radioDisplayValues, sortByValues } from '../../../page-components/build-your-own/shared/modifier/modifier.types'
import { blockOptions, fillOptions, strokeOptions } from './options.data'

export const modifiers = [
  {
    id: 'mod-blocks',
    label: 'Blocks',
    modifierChunkKey: modifierChunkKeyValues.unique,
    groupBy: groupByValues.rank,
    sortBy: sortByValues.ascending,
    display: adderDisplayValues.imageFirst,
    options: blockOptions
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

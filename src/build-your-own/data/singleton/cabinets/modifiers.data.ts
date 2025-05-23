import { radioDisplayValues } from '-/build-your-own/shared/modifier-components/shared/components/display-components/displays.types'
import { groupByValues, modifierChunkKeyValues, sortByValues } from '-/build-your-own/shared/modifier-components/shared/typing/modifier.types'
import { cabinetColorOptions, cabinetSizeOptions, cabinetHandleOptions, cabinetLegOptions } from './options.data'

export const cabinetModifiers = [
  {
    id: 'mod-size',
    label: 'Cabinet Size',
    modifierChunkKey: modifierChunkKeyValues.global,
    display: radioDisplayValues.imageFirst,
    options: cabinetSizeOptions
  },
  {
    id: 'mod-color',
    label: 'Cabinet Color',
    subLabel: 'Choose Your Cabinet Color',
    groupLabel: 'Color Family',
    modifierChunkKey: modifierChunkKeyValues.global,
    display: radioDisplayValues.card,
    options: cabinetColorOptions,
    groupBy: groupByValues.colorFamily,
    sortBy: sortByValues.ascending
  },
  {
    id: 'mod-handles',
    label: 'Cabinet Handles',
    modifierChunkKey: modifierChunkKeyValues.global,
    display: radioDisplayValues.imageFirst,
    options: cabinetHandleOptions
  },
  {
    id: 'mod-legs',
    label: 'Cabinet Legs',
    modifierChunkKey: modifierChunkKeyValues.global,
    display: radioDisplayValues.imageFirst,
    options: cabinetLegOptions
  }
]

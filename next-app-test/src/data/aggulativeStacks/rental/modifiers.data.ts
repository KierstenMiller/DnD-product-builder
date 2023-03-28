import { adderDisplayValues, groupByValues, groupKeyValues, radioDisplayValues, sortByValues } from "../../../Components/modifier/modifier.types";
import { blockOptions, fillOptions, strokeOptions } from "./options.data";

// TODO: RENAME groupBy to optionsGroupByProp
export const modifiers = [
    {
        id: 'mod-blocks',
        label: 'Blocks',
        groupKey: groupKeyValues.unique,
        groupBy: groupByValues.rank,
        sortBy:sortByValues.ascending,
        display: adderDisplayValues.imageFirst,
        options: blockOptions,
    },
    {
        id: 'mod-fill',
        label: 'Fill Color',
        groupKey: groupKeyValues.global,
        display: radioDisplayValues.titled,
        options: fillOptions,
    },
    {
        id: 'mod-stroke',
        label: 'Stroke Color',
        groupKey: groupKeyValues.global,
        display: radioDisplayValues.titled,
        options: strokeOptions,
    },
]
    

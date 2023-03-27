import { adderDisplayValues, groupKeyValues, radioDisplayValues } from "../../../Components/modifier/modifier.types";
import { fillOptions, heightOptions, strokeOptions } from "./options.data";

// TODO: RENAME groupBy to optionsGroupByProp
export const modifiers = [
    {
        id: 'mod-height',
        label: 'Block Height',
        groupKey: groupKeyValues.unique,
        display: adderDisplayValues.imageFirst,
        options: heightOptions,
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
    

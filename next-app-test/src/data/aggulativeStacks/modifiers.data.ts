import { adderDisplayValues, radioDisplayValues } from "../../Components/modifier/modifier.types";
import { fillOptions, heightOptions, strokeOptions } from "./options.data";

export const modifiers = [
    {
        id: 'mod-height',
        label: 'Block Height',
        groupKey: 'unique-config',
        display: adderDisplayValues.imageFirst,
        options: heightOptions,
    },
    {
        id: 'mod-fill',
        label: 'Fill Color',
        groupKey: 'global-config',
        display: radioDisplayValues.titled,
        options: fillOptions,
    },
    {
        id: 'mod-stroke',
        label: 'Stroke Color',
        groupKey: 'global-config',
        display: radioDisplayValues.titled,
        options: strokeOptions,
    },
]
    

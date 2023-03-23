import { groupKeyValues, radioDisplayValues } from "../../Components/modifier/modifier.types";
import { fillOptions, shapeOptions, strokeOptions } from "./options.data";

export const shapeModifiers = [
    {
        id: 'mod-shape',
        label: 'Shape',
        groupKey: groupKeyValues.global,
        display: radioDisplayValues.imageFirst,
        options: shapeOptions,
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
    

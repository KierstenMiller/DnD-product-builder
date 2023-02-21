import { modifierCollectionDisplayValues } from "../mock/mockUtil.data";
import { fillOptions, shapeOptions, strokeOptions } from "./shapeOptions.data";

export const shapeModifiers = [
    {
        id: 'mod-shape',
        label: 'Shape',
        display: modifierCollectionDisplayValues.imageFirst,
        options: shapeOptions,
    },
    {
        id: 'mod-fill',
        label: 'Fill Color',
        display: modifierCollectionDisplayValues.titled,
        options: fillOptions,
    },
    {
        id: 'mod-stroke',
        label: 'Stroke Color',
        display: modifierCollectionDisplayValues.titled,
        options: strokeOptions,
    },
]
    

import { groupByValues, modifierCollectionDisplayValues, sortByValues } from "../mock/mockUtil.data";
import { robotColorOptions, robotPersonalityOptions, robotShapeOptions, robotSupportOptions } from "./robotOptions.data";
import { shapeColorOptions, shapeOptions } from "./shapeOptions.data";

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
        options: shapeColorOptions,
    },
    {
        id: 'mod-stroke',
        label: 'Stroke Color',
        display: modifierCollectionDisplayValues.titled,
        options: shapeColorOptions,
    },
]
    

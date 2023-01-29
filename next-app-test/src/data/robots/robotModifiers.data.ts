import { groupByValues, modifierCollectionDisplayValues, sortByValues } from "../mock/mockUtil.data";
import { robotColorOptions, robotPersonalityOptions, robotShapeOptions, robotSupportOptions } from "./robotOptions.data";

export const robotModifiers = [
    {
        id: 'mod-classification',
        label: 'Classification',
        groupBy: groupByValues.height,
        sortBy: sortByValues.ascending,
        display: modifierCollectionDisplayValues.card,
        options: robotShapeOptions,
    },
    {
        id: 'mod-color',
        label: 'Color',
        display: modifierCollectionDisplayValues.imageFirst,
        options: robotColorOptions,
    },
    {
        id: 'mod-supports',
        label: 'Supports',
        display: modifierCollectionDisplayValues.titled,
        options: robotSupportOptions,
    },
    {
        id: 'mod-personality',
        label: 'Personality',
        display: modifierCollectionDisplayValues.imageFirst,
        options: robotPersonalityOptions,
    },
]
    

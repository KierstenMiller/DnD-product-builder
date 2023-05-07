import { groupByValues, modifierChunkKeyValues, radioDisplayValues, sortByValues } from "../../../Components/modifier/modifier.types";
import { robotColorOptions, robotPersonalityOptions, robotShapeOptions, robotSupportOptions } from "./options.data";

export const robotModifiers = [
    {
        id: 'mod-classification',
        label: 'Classification',
        modifierChunkKey: modifierChunkKeyValues.global,
        groupBy: groupByValues.height,
        sortBy: sortByValues.ascending,
        display: radioDisplayValues.card,
        options: robotShapeOptions,
    },
    {
        id: 'mod-color',
        label: 'Color',
        modifierChunkKey: modifierChunkKeyValues.global,
        display: radioDisplayValues.imageFirst,
        options: robotColorOptions,
    },
    {
        id: 'mod-supports',
        label: 'Supports',
        modifierChunkKey: modifierChunkKeyValues.global,
        display: radioDisplayValues.titled,
        options: robotSupportOptions,
    },
    {
        id: 'mod-personality',
        label: 'Personality',
        modifierChunkKey: modifierChunkKeyValues.global,
        display: radioDisplayValues.imageFirst,
        options: robotPersonalityOptions,
    },
]
    

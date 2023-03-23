import { groupByValues, groupKeyValues, radioDisplayValues, sortByValues } from "../../../Components/modifier/modifier.types";
import { robotColorOptions, robotPersonalityOptions, robotShapeOptions, robotSupportOptions } from "./options.data";

export const robotModifiers = [
    {
        id: 'mod-classification',
        label: 'Classification',
        groupKey: groupKeyValues.global,
        groupBy: groupByValues.height,
        sortBy: sortByValues.ascending,
        display: radioDisplayValues.card,
        options: robotShapeOptions,
    },
    {
        id: 'mod-color',
        label: 'Color',
        groupKey: groupKeyValues.global,
        display: radioDisplayValues.imageFirst,
        options: robotColorOptions,
    },
    {
        id: 'mod-supports',
        label: 'Supports',
        groupKey: groupKeyValues.global,
        display: radioDisplayValues.titled,
        options: robotSupportOptions,
    },
    {
        id: 'mod-personality',
        label: 'Personality',
        groupKey: groupKeyValues.global,
        display: radioDisplayValues.imageFirst,
        options: robotPersonalityOptions,
    },
]
    

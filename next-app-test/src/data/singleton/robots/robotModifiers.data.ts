import { groupByValues, radioDisplayValues, sortByValues } from "../../../Components/modifier/modifier.types";
import { robotColorOptions, robotPersonalityOptions, robotShapeOptions, robotSupportOptions } from "./robotOptions.data";

export const robotModifiers = [
    {
        id: 'mod-classification',
        label: 'Classification',
        groupBy: groupByValues.height,
        sortBy: sortByValues.ascending,
        display: radioDisplayValues.card,
        options: robotShapeOptions,
    },
    {
        id: 'mod-color',
        label: 'Color',
        display: radioDisplayValues.imageFirst,
        options: robotColorOptions,
    },
    {
        id: 'mod-supports',
        label: 'Supports',
        display: radioDisplayValues.titled,
        options: robotSupportOptions,
    },
    {
        id: 'mod-personality',
        label: 'Personality',
        display: radioDisplayValues.imageFirst,
        options: robotPersonalityOptions,
    },
]
    

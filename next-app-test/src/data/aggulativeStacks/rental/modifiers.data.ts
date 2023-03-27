import { adderDisplayValues, groupKeyValues, radioDisplayValues } from "../../../Components/modifier/modifier.types";
import { amenityOptions, apartmentOptions, entryOptions, fillOptions, strokeOptions } from "./options.data";

// TODO: RENAME groupBy to optionsGroupByProp
export const modifiers = [
    {
        id: 'mod-entries',
        label: 'Entries',
        groupKey: groupKeyValues.unique,
        display: adderDisplayValues.imageFirst,
        options: entryOptions,
    },
    {
        id: 'mod-apartments',
        label: 'Apartments',
        groupKey: groupKeyValues.unique,
        display: adderDisplayValues.imageFirst,
        options: apartmentOptions,
    },
    {
        id: 'mod-amenities',
        label: 'Amenities',
        groupKey: groupKeyValues.unique,
        display: adderDisplayValues.imageFirst,
        options: amenityOptions,
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
    

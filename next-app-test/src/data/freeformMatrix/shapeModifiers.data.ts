import { radioDisplayValues } from "../../Components/modifier/modifier.types";
import { fillOptions, shapeOptions, strokeOptions } from "./shapeOptions.data";

export const shapeModifiers = [
    {
        id: 'mod-shape',
        label: 'Shape',
        display: radioDisplayValues.imageFirst,
        options: shapeOptions,
    },
    {
        id: 'mod-fill',
        label: 'Fill Color',
        display: radioDisplayValues.titled,
        options: fillOptions,
    },
    {
        id: 'mod-stroke',
        label: 'Stroke Color',
        display: radioDisplayValues.titled,
        options: strokeOptions,
    },
]
    

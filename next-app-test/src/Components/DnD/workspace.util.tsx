import { configT, modifiersT } from "-/page-components/build-your-own/build-your-own.util";

//////////////////////
//      TYPING      //
//////////////////////
export enum DnDItemTypes {
    ITEM = "item",
    WORKSPACE_ITEM = "workspace-item"
}

export interface iconColoringI {
    fill: colorCodes,
    stroke: colorCodes,
}

//////////////////////////////////////////
//      ENUMS AND LIBRARY OBJECTS      //
/////////////////////////////////////////
export enum shapeKeys {
    circle= 'circle',
    square= 'square',
    star= 'star',
    triangle= 'triangle',
}
export enum colorKeys {
    defaultRed= 'default-red',
    lightRed= 'light-red',
    defaultBlue= 'default-blue',
    lightBlue= 'light-blue',
    defaultGreen= 'default-green',
    lightGreen= 'light-green',
}
enum colorCodes {
    defaultRed= '#ff0000',
    lightRed= '#ff8080',
    defaultBlue= '#0000ff',
    lightBlue= '#7f7fff',
    defaultGreen= '#00ff00',
    lightGreen= '#8ffb8f',
}
const colors = {
    [colorKeys.defaultRed]: colorCodes.defaultRed,
    [colorKeys.lightRed]: colorCodes.lightRed,
    [colorKeys.defaultBlue]: colorCodes.defaultBlue,
    [colorKeys.lightBlue]: colorCodes.lightBlue,
    [colorKeys.defaultGreen]: colorCodes.defaultGreen,
    [colorKeys.lightGreen]: colorCodes.lightGreen,
}
const icons = {
    [shapeKeys.circle]: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <circle style={{fill: fill, stroke: stroke}} cx="38.05" cy="38.05" r="28"/>
    </svg>,
    [shapeKeys.square]: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <rect style={{fill: fill, stroke: stroke}} x="10.05" y="10.05" width="56" height="56"/>
    </svg>,
    [shapeKeys.star]: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <polygon style={{fill: fill, stroke: stroke}} points="38.05 10.05 45 31.44 67.5 31.44 49.3 44.66 56.25 66.05 38.05 52.83 19.86 66.05 26.81 44.66 8.61 31.44 31.1 31.44 38.05 10.05"/>
    </svg>,
    [shapeKeys.triangle]: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <polygon style={{fill: fill, stroke: stroke}} points="38.05 10.05 54.22 38.05 70.39 66.05 38.05 66.05 5.72 66.05 21.89 38.05 38.05 10.05"/>
    </svg>
}

////////////////////////
//      METHODS      //
///////////////////////
// TODO: generalize this, dont hardcode ids
export const getImage = (shapeKey: string, fillColorKey: string, strokeColorKey: string) => {
    const shapeIcon = shapeKey && Object.values(shapeKeys).includes(shapeKey as shapeKeys) && icons[(shapeKey as shapeKeys)];
    const fill = fillColorKey && Object.values(colorKeys).includes(fillColorKey as colorKeys) && colors[(fillColorKey as colorKeys)];
    const stroke = strokeColorKey && Object.values(colorKeys).includes(strokeColorKey as colorKeys) && colors[(strokeColorKey as colorKeys)];
    return  shapeIcon && fill && stroke
        ? shapeIcon({fill, stroke})
        : icons.circle({fill: colorCodes.defaultGreen, stroke: colorCodes.defaultBlue}) // TODO: FAIL HARD
}
export const generateImage = (config: configT, modifiers: modifiersT) => {
    const shapeSelection = config.find(c => c.id === 'mod-shape')?.selection;
    const fillSelection = config.find(c => c.id === 'mod-fill')?.selection;
    const fill = modifiers.find(m => m.id === 'mod-fill')?.options?.find(o => o.id === fillSelection)?.colorKey;
    const strokeSelection = config.find(c => c.id === 'mod-stroke')?.selection;
    const stroke = modifiers.find(m => m.id === 'mod-stroke')?.options?.find(o => o.id === strokeSelection)?.colorKey;
    return (shapeSelection && fill && stroke)
    ? getImage(shapeSelection, fill, stroke)
    : null;
}
import { type configT } from '-/page-components/build-your-own/build-your-own.types'

/// ///////////////////
//      TYPING      //
/// ///////////////////
export enum DnDItemTypes {
  ITEM = 'item',
  WORKSPACE_ITEM = 'workspace-item'
}

export interface iconColoringI {
  fill: colorCodes
  stroke: colorCodes
}

/// ///////////////////////////////////////
//      ENUMS AND LIBRARY OBJECTS      //
/// //////////////////////////////////////
export enum shapeKeys {
  circle = 'circle',
  square = 'square',
  star = 'star',
  triangle = 'triangle',
}

export enum blockKeys {
  oneBlock = 'one-block',
  twoBlock = 'two-block',
  fourBlock = 'four-block',
}

export enum colorKeys {
  defaultRed = 'default-red',
  lightRed = 'light-red',
  defaultBlue = 'default-blue',
  lightBlue = 'light-blue',
  defaultGreen = 'default-green',
  lightGreen = 'light-green',
}
enum colorCodes {
  defaultRed = '#ff0000',
  lightRed = '#ff8080',
  defaultBlue = '#0000ff',
  lightBlue = '#7f7fff',
  defaultGreen = '#00ff00',
  lightGreen = '#8ffb8f',
}
const colors = {
  [colorKeys.defaultRed]: colorCodes.defaultRed,
  [colorKeys.lightRed]: colorCodes.lightRed,
  [colorKeys.defaultBlue]: colorCodes.defaultBlue,
  [colorKeys.lightBlue]: colorCodes.lightBlue,
  [colorKeys.defaultGreen]: colorCodes.defaultGreen,
  [colorKeys.lightGreen]: colorCodes.lightGreen
}
const icons = {
  [shapeKeys.circle]: ({ fill, stroke }: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <circle style={{ fill, stroke }} cx="38.05" cy="38.05" r="28" />
    </svg>,
  [shapeKeys.square]: ({ fill, stroke }: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <rect style={{ fill, stroke }} x="10.05" y="10.05" width="56" height="56" />
    </svg>,
  [shapeKeys.star]: ({ fill, stroke }: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <polygon style={{ fill, stroke }} points="38.05 10.05 45 31.44 67.5 31.44 49.3 44.66 56.25 66.05 38.05 52.83 19.86 66.05 26.81 44.66 8.61 31.44 31.1 31.44 38.05 10.05" />
    </svg>,
  [shapeKeys.triangle]: ({ fill, stroke }: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <polygon style={{ fill, stroke }} points="38.05 10.05 54.22 38.05 70.39 66.05 38.05 66.05 5.72 66.05 21.89 38.05 38.05 10.05" />
    </svg>
}

export const blockSize = 60

export const blocks = {
  [blockKeys.oneBlock]: ({ fill, stroke }: iconColoringI) => <svg width={blockSize} style={{ display: 'block', marginBottom: '-2px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.01 57.99">
        <rect style={{ fill, stroke }} x="1" y="1" width="56" height="56" />
    </svg>,
  [blockKeys.twoBlock]: ({ fill, stroke }: iconColoringI) => <svg width={blockSize} style={{ display: 'block', marginBottom: '-2px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 114">
        <rect style={{ fill, stroke }} x="1" y="1" width="56" height="56" />
        <rect style={{ fill, stroke }} x="1" y="57" width="56" height="56" />
    </svg>,
  [blockKeys.fourBlock]: ({ fill, stroke }: iconColoringI) => <svg width={blockSize} style={{ display: 'block', marginBottom: '-2px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.06 225.98">
        <rect style={{ fill, stroke }} x="1.04" y=".98" width="56" height="56" />
        <rect style={{ fill, stroke }} x="1.04" y="56.98" width="56" height="56" />
        <rect style={{ fill, stroke }} x="1.04" y="112.98" width="56" height="56" />
        <rect style={{ fill, stroke }} x="1.04" y="168.98" width="56" height="56" />
    </svg>
}

/// /////////////////////
//      METHODS      //
/// ////////////////////
export const getImage = (shapeKey: string, fillColorKey: string, strokeColorKey: string) => {
  const shapeIcon = shapeKey && Object.values(shapeKeys).includes(shapeKey as shapeKeys) && icons[(shapeKey as shapeKeys)]
  const fill = fillColorKey && Object.values(colorKeys).includes(fillColorKey as colorKeys) && colors[(fillColorKey as colorKeys)]
  const stroke = strokeColorKey && Object.values(colorKeys).includes(strokeColorKey as colorKeys) && colors[(strokeColorKey as colorKeys)]
  return shapeIcon && fill && stroke
    ? shapeIcon({ fill, stroke })
    : icons.circle({ fill: colorCodes.defaultGreen, stroke: colorCodes.defaultBlue })
}
export const generateImage = (config: configT) => {
  const shapeSelection = config.find(c => c.id === 'mod-shape')?.value
  const fill = config.find(c => c.id === 'mod-fill')?.value
  const stroke = config.find(c => c.id === 'mod-stroke')?.value
  return (shapeSelection && fill && stroke)
    ? getImage(shapeSelection, fill, stroke)
    : getImage(shapeKeys.circle, colorKeys.defaultRed, colorKeys.defaultRed)
}
export const getBlock = (blockKey: blockKeys, fillColorKey: colorKeys, strokeColorKey: colorKeys) => {
  const blockIcon = blocks[(blockKey)]
  const fill = colors[(fillColorKey)]
  const stroke = colors[(strokeColorKey)]
  return blockIcon({ fill, stroke })
}
export const generateBlock = (config: configT) => {
  const blockSelection = config.find(c => c.id === 'mod-height')?.value as blockKeys || blockKeys.oneBlock
  const fill = config.find(c => c.id === 'mod-fill')?.value as colorKeys || colorKeys.defaultRed
  const stroke = config.find(c => c.id === 'mod-stroke')?.value as colorKeys || colorKeys.defaultRed
  return getBlock(blockSelection, fill, stroke)
}

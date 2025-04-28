export enum cabinetSizeKeys {
  one = 'cab-one',
  two = 'cab-two',
  three = 'cab-three',
  four = 'cab-four'
}
export enum handleOptionKeys {
  handleTop = 'handle-top',
  handleRound = 'handle-round',
  handleShort = 'handle-short',
  handleLong = 'handle-long'
}
export enum legOptionKeys {
  legSturdy = 'leg-sturdy',
  legSticks = 'leg-sticks',
  legBar = 'leg-bar'
}
export enum colorKeys {
  defaultGrey = 'default-grey',
  millenialGrey = 'millenial-grey',
  rubyRed = 'ruby-red',
  peachPink = 'peach-pink',
  verdantGreen = 'verdant-green',
  summerGreen = 'summer-green',
  lapisBlue = 'lapis-blue',
  angelBlue = 'angel-blue'
}
export enum colorCodes {
  defaultGrey = '#404040',
  defaultGreyLight = '#777777',
  millenialGrey = '#bdc7d1',
  millenialGreyLight = '#e2ebf4',
  rubyRed = '#9b111e',
  rubyRedLight = '#C72C41',
  peachPink = '#FFD3AC',
  peachPinkLight = '#fcf1e1',
  verdantGreen = '#A8D3AA',
  verdantGreenLight = '#dff9ce',
  summerGreen = '#96BBAB',
  summerGreenLight = '#B2E0D4',
  lapisBlue = '#26619C',
  lapisBlueLight = '#A7C6ED',
  angelBlue = '#87C4FF',
  angelBlueLight = '#c8e7f7'
}
export const colors = {
  [colorKeys.defaultGrey]: [colorCodes.defaultGrey, colorCodes.defaultGreyLight],
  [colorKeys.millenialGrey]: [colorCodes.millenialGrey, colorCodes.millenialGreyLight],
  [colorKeys.rubyRed]: [colorCodes.rubyRed, colorCodes.rubyRedLight],
  [colorKeys.peachPink]: [colorCodes.peachPink, colorCodes.peachPinkLight],
  [colorKeys.verdantGreen]: [colorCodes.verdantGreen, colorCodes.verdantGreenLight],
  [colorKeys.summerGreen]: [colorCodes.summerGreen, colorCodes.summerGreenLight],
  [colorKeys.lapisBlue]: [colorCodes.lapisBlue, colorCodes.lapisBlueLight],
  [colorKeys.angelBlue]: [colorCodes.angelBlue, colorCodes.angelBlueLight]
}

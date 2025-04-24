import { type configT } from '-/build-your-own/shared/typing/build-your-own.types'

interface cabinetSmallOneI {
  fill: colorKeys
  handleOption: handleOptionKeys
  legOption: legOptionKeys
}

export enum handleOptionKeys {
  handleTop = 'handle-top',
  handleRound = 'handle-round',
  handleShort = 'handle-short',
  handleLong = 'handle-long',
}
export enum legOptionKeys {
  legSturdy = 'leg-sturdy',
  legSticks = 'leg-sticks',
  legBar = 'leg-bar',
}
export enum colorKeys {
  defaultGrey = 'default-grey',
  millenialGrey = 'millenial-grey',
  rubyRed = 'ruby-red',
  peachPink = 'peach-pink',
  verdantGreen = 'verdant-green',
  summerGreen = 'summer-green',
  lapisBlue = 'lapis-blue',
  angelBlue = 'angel-blue',
}
enum colorCodes {
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
  angelBlueLight = '#c8e7f7',
}
const colors = {
  [colorKeys.defaultGrey]: [colorCodes.defaultGrey, colorCodes.defaultGreyLight],
  [colorKeys.millenialGrey]: [colorCodes.millenialGrey, colorCodes.millenialGreyLight],
  [colorKeys.rubyRed]: [colorCodes.rubyRed, colorCodes.rubyRedLight],
  [colorKeys.peachPink]: [colorCodes.peachPink, colorCodes.peachPinkLight],
  [colorKeys.verdantGreen]: [colorCodes.verdantGreen, colorCodes.verdantGreenLight],
  [colorKeys.summerGreen]: [colorCodes.summerGreen, colorCodes.summerGreenLight],
  [colorKeys.lapisBlue]: [colorCodes.lapisBlue, colorCodes.lapisBlueLight],
  [colorKeys.angelBlue]: [colorCodes.angelBlue, colorCodes.angelBlueLight]
}
const handleOptions = {
  [handleOptionKeys.handleTop]: (fill: colorCodes) => <g id={handleOptionKeys.handleTop}>
    <rect style={{ fill }} x="356.5" y="235.66" width="2.62" height="19.51" transform="translate(715.63 490.83) rotate(180)" />
    <rect style={{ fill }} x="360.88" y="235.66" width="2.62" height="19.51" />
  </g>,
  [handleOptionKeys.handleRound]: (fill: colorCodes) => <g id={handleOptionKeys.handleRound}>
    <circle style={{ fill }} cx="370.79" cy="316.99" r="2.95" />
    <circle style={{ fill }} cx="349.28" cy="316.99" r="2.95" />
  </g>,
  [handleOptionKeys.handleShort]: (fill: colorCodes) => <g id={handleOptionKeys.handleShort}>
    <path style={{ fill }} d="M351.23,358.3c.07.2.1.41.1.62,0,1.14-.92,2.06-2.05,2.06s-2.05-.92-2.05-2.06c0-.21.03-.42.09-.62,1.25-5.05,1.4-12.2,0-17.06-.06-.2-.09-.41-.09-.62,0-1.14.92-2.06,2.05-2.06s2.05.92,2.05,2.06c0,.21-.03.42-.1.62-.01.02-.01.04-.02.06-1.36,4.84-1.23,11.92.01,16.95,0,.02.01.03.01.05Z" />
    <path style={{ fill }} d="M372.74,358.3c.07.2.1.41.1.62,0,1.14-.92,2.06-2.05,2.06s-2.05-.92-2.05-2.06c0-.21.03-.42.09-.62,1.25-5.05,1.4-12.2,0-17.06-.06-.2-.09-.41-.09-.62,0-1.14.92-2.06,2.05-2.06s2.05.92,2.05,2.06c0,.21-.03.42-.1.62-.01.02-.01.04-.02.06-1.36,4.84-1.23,11.92.01,16.95,0,.02.01.03.01.05Z" />
  </g>,
  [handleOptionKeys.handleLong]: (fill: colorCodes) => <g id={handleOptionKeys.handleLong}>
    <polygon style={{ fill }} points="372.38 318.69 372.38 380.87 373.56 380.87 373.56 385.53 367.98 385.53 367.98 380.87 369.19 380.87 369.19 318.69 367.98 318.69 367.98 314.03 373.56 314.03 373.56 318.69 372.38 318.69" />
    <polygon style={{ fill }} points="350.89 318.69 350.89 380.87 352.07 380.87 352.07 385.53 346.49 385.53 346.49 380.87 347.7 380.87 347.7 318.69 346.49 318.69 346.49 314.03 352.07 314.03 352.07 318.69 350.89 318.69" />
  </g>
}
const legOptionShapes = {
  [legOptionKeys.legSturdy]: (fill: colorCodes) => <g id={legOptionKeys.legSturdy}>
    <polygon style={{ fill }} points="465.64 473.27 464.97 499.17 452.66 499.17 452.38 488.27 267.62 488.27 267.34 499.17 255.03 499.17 254.36 473.27 265.55 473.27 265.55 473.26 454.45 473.26 454.45 473.27 465.64 473.27" />
  </g>,
  [legOptionKeys.legSticks]: (fill: colorCodes) => <g id={legOptionKeys.legSticks}>
    <g>
      <path style={{ fill }} d="M460.75,499.39c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
      <path style={{ fill }} d="M263.07,499.39c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
    </g>
    <path style={{ fill }} d="M254.2,473.28h211.4v1.7c0,.24-.19.43-.43.43h-210.55c-.24,0-.43-.19-.43-.43v-1.7h0Z" />
  </g>,
  [legOptionKeys.legBar]: (fill: colorCodes) => <g id={legOptionKeys.legBar}>
    <polygon style={{ fill }} points="460.66 473.26 460.66 498.58 454.79 498.58 454.79 497.4 265.21 497.4 265.21 498.58 259.34 498.58 259.34 473.26 265.34 473.26 265.34 491.4 454.66 491.4 454.66 473.26 460.66 473.26" />
  </g>
}

export const cabinetSmallOne = ({ fill, handleOption, legOption }: cabinetSmallOneI) => {
  console.log(colors[fill])
  const currentColor = colors[fill]
  const frameFill = currentColor[0]
  const doorFill = currentColor[1]
  const handle = handleOptions[handleOption] || handleOptions[handleOptionKeys.handleLong]
  const leg = legOptionShapes[legOption] || legOptionShapes[legOptionKeys.legSturdy]
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
    <g>
      <g id="cabinet-body">
        <polygon style={{ fill: frameFill }} points="473.53 226.3 246.47 226.3 246.51 220.61 473.49 220.61 473.53 226.3" />
        <path style={{ fill: frameFill }} d="M468.66,473.28h-217.32v-246.98h217.32v246.98ZM259.34,465.28h201.32v-230.98h-201.32v230.98Z" />
      </g>
      <g>
        <g id="cabinet-doors">
          <rect style={{ fill: doorFill }} x="360.88" y="235.66" width="98.19" height="228.23" />
          <rect style={{ fill: doorFill }} x="260.94" y="235.66" width="98.19" height="228.23" />
        </g>
        {handle(frameFill)}
      </g>
      {leg(frameFill)}
    </g>
  </svg>
}

export const generateCabinet = (config: configT) => {
  // const shapeSelection = config.find(c => c.id === 'mod-size')?.value as string
  const fillSelection = config.find(c => c.id === 'mod-color')?.value as colorKeys
  const handleSelection = config.find(c => c.id === 'mod-handles')?.value as handleOptionKeys
  const legSelection = config.find(c => c.id === 'mod-handles')?.value as legOptionKeys

  return (fillSelection && handleSelection && legSelection)
    ? cabinetSmallOne({ fill: fillSelection, handleOption: handleSelection, legOption: legSelection })
    : cabinetSmallOne({ fill: colorKeys.defaultGrey, handleOption: handleOptionKeys.handleLong, legOption: legOptionKeys.legSturdy })
}

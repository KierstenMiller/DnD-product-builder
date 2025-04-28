import { type colorCodes, handleOptionKeys, legOptionKeys } from './cabinet-shared'

const handleOptions = {
  [handleOptionKeys.handleTop]: (fill: colorCodes) => <g id={handleOptionKeys.handleTop}>
    <rect style={{ fill }} x="256.64" y="235.67" width="2.62" height="19.51" transform="translate(515.9 490.84) rotate(180)" />
    <rect style={{ fill }} x="261.01" y="235.67" width="2.62" height="19.51" />
    <rect style={{ fill }} x="506.56" y="227.22" width="2.62" height="19.51" transform="translate(744.84 -270.89) rotate(90)" />
    <rect style={{ fill }} x="506.56" y="303.87" width="2.62" height="19.51" transform="translate(821.49 -194.25) rotate(90)" />
    <rect style={{ fill }} x="506.56" y="380.52" width="2.62" height="19.51" transform="translate(898.14 -117.6) rotate(90)" />
    <rect style={{ fill }} x="410.55" y="227.22" width="2.62" height="19.51" transform="translate(648.83 -174.88) rotate(90)" />
    <rect style={{ fill }} x="410.55" y="303.87" width="2.62" height="19.51" transform="translate(725.48 -98.23) rotate(90)" />
    <rect style={{ fill }} x="410.55" y="380.52" width="2.62" height="19.51" transform="translate(802.13 -21.58) rotate(90)" />
  </g>,
  [handleOptionKeys.handleRound]: (fill: colorCodes) => <g id={handleOptionKeys.handleRound}>
    <circle style={{ fill }} cx="411.86" cy="243.62" r="2.95" />
    <circle style={{ fill }} cx="411.86" cy="320.26" r="2.95" />
    <circle style={{ fill }} cx="411.86" cy="396.92" r="2.95" />
    <circle style={{ fill }} cx="270.92" cy="316.99" r="2.95" />
    <circle style={{ fill }} cx="249.42" cy="316.99" r="2.95" />
    <circle style={{ fill }} cx="507.87" cy="243.62" r="2.95" />
    <circle style={{ fill }} cx="507.87" cy="320.26" r="2.95" />
    <circle style={{ fill }} cx="507.87" cy="396.92" r="2.95" />
  </g>,
  [handleOptionKeys.handleShort]: (fill: colorCodes) => <g id={handleOptionKeys.handleShort}>
    <path style={{ fill }} d="M251.37,358.31c.07.2.1.41.1.62,0,1.14-.92,2.06-2.05,2.06s-2.05-.92-2.05-2.06c0-.21.03-.42.09-.62,1.25-5.05,1.4-12.2,0-17.06-.06-.2-.09-.41-.09-.62,0-1.14.92-2.06,2.05-2.06s2.05.92,2.05,2.06c0,.21-.03.42-.1.62-.01.02-.01.04-.02.06-1.36,4.84-1.23,11.92.01,16.95,0,.02.01.03.01.05Z" />
    <path style={{ fill }} d="M272.87,358.31c.07.2.1.41.1.62,0,1.14-.92,2.06-2.05,2.06s-2.05-.92-2.05-2.06c0-.21.03-.42.09-.62,1.25-5.05,1.4-12.2,0-17.06-.06-.2-.09-.41-.09-.62,0-1.14.92-2.06,2.05-2.06s2.05.92,2.05,2.06c0,.21-.03.42-.1.62-.01.02-.01.04-.02.06-1.36,4.84-1.23,11.92.01,16.95,0,.02.01.03.01.05Z" />
    <path style={{ fill }} d="M451.33,245.57c-.2.07-.41.1-.62.1-1.14,0-2.06-.92-2.06-2.05s.92-2.05,2.06-2.05c.21,0,.42.03.62.09,5.05,1.25,12.2,1.4,17.06,0,.2-.06.41-.09.62-.09,1.14,0,2.06.92,2.06,2.05s-.92,2.05-2.06,2.05c-.21,0-.42-.03-.62-.1-.02-.01-.04-.01-.06-.02-4.84-1.36-11.92-1.23-16.95.01-.02,0-.03.01-.05.01Z" />
    <path style={{ fill }} d="M451.33,322.21c-.2.07-.41.1-.62.1-1.14,0-2.06-.92-2.06-2.05s.92-2.05,2.06-2.05c.21,0,.42.03.62.09,5.05,1.25,12.2,1.4,17.06,0,.2-.06.41-.09.62-.09,1.14,0,2.06.92,2.06,2.05s-.92,2.05-2.06,2.05c-.21,0-.42-.03-.62-.1-.02-.01-.04-.01-.06-.02-4.84-1.36-11.92-1.23-16.95.01-.02,0-.03.01-.05.01Z" />
    <path style={{ fill }} d="M451.33,398.87c-.2.07-.41.1-.62.1-1.14,0-2.06-.92-2.06-2.05s.92-2.05,2.06-2.05c.21,0,.42.03.62.09,5.05,1.25,12.2,1.4,17.06,0,.2-.06.41-.09.62-.09,1.14,0,2.06.92,2.06,2.05s-.92,2.05-2.06,2.05c-.21,0-.42-.03-.62-.1-.02-.01-.04-.01-.06-.02-4.84-1.36-11.92-1.23-16.95.01-.02,0-.03.01-.05.01Z" />
  </g>,
  [handleOptionKeys.handleLong]: (fill: colorCodes) => <g id={handleOptionKeys.handleLong}>
    <polygon style={{ fill }} points="272.52 318.7 272.52 380.88 273.7 380.88 273.7 385.54 268.12 385.54 268.12 380.88 269.33 380.88 269.33 318.7 268.12 318.7 268.12 314.04 273.7 314.04 273.7 318.7 272.52 318.7" />
    <polygon style={{ fill }} points="251.03 318.7 251.03 380.88 252.21 380.88 252.21 385.54 246.63 385.54 246.63 380.88 247.84 380.88 247.84 318.7 246.63 318.7 246.63 314.04 252.21 314.04 252.21 318.7 251.03 318.7" />
    <polygon style={{ fill }} points="483.45 245.23 436.27 245.23 436.27 246.41 431.61 246.41 431.61 240.83 436.27 240.83 436.27 242.04 483.45 242.04 483.45 240.83 488.11 240.83 488.11 246.41 483.45 246.41 483.45 245.23" />
    <polygon style={{ fill }} points="483.45 321.87 436.27 321.87 436.27 323.05 431.61 323.05 431.61 317.48 436.27 317.48 436.27 318.68 483.45 318.68 483.45 317.48 488.11 317.48 488.11 323.05 483.45 323.05 483.45 321.87" />
    <polygon style={{ fill }} points="483.45 398.53 436.27 398.53 436.27 399.71 431.61 399.71 431.61 394.13 436.27 394.13 436.27 395.34 483.45 395.34 483.45 394.13 488.11 394.13 488.11 399.71 483.45 399.71 483.45 398.53" />
  </g>
}
const legOptionShapes = {
  [legOptionKeys.legSturdy]: (fill: colorCodes) => <g id={legOptionKeys.legSturdy}>
    <polygon style={{ fill }} points="565.22 473.28 564.55 499.18 552.24 499.18 551.96 488.28 168.2 488.28 167.92 499.18 155.61 499.18 154.94 473.28 166.13 473.28 166.13 473.27 554.03 473.27 554.03 473.28 565.22 473.28" />
  </g>,
  [legOptionKeys.legSticks]: (fill: colorCodes) => <g id={legOptionKeys.legSticks}>
    <g>
      <path style={{ fill }} d="M560.33,499.4c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
      <path style={{ fill }} d="M361.99,499.4c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
      <path style={{ fill }} d="M163.65,499.4c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
    </g>
    <path style={{ fill }} d="M154.78,473.28h410.41v1.7c0,.24-.19.43-.43.43H155.21c-.24,0-.43-.19-.43-.43v-1.7h0Z" />
  </g>,
  [legOptionKeys.legBar]: (fill: colorCodes) => <g id={legOptionKeys.legBar}>
    <polygon style={{ fill }} points="560.24 473.27 560.24 498.59 554.37 498.59 554.37 497.41 165.79 497.41 165.79 498.59 159.92 498.59 159.92 473.27 165.92 473.27 165.92 491.41 554.24 491.41 554.24 473.27 560.24 473.27" />
  </g>
}

export const CabinetFour = ({ frameFill, doorFill, handleSelection, legSelection }: { frameFill: colorCodes, doorFill: colorCodes, handleSelection: handleOptionKeys, legSelection: legOptionKeys }) => {
  const handle = handleOptions[handleSelection] || handleOptions[handleOptionKeys.handleLong]
  const leg = legOptionShapes[legSelection] || legOptionShapes[legOptionKeys.legSturdy]
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
    <g>
      <polygon style={{ fill: frameFill }} points="574.03 226.3 145.97 226.3 146.01 220.6 573.99 220.6 574.03 226.3" />
      <path style={{ fill: frameFill }} d="M568.52,473.28H151.48v-246.98h417.05v246.98ZM159.48,465.28h401.05v-230.98H159.48v230.98Z" />
    </g>
    <g>
      <rect style={{ fill: doorFill }} x="261.01" y="235.67" width="98.19" height="228.23" />
      <rect style={{ fill: doorFill }} x="161.08" y="235.67" width="98.19" height="228.23" />
      <rect style={{ fill: doorFill }} x="422.4" y="250.72" width="74.93" height="198.12" transform="translate(809.64 -110.09) rotate(90)" />
      <rect style={{ fill: doorFill }} x="422.4" y="327.37" width="74.93" height="198.12" transform="translate(886.29 -33.44) rotate(90)" />
      <rect style={{ fill: doorFill }} x="422.4" y="174.07" width="74.93" height="198.12" transform="translate(732.99 -186.73) rotate(90)" />
    </g>
    {handle(frameFill)}
    {leg(frameFill)}
  </svg>
}

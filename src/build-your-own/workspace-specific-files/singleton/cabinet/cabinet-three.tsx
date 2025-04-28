import { type colorCodes, handleOptionKeys, legOptionKeys } from './cabinet-shared'

const handleOptions = {
  [handleOptionKeys.handleTop]: (fill: colorCodes) => <g id={handleOptionKeys.handleTop}>
    <rect style={{ fill }} x="456.36" y="235.67" width="2.62" height="19.51" transform="translate(915.35 490.84) rotate(180)" />
    <rect style={{ fill }} x="460.74" y="235.67" width="2.62" height="19.51" />
    <rect style={{ fill }} x="256.64" y="235.67" width="2.62" height="19.51" transform="translate(515.9 490.84) rotate(180)" />
    <rect style={{ fill }} x="261.01" y="235.67" width="2.62" height="19.51" />
  </g>,
  [handleOptionKeys.handleRound]: (fill: colorCodes) => <g id={handleOptionKeys.handleRound}>
    <circle style={{ fill }} cx="470.65" cy="316.99" r="2.95" />
    <circle style={{ fill }} cx="449.14" cy="316.99" r="2.95" />
    <circle style={{ fill }} cx="270.92" cy="316.99" r="2.95" />
    <circle style={{ fill }} cx="249.42" cy="316.99" r="2.95" />
  </g>,
  [handleOptionKeys.handleShort]: (fill: colorCodes) => <g id={handleOptionKeys.handleShort}>
    <path style={{ fill }} d="M451.09,358.31c.07.2.1.41.1.62,0,1.14-.92,2.06-2.05,2.06s-2.05-.92-2.05-2.06c0-.21.03-.42.09-.62,1.25-5.05,1.4-12.2,0-17.06-.06-.2-.09-.41-.09-.62,0-1.14.92-2.06,2.05-2.06s2.05.92,2.05,2.06c0,.21-.03.42-.1.62-.01.02-.01.04-.02.06-1.36,4.84-1.23,11.92.01,16.95,0,.02.01.03.01.05Z" />
    <path style={{ fill }} d="M472.6,358.31c.07.2.1.41.1.62,0,1.14-.92,2.06-2.05,2.06s-2.05-.92-2.05-2.06c0-.21.03-.42.09-.62,1.25-5.05,1.4-12.2,0-17.06-.06-.2-.09-.41-.09-.62,0-1.14.92-2.06,2.05-2.06s2.05.92,2.05,2.06c0,.21-.03.42-.1.62-.01.02-.01.04-.02.06-1.36,4.84-1.23,11.92.01,16.95,0,.02.01.03.01.05Z" />
    <path style={{ fill }} d="M251.37,358.31c.07.2.1.41.1.62,0,1.14-.92,2.06-2.05,2.06s-2.05-.92-2.05-2.06c0-.21.03-.42.09-.62,1.25-5.05,1.4-12.2,0-17.06-.06-.2-.09-.41-.09-.62,0-1.14.92-2.06,2.05-2.06s2.05.92,2.05,2.06c0,.21-.03.42-.1.62-.01.02-.01.04-.02.06-1.36,4.84-1.23,11.92.01,16.95,0,.02.01.03.01.05Z" />
    <path style={{ fill }} d="M272.87,358.31c.07.2.1.41.1.62,0,1.14-.92,2.06-2.05,2.06s-2.05-.92-2.05-2.06c0-.21.03-.42.09-.62,1.25-5.05,1.4-12.2,0-17.06-.06-.2-.09-.41-.09-.62,0-1.14.92-2.06,2.05-2.06s2.05.92,2.05,2.06c0,.21-.03.42-.1.62-.01.02-.01.04-.02.06-1.36,4.84-1.23,11.92.01,16.95,0,.02.01.03.01.05Z" />
  </g>,
  [handleOptionKeys.handleLong]: (fill: colorCodes) => <g id={handleOptionKeys.handleLong}>
    <polygon style={{ fill }} points="472.24 318.7 472.24 380.88 473.42 380.88 473.42 385.54 467.84 385.54 467.84 380.88 469.05 380.88 469.05 318.7 467.84 318.7 467.84 314.04 473.42 314.04 473.42 318.7 472.24 318.7" />
    <polygon style={{ fill }} points="450.75 318.7 450.75 380.88 451.93 380.88 451.93 385.54 446.35 385.54 446.35 380.88 447.56 380.88 447.56 318.7 446.35 318.7 446.35 314.04 451.93 314.04 451.93 318.7 450.75 318.7" />
    <polygon style={{ fill }} points="272.52 318.7 272.52 380.88 273.7 380.88 273.7 385.54 268.12 385.54 268.12 380.88 269.33 380.88 269.33 318.7 268.12 318.7 268.12 314.04 273.7 314.04 273.7 318.7 272.52 318.7" />
    <polygon style={{ fill }} points="251.03 318.7 251.03 380.88 252.21 380.88 252.21 385.54 246.63 385.54 246.63 380.88 247.84 380.88 247.84 318.7 246.63 318.7 246.63 314.04 252.21 314.04 252.21 318.7 251.03 318.7" />
  </g>
}
const legOptionShapes = {
  [legOptionKeys.legSturdy]: (fill: colorCodes) => <g id={legOptionKeys.legSturdy}>
    <polygon style={{ fill }} points="565.14 473.28 564.47 499.18 552.16 499.18 551.88 488.28 168.12 488.28 167.84 499.18 155.53 499.18 154.86 473.28 166.05 473.28 166.05 473.27 553.95 473.27 553.95 473.28 565.14 473.28" />
  </g>,
  [legOptionKeys.legSticks]: (fill: colorCodes) => <g id={legOptionKeys.legSticks}>
    <g>
      <path style={{ fill }} d="M560.25,499.4c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
      <path style={{ fill }} d="M361.91,499.4c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
      <path style={{ fill }} d="M163.57,499.4c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
    </g>
    <path style={{ fill }} d="M154.7,473.28h410.41v1.7c0,.24-.19.43-.43.43H155.12c-.24,0-.43-.19-.43-.43v-1.7h0Z" />
  </g>,
  [legOptionKeys.legBar]: (fill: colorCodes) => <g id={legOptionKeys.legBar}>
    <polygon style={{ fill }} points="560.16 473.27 560.16 498.59 554.29 498.59 554.29 497.41 165.71 497.41 165.71 498.59 159.84 498.59 159.84 473.27 165.84 473.27 165.84 491.41 554.16 491.41 554.16 473.27 560.16 473.27" />
  </g>
}

export const CabinetThree = ({ frameFill, doorFill, handleSelection, legSelection }: { frameFill: colorCodes, doorFill: colorCodes, handleSelection: handleOptionKeys, legSelection: legOptionKeys }) => {
  const handle = handleOptions[handleSelection] || handleOptions[handleOptionKeys.handleLong]
  const leg = legOptionShapes[legSelection] || legOptionShapes[legOptionKeys.legSturdy]
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
    <g>
      <g>
        <polygon style={{ fill: frameFill }} points="574.03 226.3 145.97 226.3 146.01 220.6 573.99 220.6 574.03 226.3" />
        <path style={{ fill: frameFill }} d="M568.52,473.28H151.48v-246.98h417.05v246.98ZM159.48,465.28h401.05v-230.98H159.48v230.98Z" />
      </g>
      <g>
        <g>
          <rect style={{ fill: doorFill }} x="460.74" y="235.67" width="98.19" height="228.23" />
          <rect style={{ fill: doorFill }} x="360.8" y="235.67" width="98.19" height="228.23" />
        </g>
        <g>
          <rect style={{ fill: doorFill }} x="261.01" y="235.67" width="98.19" height="228.23" />
          <rect style={{ fill: doorFill }} x="161.08" y="235.67" width="98.19" height="228.23" />
        </g>
      </g>
      {handle(frameFill)}
      {leg(frameFill)}
    </g>
  </svg>
}

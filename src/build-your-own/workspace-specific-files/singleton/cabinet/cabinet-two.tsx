import { type colorCodes, handleOptionKeys, legOptionKeys } from './cabinet-shared'

const handleOptions = {
  [handleOptionKeys.handleTop]: (fill: colorCodes) => <g id={handleOptionKeys.handleTop}>
    <rect style={{ fill }} x="406.7" y="227.21" width="2.62" height="19.51" transform="translate(644.98 -171.04) rotate(90)" />
    <rect style={{ fill }} x="406.7" y="303.86" width="2.62" height="19.51" transform="translate(721.62 -94.39) rotate(90)" />
    <rect style={{ fill }} x="406.7" y="380.51" width="2.62" height="19.51" transform="translate(798.27 -17.74) rotate(90)" />
    <rect style={{ fill }} x="310.68" y="227.21" width="2.62" height="19.51" transform="translate(548.96 -75.02) rotate(90)" />
    <rect style={{ fill }} x="310.68" y="303.86" width="2.62" height="19.51" transform="translate(625.61 1.62) rotate(90)" />
    <rect style={{ fill }} x="310.68" y="380.51" width="2.62" height="19.51" transform="translate(702.26 78.27) rotate(90)" />
  </g>,
  [handleOptionKeys.handleRound]: (fill: colorCodes) => <g id={handleOptionKeys.handleRound}>
    <g>
      <circle style={{ fill }} cx="408.01" cy="243.61" r="2.95" />
      <circle style={{ fill }} cx="408.01" cy="320.26" r="2.95" />
      <circle style={{ fill }} cx="408.01" cy="396.91" r="2.95" />
    </g>
    <g>
      <circle style={{ fill }} cx="311.99" cy="243.61" r="2.95" />
      <circle style={{ fill }} cx="311.99" cy="320.26" r="2.95" />
      <circle style={{ fill }} cx="311.99" cy="396.91" r="2.95" />
    </g>
  </g>,
  [handleOptionKeys.handleShort]: (fill: colorCodes) => <g id={handleOptionKeys.handleShort}>
    <path style={{ fill }} d="M351.47,245.56c-.2.07-.41.1-.62.1-1.14,0-2.06-.92-2.06-2.05s.92-2.05,2.06-2.05c.21,0,.42.03.62.09,5.05,1.25,12.2,1.4,17.06,0,.2-.06.41-.09.62-.09,1.14,0,2.06.92,2.06,2.05s-.92,2.05-2.06,2.05c-.21,0-.42-.03-.62-.1-.02-.01-.04-.01-.06-.02-4.84-1.36-11.92-1.23-16.95.01-.02,0-.03.01-.05.01Z" />
    <path style={{ fill }} d="M351.47,322.21c-.2.07-.41.1-.62.1-1.14,0-2.06-.92-2.06-2.05s.92-2.05,2.06-2.05c.21,0,.42.03.62.09,5.05,1.25,12.2,1.4,17.06,0,.2-.06.41-.09.62-.09,1.14,0,2.06.92,2.06,2.05s-.92,2.05-2.06,2.05c-.21,0-.42-.03-.62-.1-.02-.01-.04-.01-.06-.02-4.84-1.36-11.92-1.23-16.95.01-.02,0-.03.01-.05.01Z" />
    <path style={{ fill }} d="M351.47,398.86c-.2.07-.41.1-.62.1-1.14,0-2.06-.92-2.06-2.05s.92-2.05,2.06-2.05c.21,0,.42.03.62.09,5.05,1.25,12.2,1.4,17.06,0,.2-.06.41-.09.62-.09,1.14,0,2.06.92,2.06,2.05s-.92,2.05-2.06,2.05c-.21,0-.42-.03-.62-.1-.02-.01-.04-.01-.06-.02-4.84-1.36-11.92-1.23-16.95.01-.02,0-.03.01-.05.01Z" />
  </g>,
  [handleOptionKeys.handleLong]: (fill: colorCodes) => <g id={handleOptionKeys.handleLong}>
    <polygon style={{ fill }} points="383.59 245.22 336.41 245.22 336.41 246.4 331.75 246.4 331.75 240.82 336.41 240.82 336.41 242.03 383.59 242.03 383.59 240.82 388.25 240.82 388.25 246.4 383.59 246.4 383.59 245.22" />
    <polygon style={{ fill }} points="383.59 321.87 336.41 321.87 336.41 323.05 331.75 323.05 331.75 317.47 336.41 317.47 336.41 318.68 383.59 318.68 383.59 317.47 388.25 317.47 388.25 323.05 383.59 323.05 383.59 321.87" />
    <polygon style={{ fill }} points="383.59 398.52 336.41 398.52 336.41 399.7 331.75 399.7 331.75 394.12 336.41 394.12 336.41 395.33 383.59 395.33 383.59 394.12 388.25 394.12 388.25 399.7 383.59 399.7 383.59 398.52" />
  </g>
}
const legOptionShapes = {
  [legOptionKeys.legSturdy]: (fill: colorCodes) => <g id={legOptionKeys.legSturdy}>
    <polygon style={{ fill }} points="465.72 473.27 465.05 499.17 452.74 499.17 452.46 488.27 267.7 488.27 267.42 499.17 255.11 499.17 254.44 473.27 265.63 473.27 265.63 473.26 454.53 473.26 454.53 473.27 465.72 473.27" />
  </g>,
  [legOptionKeys.legSticks]: (fill: colorCodes) => <g id={legOptionKeys.legSticks}>
    <g>
      <path style={{ fill }} d="M460.83,499.39c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
      <path style={{ fill }} d="M263.15,499.39c.3,0,.54-.2.55-.45l.85-22.49h.28c.26,0,.47-.25.47-.55v-.5h-8.13v.5c0,.3.21.55.46.55h.29l.85,22.49c.01.25.26.45.55.45h3.82Z" />
    </g>
    <path style={{ fill }} d="M254.28,473.28h211.4v1.7c0,.24-.19.43-.43.43h-210.55c-.24,0-.43-.19-.43-.43v-1.7h0Z" />
  </g>,
  [legOptionKeys.legBar]: (fill: colorCodes) => <g id={legOptionKeys.legBar}>
    <polygon style={{ fill }} points="460.74 473.26 460.74 498.58 454.87 498.58 454.87 497.4 265.29 497.4 265.29 498.58 259.42 498.58 259.42 473.26 265.42 473.26 265.42 491.4 454.74 491.4 454.74 473.26 460.74 473.26" />
  </g>
}

export const CabinetTwo = ({ frameFill, doorFill, handleSelection, legSelection }: { frameFill: colorCodes, doorFill: colorCodes, handleSelection: handleOptionKeys, legSelection: legOptionKeys }) => {
  const handle = handleOptions[handleSelection] || handleOptions[handleOptionKeys.handleLong]
  const leg = legOptionShapes[legSelection] || legOptionShapes[legOptionKeys.legSturdy]
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
    <g>
      <g>
        <polygon style={{ fill: frameFill }} points="473.53 226.3 246.47 226.3 246.51 220.61 473.49 220.61 473.53 226.3" />
        <path style={{ fill: frameFill }} d="M468.66,473.28h-217.32v-246.98h217.32v246.98ZM259.34,465.28h201.32v-230.98h-201.32v230.98Z" />
      </g>
      {leg(frameFill)}
      <g id="Drawers_Handles" data-name="Drawers + Handles">
        <g id="Cabinet_-_Drawers" data-name="Cabinet - Drawers">
          <rect style={{ fill: doorFill }} x="322.54" y="250.71" width="74.93" height="198.12" transform="translate(709.77 -10.23) rotate(90)" />
          <rect style={{ fill: doorFill }} x="322.54" y="327.36" width="74.93" height="198.12" transform="translate(786.42 66.42) rotate(90)" />
          <rect style={{ fill: doorFill }} x="322.54" y="174.06" width="74.93" height="198.12" transform="translate(633.12 -86.88) rotate(90)" />
        </g>
        {handle(frameFill)}
      </g>
    </g>
  </svg>
}

import { type configT } from '-/build-your-own/shared/typing/build-your-own.types'
import { cabinetOne } from './cabinet-one'
import { type colorKeys, colors, type handleOptionKeys, type legOptionKeys } from './cabinet-shared'

const getSelections = (config: configT) => {
  const shapeSelection = config.find(c => c.id === 'mod-size')?.value as string
  const fillSelection = config.find(c => c.id === 'mod-color')?.value as colorKeys
  const handleSelection = config.find(c => c.id === 'mod-handles')?.value as handleOptionKeys
  const legSelection = config.find(c => c.id === 'mod-legs')?.value as legOptionKeys
  return { shapeSelection, fillSelection, handleSelection, legSelection }
}

const getFills = (fillSelection: colorKeys) => {
  const currentColor = colors[fillSelection]
  const frameFill = currentColor?.[0]
  const doorFill = currentColor?.[1]
  return { frameFill, doorFill }
}

export const generateCabinet = (config: configT) => {
  const { fillSelection, handleSelection, legSelection } = getSelections(config)
  const { frameFill, doorFill } = getFills(fillSelection)
  return cabinetOne({ frameFill, doorFill, handleSelection, legSelection })
}

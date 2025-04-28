import { type configT } from '-/build-your-own/shared/typing/build-your-own.types'
import { CabinetFour } from './cabinet-four'
import { CabinetOne } from './cabinet-one'
import { cabinetSizeKeys, type colorKeys, colors, type handleOptionKeys, type legOptionKeys } from './cabinet-shared'
import { CabinetThree } from './cabinet-three'
import { CabinetTwo } from './cabinet-two'

const getSelections = (config: configT) => {
  const sizeSelection = config.find(c => c.id === 'mod-size')?.value as cabinetSizeKeys
  const fillSelection = config.find(c => c.id === 'mod-color')?.value as colorKeys
  const handleSelection = config.find(c => c.id === 'mod-handles')?.value as handleOptionKeys
  const legSelection = config.find(c => c.id === 'mod-legs')?.value as legOptionKeys
  return { sizeSelection, fillSelection, handleSelection, legSelection }
}

const getFills = (fillSelection: colorKeys) => {
  const currentColor = colors[fillSelection]
  const frameFill = currentColor?.[0]
  const doorFill = currentColor?.[1]
  return { frameFill, doorFill }
}

const getCabinet = (sizeSelection: cabinetSizeKeys) => {
  switch (sizeSelection) {
    case cabinetSizeKeys.one:
      return CabinetOne
    case cabinetSizeKeys.two:
      return CabinetTwo
    case cabinetSizeKeys.three:
      return CabinetThree
    case cabinetSizeKeys.four:
      return CabinetFour
  }
}

export const generateCabinet = (config: configT) => {
  const { sizeSelection, fillSelection, handleSelection, legSelection } = getSelections(config)
  const { frameFill, doorFill } = getFills(fillSelection)
  const cabinetSelection = getCabinet(sizeSelection)
  return cabinetSelection?.({ frameFill, doorFill, handleSelection, legSelection })
}

export const modId = 'height'
export const singleBlock = { modId, blockId: '1' }
export const doubleBlock = { modId, blockId: '2' }
export const quadBlock = { modId, blockId: '4' }
export const defaultWorkspace = [
  [{ ...singleBlock, index: 0, id: 'piece-1' }, { ...singleBlock, index: 1, id: 'piece-2' }, { ...singleBlock, index: 2, id: 'piece-3' }],
  [{ ...doubleBlock, index: 0, id: 'piece-4' }],
  [{ ...quadBlock, index: 0, id: 'piece-5' }],
  [{ ...singleBlock, index: 0, id: 'piece-6' }, { ...singleBlock, index: 1, id: 'piece-7' }, { ...singleBlock, index: 2, id: 'piece-8' }, { ...singleBlock, index: 3, id: 'piece-9' }]
]
export const defaultModifierState = [
  { mod: 'mod-fill', group: 'fill-color_fill-light-red', input: 'fill-light-red' },
  { mod: 'mod-stroke', group: 'stroke-color_stroke-red', input: 'stroke-red' }
]
export const newModifierState = [
  { mod: 'mod-fill', group: 'fill-color_fill-blue', input: 'fill-blue' },
  { mod: 'mod-stroke', group: 'stroke-color_stroke-blue', input: 'stroke-blue' }
]
export const newerModifierState = [
  { mod: 'mod-fill', group: 'fill-color_fill-green', input: 'fill-green' },
  { mod: 'mod-stroke', group: 'stroke-color_stroke-red', input: 'stroke-red' }
]

import { type inclusiveClickEventT } from './interaction-typing'

export const noop = () => { }
export const isNum = (n: any) => typeof n === 'number'
export const isKeyboardEvent = (e: inclusiveClickEventT): e is React.KeyboardEvent => {
  return (e as React.KeyboardEvent).getModifierState !== undefined
}

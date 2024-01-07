import classNames from 'classnames'
import { type inclusiveClickEventT } from './interaction-typing'

export const noop = () => { }
export const isNum = (n: any) => typeof n === 'number'
export const isKeyboardEvent = (e: inclusiveClickEventT): e is React.KeyboardEvent => {
  return (e as React.KeyboardEvent).getModifierState !== undefined
}
export const makeId = (idString: string) => idString.replace(/\s+/g, '-').toLowerCase()
export const getStyles = (styles1: any, styles2: any, id: string) => classNames(styles1[id], styles2[id])

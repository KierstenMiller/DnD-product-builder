import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { isKeyboardEvent } from '-/util/helpers'
import { type inclusiveClickEventT } from '-/util/interaction-typing'

import { ModalContent, type ModalSharedI } from './modalContent'

export type modalToggleCallbackT = (event: inclusiveClickEventT, isOpen: boolean) => void

export interface ModalI extends ModalSharedI {
  // optional
  closeCallback?: modalToggleCallbackT
  isGlobal?: boolean
}

export const Modal = ({
  body,
  header,
  testId,
  footer,
  isGlobal = true,
  closeCallback,
  stylesOverride = {}
}: ModalI) => {
  const css = 'body {overflow: hidden;}' // adding styling to prevent body from scrolling, allowing modal to scroll instead
  const [isOpen, setIsOpen] = useState(true)
  // if not provided a closeCallback, use local state to manage modal visibility
  const close = closeCallback ? (event: inclusiveClickEventT) => { closeCallback(event, false) } : () => { setIsOpen(false) }
  const ModalToRender = <ModalContent body={body} header={header} footer={footer} close={close} testId={testId} stylesOverride={stylesOverride} />
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => { isKeyboardEvent(event) && event.key === 'Escape' && close(event) }
    window.addEventListener('keydown', handleEsc)
    return () => { window.removeEventListener('keydown', handleEsc) }
  })
  // if modal isGlobal, use createPortal to render modal as a child of the body element
  // else render modal in place <Modal /> component was called
  if (!isOpen) return null
  return <>
        {isGlobal ? createPortal(ModalToRender, document.body) : { ModalToRender }}
        <style>{css}</style>
    </>
}

import FocusTrap from 'focus-trap-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { closeButtonContent, closeButtons } from '-/Components/modals/modals.util'
import { isKeyboardEvent } from '-/util/helpers'
import { type inclusiveClickEventT, type mouseClickT } from '-/util/interaction-typing'
import { type sassStylesI } from '-/util/typing-util'

import defaultStyles from '-/Components/modals/default-modals-styling.module.scss'

export type modalToggleCallbackT = (event: inclusiveClickEventT, isOpen: boolean) => void
interface ModalSharedI {
  header: {
    content: string
    closeType?: closeButtons
  }
  body: React.ReactNode
  // optional
  testId?: string // made optional to prevent DOM bloat
  footer?: {
    buttons?: ButtonI[]
  }
  stylesOverride?: sassStylesI
}
export interface ModalI extends ModalSharedI {
  // optional
  closeCallback?: modalToggleCallbackT
  isGlobal?: boolean
}
/// /////////////////
//      MODAL     //
/// ////////////////
// This modal component can render without a trigger. Useful for on-page loading modals.
// For modals that are triggered by a button, use the ModalTrigger component.
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
  const close = (event: inclusiveClickEventT) => {
    setIsOpen(false)
    closeCallback && closeCallback(event, false)
  }
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
        {isGlobal ? createPortal(ModalToRender, document.body) : ModalToRender}
        <style>{css}</style>
    </>
}

/// ////////////////////////////////////////
//      SUPORRTING COMPONENTS TYPING      //
/// ////////////////////////////////////////
interface ButtonI {
  text: string
  // optional
  onClick?: (event: mouseClickT) => void
  closeModalOnClick?: boolean
  className?: string
}
interface FooterButtonI extends ButtonI {
  close: (event: mouseClickT) => void
}
interface ModalStandardI extends ModalSharedI {
  close: (event: mouseClickT) => void
}
/// /////////////////////////////////
//      SUPORRTING COMPONENTS      //
/// /////////////////////////////////
const FooterButton = ({ text, closeModalOnClick = true, onClick, close, className }: FooterButtonI) => {
  const clickHandler = (event: mouseClickT) => {
    onClick && onClick(event)
    closeModalOnClick && close(event)
  }
  return <button className={className} onClick={clickHandler}>
    {text}
  </button>
}
const ModalContent = ({ body, header, footer, testId, close, stylesOverride }: ModalStandardI) => {
  const styles = { ...defaultStyles, ...stylesOverride }
  return <div data-testid={testId} className={styles.container}>
    <div data-testid="backdrop" className={styles.backdrop} />
    <FocusTrap>
      <div data-testid="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-label" className={styles.modal}>
        <div data-testid="header-container" className={styles.header}>
          <h2 id="dialog-label">{header.content}</h2>
          <button data-testid="close" className={styles.close} onClick={close}>{closeButtonContent[header.closeType ?? closeButtons.ex]}</button>
        </div>
        <div data-testid="body-container" className={styles.body}>
          {body}
        </div>
        {footer?.buttons && <div data-testid="footer-container" className={styles.footer}>
          {footer.buttons.map(b => <FooterButton key={b.text} {...b} close={close} />)}
        </div>}
      </div>
    </FocusTrap>
  </div>
}

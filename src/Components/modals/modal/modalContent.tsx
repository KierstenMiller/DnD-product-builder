import FocusTrap from 'focus-trap-react'

import { type mouseClickT } from '-/util/interaction-typing'
import { type sassStylesI } from '-/util/typing-util'

import { closeButtonContent, closeButtons } from '../modals.util'

import defaultStyles from '-/Components/modals/default-modals-styling.module.scss'

/// ///////////////////
//      TYPING      //
/// ///////////////////
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
export interface ModalSharedI {
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
interface ModalStandardI extends ModalSharedI {
  close: (event: mouseClickT) => void
}

/// ////////////////////////
//      COMPONENTs      //
/// ///////////////////////
const FooterButton = ({ text, closeModalOnClick = true, onClick, close, className }: FooterButtonI) => {
  const clickHandler = (event: mouseClickT) => {
    onClick && onClick(event)
    closeModalOnClick && close(event)
  }
  return <button className={className} onClick={clickHandler}>
        {text}
    </button>
}
export const ModalContent = ({ body, header, footer, testId, close, stylesOverride }: ModalStandardI) => {
  const styles = { ...defaultStyles, ...stylesOverride }
  return <div data-testid={testId} className={styles.container}>
        <div data-testid="backdrop" className={styles.backdrop} />
        <FocusTrap>
            <div data-testid="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-label" className={styles.modal}>
                <div data-testid="header-container" className={styles.header}>
                    <h2 id="dialog-label">{header.content}</h2>
                    <button data-testid="close" className={styles.close} onClick={close}>{closeButtonContent[header.closeType ?? closeButtons.ex]}</button>
                </div>
                <div className={styles.body}>
                    {body}
                </div>
                {footer?.buttons && <div className={styles.footer}>
                    {footer.buttons.map(b => <FooterButton key={b.text} {...b} close={close} />)}
                </div>}
            </div>
        </FocusTrap>
    </div>
}

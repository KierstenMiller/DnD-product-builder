import { useState } from 'react'

import { Modal, type ModalI, type modalToggleCallbackT } from '-/component-library/modals/modal/modal'
import { type inclusiveClickEventT, type mouseClickT } from '-/util-library/interaction-typing'
import { type sassStylesI } from '-/util-library/typing-util'

import defaultStyles from '-/component-library/modals/default-modals-styling.module.scss'

interface ModalTriggerI {
  triggerConfig: {
    text: string
    openCallback?: modalToggleCallbackT
  }
  modalConfig: Omit<ModalI, 'closeCallback'> & {
    closeCallback?: modalToggleCallbackT
  }
  // optional
  testId?: string // made optional to prevent DOM bloat
  isGlobal?: boolean
  stylesOverride?: sassStylesI
}

export const ModalTrigger = ({ triggerConfig, modalConfig, testId, isGlobal = true, stylesOverride = {} }: ModalTriggerI) => {
  const [isOpen, setIsOpen] = useState(false)
  const styles = { ...defaultStyles, ...stylesOverride }
  const toggle = (openModal: boolean, event: inclusiveClickEventT, callback?: modalToggleCallbackT) => {
    setIsOpen(openModal)
    callback && callback(event, openModal)
  }
  const closeOnClick: modalToggleCallbackT = (event) => { toggle(false, event, modalConfig.closeCallback) }
  const openOnClick = (event: mouseClickT) => { toggle(true, event, triggerConfig.openCallback) }
  return <>
    {isOpen && <Modal {...modalConfig} testId={testId} isGlobal={isGlobal} closeCallback={closeOnClick} stylesOverride={stylesOverride} />}
    <button
      className={styles.trigger}
      onClick={openOnClick}
      {...testId && { 'data-testid': `${testId}-trigger` }}
    >
      {triggerConfig.text}
    </button>
  </>
}

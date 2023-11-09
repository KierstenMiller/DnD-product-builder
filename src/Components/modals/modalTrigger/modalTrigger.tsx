import { useState } from 'react'

import { type inclusiveClickEventT, type mouseClickT } from '-/util/interaction-typing'
import { type sassStylesI } from '-/util/typing-util'
import { Modal, type ModalI, type modalToggleCallbackT } from '../modal/modal'

import defaultStyles from '-/Components/modals/default-modals-styling.module.scss'

interface ModalTriggerI {
  triggerConfig: {
    text: string
    openCallback?: modalToggleCallbackT
  }
  modalConfig: Omit<ModalI, 'closeCallback'> & {
    closeCallback?: modalToggleCallbackT
  }
  // optional
  isGlobal?: boolean
  stylesOverride?: sassStylesI
}

export const ModalTrigger = ({ triggerConfig, modalConfig, isGlobal = true, stylesOverride = {} }: ModalTriggerI) => {
  const [isOpen, setIsOpen] = useState(false)
  const styles = { ...defaultStyles, ...stylesOverride }
  const toggle = (openModal: boolean, event: inclusiveClickEventT, callback?: modalToggleCallbackT) => {
    setIsOpen(openModal)
    callback && callback(event, openModal)
  }
  const closeOnClick: modalToggleCallbackT = (event) => { toggle(false, event, modalConfig.closeCallback) }
  const openOnClick = (event: mouseClickT) => { toggle(true, event, triggerConfig.openCallback) }
  return <>
        {isOpen && <Modal {...modalConfig} closeCallback={closeOnClick} stylesOverride={stylesOverride} />}
        <button className={styles.trigger} onClick={openOnClick}>{triggerConfig.text}</button>
    </>
}

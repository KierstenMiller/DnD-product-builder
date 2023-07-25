import { useState } from "react";
import { createPortal } from "react-dom";
import defaultStyles from './modal.module.scss'
import { Modal, ModalI, modalToggleCallbackT } from "./modal";
import { inclusiveClickEventT, mouseClickT } from "-/util/interaction-typing";
import { sassStylesI } from "-/util/typing-util";

interface ModalTriggerI {
    triggerConfig: {
        text: string;
        openCallback?: modalToggleCallbackT;
    };
    modalConfig: Omit<ModalI, 'closeCallback'> & {
        closeCallback?: modalToggleCallbackT
    };
    // optional
    isGlobal?: boolean;
    stylesOverride?: sassStylesI;
}

export const ModalTrigger = ({ triggerConfig, modalConfig, isGlobal = true, stylesOverride = {} }: ModalTriggerI) => {
    const toggle = (openModal: boolean, event: inclusiveClickEventT, callback?: modalToggleCallbackT) => {
        setIsOpen(openModal);
        callback && callback(event, openModal);
    }
    const modalCloseClick: modalToggleCallbackT = (event) => toggle(false, event, modalConfig.closeCallback);
    const triggerClick = (event: mouseClickT) => toggle(true, event, triggerConfig.openCallback);
    const styles = { ...defaultStyles, ...stylesOverride }
    const [isOpen, setIsOpen] = useState(false);
    const css = `body {overflow: hidden;}`
    const modal = <>
        <style>{css}</style>
        <Modal {...modalConfig} closeCallback={modalCloseClick} stylesOverride={stylesOverride} />
    </>;
    return <>
        {isOpen && <>
            {isGlobal
                ? createPortal(modal, document.body)
                : modal
            }
        </>}
        <button className={styles.trigger} onClick={triggerClick}>{triggerConfig.text}</button>
    </>
}
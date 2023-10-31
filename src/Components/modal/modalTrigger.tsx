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
    // functions
    const toggle = (openModal: boolean, event: inclusiveClickEventT, callback?: modalToggleCallbackT) => {
        setIsOpen(openModal);
        callback && callback(event, openModal);
    }
    const closeOnClick: modalToggleCallbackT = (event) => toggle(false, event, modalConfig.closeCallback);
    const openOnClick = (event: mouseClickT) => toggle(true, event, triggerConfig.openCallback);
    // state/ variables
    const [isOpen, setIsOpen] = useState(false);
    const styles = { ...defaultStyles, ...stylesOverride }
    const css = `body {overflow: hidden;}`; // adding styling to prevent body from scrolling, allowing modal to scroll instead
    const modal = <>
        <style>{css}</style>
        <Modal {...modalConfig} closeCallback={closeOnClick} stylesOverride={stylesOverride} />
    </>;
    // if modal isGlobal, use createPortal to render modal as a child of the body element
    // else render modal as sibling to ModalTrigger
    return <>
        {isOpen && <>
            {isGlobal
                ? createPortal(modal, document.body)
                : modal
            }
        </>}
        <button className={styles.trigger} onClick={openOnClick}>{triggerConfig.text}</button>
    </>
}
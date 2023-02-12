import { useState } from "react";
import defaultStyles from './modal.module.scss'
import { Modal, ModalI, modalToggleCallbackT } from "./modal";
import { mouseButtonClickT } from "-/util/interactionTyping";

interface ModalTriggerI {
    triggerConfig: {
        text: string;
        openCallback?: modalToggleCallbackT;
    };
    modalConfig: Omit<ModalI, 'closeCallback'> & {
        closeCallback? : modalToggleCallbackT // making optional
    };
    // optional
    stylesOverride?: any; // TODO better typing
}

export const ModalTrigger = ({ triggerConfig, modalConfig, stylesOverride={} }: ModalTriggerI) => {
    const styles = {...defaultStyles, ...stylesOverride}
    const [isOpen, setIsOpen] = useState(false);
    const toggle = (openModal: boolean, event: React.MouseEvent<HTMLButtonElement, MouseEvent>, callback?: modalToggleCallbackT) => {
        setIsOpen(openModal);
        callback && callback(event, openModal);
    }
    const modalCloseClick = (event: mouseButtonClickT) => toggle(false, event, modalConfig.closeCallback);
    const triggerClick = (event: mouseButtonClickT) => toggle(true, event, triggerConfig.openCallback);
    return <>
        {isOpen && <Modal {...modalConfig} closeCallback={modalCloseClick} stylesOverride={stylesOverride}/>}
        <button className={styles.trigger} onClick={triggerClick}>{triggerConfig.text}</button>
    </>
}
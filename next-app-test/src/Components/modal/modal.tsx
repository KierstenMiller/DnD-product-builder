import { closeButtonContent, closeButtons } from "./modal.util";
import { keyboardDivEventT, mouseButtonClickT } from "-/util/interactionTyping";
import defaultStyles from './modal.module.scss'
import FocusTrap from "focus-trap-react";
import { useEffect } from "react";

//////////////////////
//      TYPING      //
//////////////////////
export type modalToggleCallbackT = (event: mouseButtonClickT, isOpen: boolean) => void
export interface ModalI {
    header: {
        content: string;
        closeType?: closeButtons;
    };
    body: React.ReactNode;
    closeCallback: modalToggleCallbackT;
    // optional
    footer?: {
        content: React.ReactNode;
        closeType?: closeButtons;
    };
    stylesOverride?: any; // TODO: better typing
}

///////////////////////////
//      COMPONENT      //
//////////////////////////
export const Modal = ({
    body,
    header,
    footer,
    closeCallback,
    stylesOverride = {},
}: ModalI) => {
    const styles = { ...defaultStyles, ...stylesOverride };
    const close = (event: mouseButtonClickT) => closeCallback(event, false);
    useEffect(() => {
        const handleEsc = (event: any) => event.key === "Escape" && close(event); // TODO: better typing
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
      }, []);
    return <div className={styles.container}>
        <div className={styles.backdrop} />
        <FocusTrap>
            <div role="dialog" aria-modal="true" aria-labelledby="dialog-label" className={styles.modal}>
                <div className={styles.header}>
                    <h2 id="dialog-label">{header.content}</h2>
                    <button className={styles.close} onClick={close}>{header.closeType ? closeButtonContent[header.closeType] : closeButtonContent.ex}</button>
                </div>
                <div className={styles.body}>
                    {body}
                </div>
                {footer && <div className={styles.footer}>
                    {footer.closeType && <button onClick={close}>{closeButtonContent[footer.closeType]}</button>}
                    {footer.content}
                </div>}
            </div>
        </FocusTrap>
    </div>
}
import { closeButtonContent, closeButtons } from "./modal.util";
import { inclusiveClickEventT, mouseClickT, keyboardEventT } from "-/util/interaction-typing";
import defaultStyles from './modal.module.scss'
import FocusTrap from "focus-trap-react";
import { useEffect } from "react";
import { sassStylesI } from "-/util/typing-util";
import { isKeyboardEvent } from "-/util/helpers";

//////////////////////
//      TYPING      //
//////////////////////
export type modalToggleCallbackT = (event: inclusiveClickEventT, isOpen: boolean) => void
interface ButtonI {
    text: string;
    // optional
    onClick?: (event: mouseClickT) => void;
    closeModalOnClick?: boolean;
    className?: string;
}
interface FooterButtonI extends ButtonI {
    close: (event: mouseClickT) => void;
}
export interface ModalI {
    header: {
        content: string;
        closeType?: closeButtons;
    };
    body: React.ReactNode;
    closeCallback: modalToggleCallbackT;
    // optional
    footer?: {
        buttons?: ButtonI[];
    };
    stylesOverride?: sassStylesI;
}

///////////////////////////
//      COMPONENTs      //
//////////////////////////
const FooterButton = ({ text, closeModalOnClick = true, onClick, close, className }: FooterButtonI) => {
    const clickHandler = (event: mouseClickT) => {
        onClick && onClick(event);
        closeModalOnClick && close(event);
    }
    return <button className={className} onClick={clickHandler}>
        {text}
    </button>
}
export const Modal = ({
    body,
    header,
    footer,
    closeCallback,
    stylesOverride = {},
}: ModalI) => {
    const styles = { ...defaultStyles, ...stylesOverride };
    const close = (event: inclusiveClickEventT) => closeCallback(event, false);
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => isKeyboardEvent(event) && event.key === "Escape" && close(event);
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    });
    return <div className={styles.container}>
        <div className={styles.backdrop} />
        <FocusTrap>
            <div role="dialog" aria-modal="true" aria-labelledby="dialog-label" className={styles.modal}>
                <div className={styles.header}>
                    <h2 id="dialog-label">{header.content}</h2>
                    <button className={styles.close} onClick={close}>{closeButtonContent[header.closeType || closeButtons.ex]}</button>
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
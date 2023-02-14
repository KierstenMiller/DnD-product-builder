import { closeButtonContent, closeButtons } from "./modal.util";
import { mouseButtonClickT } from "-/util/interactionTyping";
import defaultStyles from './modal.module.scss'
import FocusTrap from "focus-trap-react";
import { useEffect } from "react";

//////////////////////
//      TYPING      //
//////////////////////
export type modalToggleCallbackT = (event: mouseButtonClickT, isOpen: boolean) => void
interface ButtonI {
    text: string;
    // optional
    onClick?: (event: mouseButtonClickT) => void;
    closeModalOnClick?: boolean;
    className?: string;
}
interface FooterButtonI extends ButtonI {
    close: (event: mouseButtonClickT) => void;
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
    stylesOverride?: any; // TODO: better typing
}

///////////////////////////
//      COMPONENTs      //
//////////////////////////
const FooterButton = ({ text, closeModalOnClick = true, onClick, close, className }: FooterButtonI) => {
    const clickHandler = (event: mouseButtonClickT) => {
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
                    <button className={styles.close} onClick={close}>{closeButtonContent[header.closeType || closeButtons.ex]}</button>
                </div>
                <div className={styles.body}>
                    {body}
                </div>
                {footer?.buttons && <div className={styles.footer}>
                    {footer.buttons.map(b => <FooterButton {...b} close={close} />)}
                </div>}
            </div>
        </FocusTrap>
    </div>
}
import { closeButtonContent, closeButtons } from "./modal.util";
import { mouseButtonClickT } from "-/util/interactionTyping";
import defaultStyles from './modal.module.scss'

//////////////////////
//      TYPING      //
//////////////////////
export type modalToggleCallbackT = (event: mouseButtonClickT, isOpen: boolean) => void
export interface ModalI {
    header: {
        content: React.ReactNode;
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
    const styles = {...defaultStyles, ...stylesOverride};
    const close = (event: mouseButtonClickT) => closeCallback(event, false);
    return <div className={styles.modal}>
        <div className={styles.header}>
            {typeof header.content === 'string' ? <h2>{header.content}</h2> : header.content}
            <button onClick={close}>{header.closeType ? closeButtonContent[header.closeType] : closeButtonContent.ex}</button>
        </div>
        <div className={styles.body}>
            {body}
        </div>
        {footer && <div className={styles.footer}>
            {footer.closeType && <button onClick={close}>{closeButtonContent[footer.closeType]}</button>}
            {footer.content}
        </div>}
    </div>
}
import classNames from "classnames";

import defaultStyles from './categorized-radio-input-group-styles.module.scss'

export interface onChangeI {
    event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>,
    newSelection: string
}
interface propsI {
    id: string,
    name: string,
    label: string,
    onChange: ({ event, newSelection }: onChangeI) => any;
    // optional
    ariaLabelledBy?: string,
    selected?: boolean,
    hideInput?: boolean,
    styles?: any, // TODO: typescript
    mirage?: (props: any) => React.ReactNode, // TODO: look up how to not make this any
}

export const TextInput = ({ id, name, label, onChange, ariaLabelledBy, selected, hideInput, styles = {}, mirage }: propsI) => {
    return <div className={styles.container}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <input className={styles.input} id={id} type="text"/>
        <div>{}</div>
    </div>;
}
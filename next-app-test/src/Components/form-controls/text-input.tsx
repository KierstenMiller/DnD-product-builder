import { useState } from "react";

import defaultStyles from './categorized-radio-input-group-styles.module.scss'

export interface onChangeI {
    event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>,
    newValue: string
}
interface propsI {
    id: string,
    label: string,
    onChange: ({ event, newValue }: onChangeI) => any;
    // optional
    defaultValue?: string,
    ariaDescribedBy?: string,
    helpText?: string
    stylesOverride?: any, // TODO: typescript
}

export const TextInput = ({ id, label, onChange, defaultValue, ariaDescribedBy, helpText, stylesOverride = {} }: propsI) => {
    const [value, setValue] = useState(defaultValue || '');
    const styles = {...defaultStyles, ...stylesOverride};
    return <div className={styles.container}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <input
            className={styles.input}
            id={id}
            name={id} // name is not needed, but leaving it here just in case someday this is used in a form that is submitted to a server
            type="text"
            value={value}
            onChange={event => {
                setValue(event.target.value)
                onChange({event, newValue: event.target.value})
            }}
            {...ariaDescribedBy && helpText && {ariaDescribedBy: ariaDescribedBy}}
        />
        {ariaDescribedBy && helpText && <div id={ariaDescribedBy}>{helpText}</div>}
    </div>;
}
import { useState } from "react";

import defaultStyles from './categorized-radio-input-group-styles.module.scss'
import { sassStylesI } from "-/util/typing-util";

export interface onChangeI {
    event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>,
    newValue: string
}
interface propsI {
    id: string,
    label: string,
    onChange: ({ event, newValue }: onChangeI) => any;
    // optional
    testId?: string // made optional to prevent DOM bloat
    defaultValue?: string,
    ariaDescribedById?: string, // TODO: make this a union type with helpText
    helpText?: string // TODO: make this a union type with ariaDescribedById
    stylesOverride?: sassStylesI,
}

export const TextInput = ({ id, label, onChange, testId, defaultValue, ariaDescribedById, helpText, stylesOverride = {} }: propsI) => {
    const [value, setValue] = useState(defaultValue || '');
    // TODO: make styles combining function that is backed by unit test that confirms output of modularized styles
    const styles = { ...defaultStyles, ...stylesOverride };
    return <div data-testid={testId || id} className={styles.container}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <input
            className={styles.input}
            id={id}
            name={id} // name is not needed, but leaving it here just in case someday this is used in a form that is submitted to a server
            type="text"
            value={value}
            onChange={event => {
                setValue(event.target.value)
                onChange({ event, newValue: event.target.value })
            }}
            {...ariaDescribedById && helpText && { 'aria-describedby': ariaDescribedById }}
        />
        {ariaDescribedById && helpText && <div id={ariaDescribedById}>{helpText}</div>}
    </div>;
}
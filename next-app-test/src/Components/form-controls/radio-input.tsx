import classNames from "classnames";
import { useState } from "react";

import defaultStyles from './categorized-radio-input-group-styles.module.scss'

interface propsI {
    id: string,
    name: string,
    label: string,
    onChange: ({ event, newSelection }: { event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>, newSelection: string }) => any;
    // optional
    ariaLabelledBy?: string,
    selected?: boolean,
    hideInput?: boolean,
    styles?: any, // TODO: typescript
    mirage?: (props: any) => React.ReactNode, // TODO: look up how to not make this any
}

export const CategorizedRadioInputGroup = ({ id, name, label, onChange, ariaLabelledBy, selected, hideInput, styles = {}, mirage }: propsI) => {
    return <div
        key={id}
        className={classNames(
            defaultStyles.focus,
            styles.inputContainer,
            { [defaultStyles.selected || styles.selected]: selected }
        )}
    >
        <input
            id={id}
            className={classNames(styles.input, { 'visually-hidden': hideInput || mirage })}
            type="radio"
            value={label}
            name={name}
            onChange={event => { onChange(event)}}
            checked={selected}
            aria-labelledby={`${`${name}_${id}`} ${ariaLabelledBy}`}
        />
        <label id={`${name}_${id}`} className={classNames({ 'visually-hidden': mirage })}>{opt.label}</label>
         {/* NOTE: In forms mode (which we are forced into in a fieldset) any text in the mirage wouldn't be read - Including aria-hidden just in case */}
         {mirage && <div aria-hidden={true} className={styles.label}>
            {mirage({id, label, selected})}
        </div>}
    </div>
}
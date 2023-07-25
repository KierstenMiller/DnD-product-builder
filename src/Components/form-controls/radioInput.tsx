import classNames from "classnames";

import defaultStyles from './categorized-radio-input-group-styles.module.scss'
import { sassStylesI } from "-/util/typing-util";

export interface onChangeI {
    newSelection: string
    event?: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>,
}
export interface mirageI {
    id: string,
    label: string,
    image: string,
    onClick?: ({ event, newSelection }: onChangeI) => void,
}
export type mirageT = (props: mirageI) => JSX.Element
interface propsI {
    id: string,
    label: string,
    name: string,
    onChange: ({ event, newSelection }: onChangeI) => any;
    // optional
    ariaLabelledBy?: string,
    selected?: boolean,
    hideInput?: boolean,
    stylesOverride?: sassStylesI,
    image?: string,
    mirage?: () => JSX.Element,
}

export const RadioInput = ({ id, name, label, onChange, ariaLabelledBy, selected, hideInput, stylesOverride: stylesOverride = {}, mirage, image }: propsI) => {
    const styles = { ...defaultStyles, ...stylesOverride };
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
            onChange={event => { onChange({ event, newSelection: id }) }}
            checked={selected}
            {...ariaLabelledBy && { 'aria-labelledby': `${name}_${id} ${ariaLabelledBy}` }}
        />
        <label
            className={classNames({ 'visually-hidden': mirage })}
            {...(ariaLabelledBy ? { id: `${name}_${id}` } : { htmlFor: id })}
        >{label}</label>
        {/* NOTE: In forms mode (which we are forced into in a fieldset) any text in the mirage wouldn't be read - Including aria-hidden just in case */}
        {mirage && <div aria-hidden={true} className={styles.label} onClick={event => { onChange({ event, newSelection: id }) }}>
            {mirage()}
        </div>}
    </div>
}
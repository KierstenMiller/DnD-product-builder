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
    onChange: ({event, newSelection}: onChangeI) => any;
    // optional
    ariaLabelledBy?: string,
    selected?: boolean,
    hideInput?: boolean,
    stylesOverride?: any, // TODO: typescript
    mirage?: (props: any) => React.ReactNode, // TODO: look up how to not make this any
}

export const RadioInput = ({ id, name, label, onChange, ariaLabelledBy, selected, hideInput, stylesOverride: stylesOverride = {}, mirage }: propsI) => {
    const styles = {...defaultStyles, ...stylesOverride};
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
            onChange={event => {onChange({event, newSelection: id})}}
            checked={selected}
            {...ariaLabelledBy && {'aria-labelledby':`${name}_${id} ${ariaLabelledBy}`}}
        />
        <label
            className={classNames({ 'visually-hidden': mirage })}
            {...(ariaLabelledBy ? {id:`${name}_${id}`} : {htmlFor: id})} 
        >{label}</label>
         {/* NOTE: In forms mode (which we are forced into in a fieldset) any text in the mirage wouldn't be read - Including aria-hidden just in case */}
         {mirage && <div aria-hidden={true} className={styles.label} onClick={event => {onChange({event, newSelection: id})}}>
            {mirage({id, label, selected})}
        </div>}
    </div>
}
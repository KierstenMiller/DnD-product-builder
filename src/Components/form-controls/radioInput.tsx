import classNames from "classnames";

import defaultStyles from './categorized-radio-input-group-styles.module.scss'
import { sassStylesI } from "-/util/typing-util";

export interface onChangeI {
    newSelection: string
    event?: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>,
}
export interface mirageCallbackPropsI {
    id: string,
    label: string,
    image: string,
    onClick?: ({ event, newSelection }: onChangeI) => void,
}
export type mirageCallbackT = (props: mirageCallbackPropsI) => JSX.Element
interface propsI {
    id: string,
    label: string,
    name: string,
    onChange: ({ event, newSelection }: onChangeI) => any;
    // optional
    testId?: string, // made optional to prevent DOM bloat
    ariaLabelledBy?: string,
    selected?: boolean,
    hideInput?: boolean,
    stylesOverride?: sassStylesI,
    mirage?: () => JSX.Element,
}

export const RadioInput = ({ id, testId, name, label, onChange, ariaLabelledBy, selected, hideInput, stylesOverride: stylesOverride = {}, mirage }: propsI) => {
    const styles = { ...defaultStyles, ...stylesOverride };
    return <div
        key={id}
        data-testId={testId}
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
            defaultChecked={selected} // In the html spec. a input element doesn't have a 'defaultValue' attribute. However, React uses it to make the input a controlled component. See: https://react.dev/reference/react-dom/components/input
            {...ariaLabelledBy && { 'aria-labelledby': `${name}_${id} ${ariaLabelledBy}` }}
        />
        <label
            className={classNames({ 'visually-hidden': mirage })}
            {...(ariaLabelledBy ? { id: `${name}_${id}` } : { htmlFor: id })}
        >{label}</label>
        {/* NOTE: In forms mode (which we are forced into in a fieldset) any text in the mirage wouldn't be read - Including aria-hidden just in case */}
        {mirage && <div data-testId="mirage-container" aria-hidden={true} className={styles.label} onClick={event => { onChange({ event, newSelection: id }) }}>
            {mirage()}
        </div>}
    </div>
}
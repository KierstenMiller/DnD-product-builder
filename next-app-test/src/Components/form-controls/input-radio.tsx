import { useState } from "react";
interface propsOptionI {
    id: string,
    label: string,
    // optional
    selected?: boolean,
}
interface propsI {
    heading: string,
    onChange: ({event, newSelection}: {event: React.ChangeEvent<HTMLInputElement>, newSelection: string}) => any;
    options: propsOptionI[],
    // optional
    styles?: any, // TODO: look up styles typing
    mirage?: (option: propsOptionI) => React.ReactNode,
}

export const InputRadio = ({heading, options, onChange, styles = {}, mirage}: propsI) => {
    const [selected, setSelected] = useState(options.find(opt => opt.selected)?.id);
    return <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{heading}</legend>
        {options.map(opt => <div key={opt.id} className={styles.inputContainer}>
            <input
                className={styles.input}
                type="radio"
                value={opt.label}
                id={opt.id}
                name={heading}
                onChange={event => {
                    setSelected(opt.id);
                    onChange({event, newSelection: opt.id})
                }}
                checked={opt.id === selected}
            />
            <label
                className={styles.label}
                htmlFor={opt.id}
            >
                {mirage ? mirage(opt) : opt.label}
            </label>
        </div>)}
    </fieldset>
}
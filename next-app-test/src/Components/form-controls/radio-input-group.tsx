import { useState } from "react";
import { onChangeI, RadioInput } from "./radio-input";

interface propsOptionI {
    id: string,
    label: string,
    // optional
    selected?: boolean,
}
interface propsI {
    heading: string,
    onChange: ({event, newSelection}: onChangeI) => any;
    options: propsOptionI[],
    // optional
    styles?: any, // TODO: look up styles typing
    mirage?: (props: any) => React.ReactNode, // TODO: look up how to not make this any
}

export const RadioInputGroup = ({heading, options, onChange, styles = {}, mirage}: propsI) => {
    const [selection, setSelection] = useState(options.find(opt => opt.selected)?.id);
    const onChangeToUse = ({event, newSelection}: onChangeI) => {
        setSelection(newSelection);
        onChange({event, newSelection})
    }
    return <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{heading}</legend>
        <div className={styles.optionsContainer}>
            {options.map(opt => <RadioInput
                key={opt.id}
                {...opt}
                name={heading}
                onChange={onChangeToUse}
                selected={opt.id === selection}
                stylesOverride={styles}
                mirage={mirage}
            />)}
        </div>
    </fieldset>
}
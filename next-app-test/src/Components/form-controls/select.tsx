import { useState } from "react";

import defaultStyles from './categorized-radio-input-group-styles.module.scss'

export interface onChangeI {
    event: React.ChangeEvent<HTMLSelectElement> | React.FormEvent<HTMLDivElement>,
    newSelection: string
}
interface propsOptionI {
    id: string,
    text: string,
    // optional
    selected?: boolean,
}
interface propsI {
    id: string,
    label: string,
    options: propsOptionI[],
    onChange: ({event, newSelection}: onChangeI) => any;
    // optional
    stylesOverride?: any, // TODO: typescript
}

export const Select = ({ id, label, options, onChange, stylesOverride: stylesOverride = {}, }: propsI) => {
    const styles = {...defaultStyles, ...stylesOverride};
    const [selection, setSelection] = useState(options.find(o => o.selected)?.id);
    const onChangeToUse = ({event, newSelection}: onChangeI) => {
        setSelection(newSelection);
        onChange({event, newSelection})
    }
    return <div className={styles.container}>
        <label htmlFor={id}>{label}</label>
        <select
            id={id}
            name={id}
            value={selection}
            className={styles.input}
            onChange={event => {onChangeToUse({event, newSelection: event.target.value})}}
        >
            {options.map(o => <option key={o.id} value={o.id}>{o.text}</option>)}
        </select>
    </div>
}
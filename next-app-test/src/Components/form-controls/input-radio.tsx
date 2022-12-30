import { useState } from "react";

interface props {
    heading: string,
    onChange: ({event, newSelection}: {event: React.ChangeEvent<HTMLInputElement>, newSelection: string}) => any;
    options: {
        label: string,
        // optional
        selected?: boolean;
    }[]
}

export const InputRadio = ({heading, options, onChange}: props) => {
    const [selected, setSelected] = useState(options.find(opt => opt.selected)?.label);
    return <fieldset>
        <legend>{heading}</legend>
        {options.map(opt => <div key={opt.label}>
            <input
                type="radio"
                value={opt.label}
                id={opt.label}
                name={heading}
                onChange={event => {
                    setSelected(opt.label)
                    onChange({event, newSelection: opt.label})}
                }
                checked={opt.label === selected}
            />
            selected: {opt.selected ? 'T' : 'F'}
            <label htmlFor={opt.label}>{opt.label}</label>
        </div>)}
    </fieldset>
}
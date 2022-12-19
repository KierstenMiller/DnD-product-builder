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
    return <fieldset>
        <legend>{heading}</legend>
        {options.map(opt => <div>
            <input
                type="radio"
                value={opt.label}
                id={opt.label}
                name={heading}
                onChange={event => onChange({event, newSelection: opt.label})}
                checked={opt.selected}
            />
            selected: {opt.selected ? 'T' : 'F'}
            <label htmlFor={opt.label}>{opt.label}</label>
        </div>)}
    </fieldset>
}
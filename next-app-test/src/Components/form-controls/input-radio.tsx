import { useState } from "react";

interface props {
    heading: string,
    onChange: ({event, newSelection}: {event: React.ChangeEvent<HTMLInputElement>, newSelection: string}) => any;
    options: {
        id: string,
        label: string,
        // optional
        selected?: boolean,
    }[], 
}

export const InputRadio = ({heading, options, onChange}: props) => {
    const [selected, setSelected] = useState(options.find(opt => opt.selected)?.id);
    return <fieldset>
        <legend>{heading}</legend>
        {options.map(opt => <div key={opt.id}>
            <input
                type="radio"
                value={opt.label}
                id={opt.id}
                name={heading}
                onChange={event => {
                    setSelected(opt.id)
                    onChange({event, newSelection: opt.id})}
                }
                checked={opt.id === selected}
            />
            <label htmlFor={opt.id}>{opt.label}</label>
        </div>)}
    </fieldset>
}
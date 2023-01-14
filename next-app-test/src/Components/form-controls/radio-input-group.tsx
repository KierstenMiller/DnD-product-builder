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
    mirage?: (props: any) => React.ReactNode, // TODO: look up how to not make this any
}

export const RadioInputGroup = ({heading, options, onChange, styles = {}, mirage}: propsI) => {
    const [selected, setSelected] = useState(options.find(opt => opt.selected)?.id);
    return <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{heading}</legend>
        <div className={styles.optionsContainer}>
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
        </div>
        
    </fieldset>
}

interface props2I {
    heading: string,
    onChange: ({event, newSelection}: {event: React.ChangeEvent<HTMLInputElement>, newSelection: string}) => any;
    categorizedOptions: {
        id: string,
        category: string,
        options: propsOptionI[],
    }[],
    styles?: any, // TODO: typescript
    mirage?: (props: any) => React.ReactNode, // TODO: look up how to not make this any
}



export const CategorizedRadioInputGroup = ({heading, categorizedOptions, onChange, styles = {}, mirage}: props2I) => {
    const [selected, setSelected] = useState(categorizedOptions.flatMap(cat => cat.options).find(opt => opt.selected)?.id);
    return <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{heading}</legend>
        {categorizedOptions.map(cat => <div>
            <div id={cat.id}>{cat.category}</div>
            <div className={styles.optionsContainer}>
                {cat.options.map((opt, index) => <div key={opt.id} className={styles.inputContainer}>
                    <input
                        id={opt.id}
                        className={styles.input}
                        type="radio"
                        value={opt.label}
                        name={heading}
                        onChange={event => {
                            setSelected(opt.id);
                            onChange({event, newSelection: opt.id})
                        }}
                        checked={opt.id === selected}
                        aria-labelledby={`${cat.id} ${cat.id}_${opt.id}`}
                    />
                    <div id={`${cat.id}_${opt.id}`}>{opt.label}</div>
                    {/* NOTE: In forms mode (which we are forced into in a fieldset) any text in the mirage wouldn't be read */}
                    {/* NOTE: Including aria-hidden just in case */}
                    {mirage && <div aria-hidden={true} className={styles.label}>
                        {mirage(opt)}
                    </div>}
                </div>)}
            </div>  
        </div>)}
        
        
    </fieldset>
}
import classNames from "classnames";
import { useState } from "react";

import  defaultStyles  from './categorized-radio-input-group-styles.module.scss'

interface propsOptionI {
    id: string,
    label: string,
    // optional
    selected?: boolean,
}
interface propsI {
    heading: string,
    onChange: ({event, newSelection}: {event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>, newSelection: string}) => any;
    categorizedOptions: {
        id: string,
        category: string,
        options: propsOptionI[],
    }[],
    hideInput?: boolean,
    styles?: any, // TODO: typescript
    mirage?: (props: any) => React.ReactNode, // TODO: look up how to not make this any
}

export const CategorizedRadioInputGroup = ({heading, categorizedOptions, onChange, styles = {}, mirage, hideInput }: propsI) => {
    const [selected, setSelected] = useState(categorizedOptions.flatMap(cat => cat.options).find(opt => opt.selected)?.id);
    return <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{heading}</legend>
        selected: {selected}
        {categorizedOptions.map(cat => <div>
            <div id={cat.id}>{cat.category}</div>
            <div className={styles.optionsContainer}>
                {cat.options.map((opt) => <div
                    key={opt.id}
                    className={classNames(
                        defaultStyles.focus,
                        styles.inputContainer,
                        {[defaultStyles.selected || styles.selected]: opt.id === selected}
                    )}
            >
                    <input
                        id={opt.id}
                        className={classNames(styles.input, {'visually-hidden': hideInput || mirage})}
                        type="radio"
                        value={opt.label}
                        name={heading}
                        onChange={event => {setSelected(opt.id); onChange({event, newSelection: opt.id})}}
                        checked={opt.id === selected}
                        aria-labelledby={`${cat.id} ${cat.id}_${opt.id}`}
                    />
                    <div onClick={event => {setSelected(opt.id); onChange({event, newSelection: opt.id})}}>
                        <div id={`${cat.id}_${opt.id}`} className={classNames({'visually-hidden': mirage })}>{opt.label}</div>
                        {/* NOTE: In forms mode (which we are forced into in a fieldset) any text in the mirage wouldn't be read - Including aria-hidden just in case */}
                        {mirage && <div aria-hidden={true} className={styles.label}>
                            {mirage(opt)}
                        </div>}
                    </div>
                </div>)}
            </div>  
        </div>)}
    </fieldset>
}
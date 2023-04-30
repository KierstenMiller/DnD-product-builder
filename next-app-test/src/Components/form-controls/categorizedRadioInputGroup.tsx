import { useState } from "react";

import { onChangeI, RadioInput } from "./radioInput";
import { sassStylesI } from "-/util/typing-util";

interface propsOptionI {
    id: string,
    label: string,
    // optional
    selected?: boolean,
}
interface propsI {
    heading: string,
    onChange: ({event, newSelection }: onChangeI) => any;
    categorizedOptions: {
        id: string | number,
        category: string | number,
        options: propsOptionI[],
    }[],
    hideInput?: boolean,
    styles?: sassStylesI,
    mirage?: (props: any) => React.ReactNode, // TODO: look up how to not make this any
}

export const CategorizedRadioInputGroup = ({heading, categorizedOptions, onChange, styles = {}, mirage, hideInput }: propsI) => {
    const [selection, setSelection] = useState(categorizedOptions.flatMap(cat => cat.options).find(opt => opt.selected)?.id);
    const onChangeToUse = ({event, newSelection}: onChangeI) => {
        setSelection(newSelection);
        onChange({event, newSelection,})
    }
    return <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{heading}</legend>
        {categorizedOptions.map(cat => <div key={cat.id}>
            <div id={cat.id.toString()}>{cat.category}</div>
            <div className={styles.optionsContainer}>
                {cat.options.map((opt) => <RadioInput
                    key={opt.id}
                    {...opt}
                    name={heading}
                    onChange={onChangeToUse}
                    stylesOverride={styles}
                    mirage={mirage}
                    hideInput={hideInput}
                    selected={opt.id === selection}
                    ariaLabelledBy={cat.id.toString()}
                />)}
            </div>  
        </div>)}
    </fieldset>
}
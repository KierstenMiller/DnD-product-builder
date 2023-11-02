import { useState } from "react";

import { sassStylesI } from "-/util/typing-util";
import { mirageCallbackT, onChangeI, RadioInput } from "-/Components/form-controls/radioInput/radioInput";

interface propsOptionI {
    id: string,
    label: string,
    image: string,
    // optional
    selected?: boolean,
}
interface propsI {
    heading: string,
    onChange: ({ event, newSelection }: onChangeI) => any;
    categorizedOptions: {
        id: string | number,
        category: string | number,
        options: propsOptionI[],
    }[],
    // optional
    testId?: string, // made optional to prevent DOM bloat
    hideInput?: boolean,
    styles?: sassStylesI,
    mirage?: mirageCallbackT,
}

export const CategorizedRadioInputGroup = ({ heading, categorizedOptions, onChange, styles = {}, mirage, testId, hideInput }: propsI) => {
    const [selection, setSelection] = useState(categorizedOptions.flatMap(cat => cat.options).find(opt => opt.selected)?.id);
    const onChangeToUse = ({ event, newSelection }: onChangeI) => {
        setSelection(newSelection);
        onChange({ event, newSelection, })
    }
    return <fieldset data-testid={testId} className={styles.fieldset}>
        <legend className={styles.legend}>{heading}</legend>
        {categorizedOptions.map(cat => <div data-testid={`${cat.id.toString()}-group`} key={cat.id}>
            <div
                data-testid={`${cat.id.toString()}-label`}
                id={cat.id.toString()} // NOTE: this is used as part of the aria-labelledby attribute on the RadioInput's input element
            >
                {cat.category}
            </div>
            <div
                data-testid={`${cat.id.toString()}-inputs-container`}
                className={styles.optionsContainer}
            >
                {cat.options.map((opt) => <RadioInput
                    testId={`${heading}_${cat.id.toString()}_${opt.id}`}
                    key={opt.id}
                    {...opt}
                    name={heading}
                    onChange={onChangeToUse}
                    stylesOverride={styles}
                    {...mirage && { mirage: () => mirage(opt) }}
                    hideInput={hideInput}
                    selected={opt.id === selection}
                    ariaLabelledBy={cat.id.toString()}
                />)}
            </div>
        </div>)}
    </fieldset>
}
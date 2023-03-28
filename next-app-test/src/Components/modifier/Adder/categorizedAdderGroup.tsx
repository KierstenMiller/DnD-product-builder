import { onChangeI } from "-/Components/form-controls/radioInput";
import { useState } from "react";
import { AdderGroup } from "./AdderGroup";

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
    view: (props: any) => React.ReactNode,
    // optional
    styles?: any, // TODO: typescript
}

export const CategorizedAdderGroup = ({heading, categorizedOptions, onChange, styles = {}, view }: propsI) => {
    const [selection, setSelection] = useState(categorizedOptions.flatMap(cat => cat.options).find(opt => opt.selected)?.id);
    const onChangeToUse = ({event, newSelection}: onChangeI) => {
        setSelection(newSelection);
        onChange({event, newSelection,})
    }
    return <div className={styles.fieldset}>
        <div className={styles.legend}>{heading}</div>
        {categorizedOptions.map(cat => <div key={cat.id}>
            <div className={styles.optionsContainer}>
                <AdderGroup
                    heading={cat.category}
                    options={cat.options}
                    onChange={onChange}
                    styles={styles}
                    view={view}
                />
            </div>  
        </div>)}
    </div>
}
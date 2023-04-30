import { onChangeI } from "-/Components/form-controls/radioInput";
import { sassStylesI } from "-/util/typing-util";
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
    styles?: sassStylesI,
}

export const CategorizedAdderGroup = ({heading, categorizedOptions, onChange, styles = {}, view }: propsI) => {
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
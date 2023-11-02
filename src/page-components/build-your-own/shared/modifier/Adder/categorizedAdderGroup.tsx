import { onChangeI } from "-/Components/form-controls/radioInput/radioInput";
import { sassStylesI } from "-/util/typing-util";
import { AdderGroup } from "./adderGroup";

interface propsOptionI {
    id: string,
    label: string,
    image: string,
    // optional
    selected?: boolean,
}
interface propsI {
    heading: string,
    onClick: ({ event, newSelection }: onChangeI) => any;
    categorizedOptions: {
        id: string | number,
        category: string | number,
        options: propsOptionI[],
    }[],
    view: (props: any) => React.ReactNode,
    // optional
    styles?: sassStylesI,
}

export const CategorizedAdderGroup = ({ heading, categorizedOptions, onClick, styles = {}, view }: propsI) => {
    return <div className={styles.fieldset}>
        <div className={styles.legend}>{heading}</div>
        {categorizedOptions.map(cat => <div key={cat.id}>
            <div className={styles.optionsContainer}>
                <AdderGroup
                    heading={cat.category}
                    options={cat.options}
                    onClick={onClick}
                    styles={styles}
                    view={view}
                />
            </div>
        </div>)}
    </div>
}

import { onChangeI } from '-/Components/form-controls/radioInput';
import { optionI } from '-/page-components/build-your-own/build-your-own.types'
import { sassStylesI } from '-/util/typing-util';

interface propsOptionI {
    id: string,
    label: string,
    // optional
    selected?: boolean,
}

interface propsI {
    heading: string | number,
    onChange: ({ event, newSelection }: onChangeI) => any;
    options: propsOptionI[],
    view: (option: optionI, onClick: ({ event, newSelection }: onChangeI) => void) => React.ReactNode,
    // optional
    styles?: sassStylesI,

}

export const AdderGroup = ({ heading, options, onChange, styles = {}, view }: propsI) => {
    return <div className={styles.fieldset}>
        <div className={styles.legend}>{heading}</div>
        <div className={styles.optionsContainer}>
            {options.map(opt => <div key={opt.id}>
                <div aria-hidden={true} className={styles.label}>
                    {view(opt, onChange)}
                </div>
            </div>)}
        </div>
    </div>
}
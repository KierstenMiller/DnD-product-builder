import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifierI, modifiersT, optionI, optionsT } from '-/page-components/build-your-own/build-your-own.types'
import { CategorizedRadioInputGroup } from '../form-controls/categorized-radio-input-group'
import { RadioInputGroup } from '../form-controls/radio-input-group'

import BYOStyles from '#/build-your-own.module.scss'
import { displays } from './displays'
import { assembleOptionsMap } from './modifier.util'
import { onChangeI } from '../form-controls/radio-input'
import { adderDisplayValues } from './modifier.types'
import { useState } from 'react'

interface propsI { mod: modifierI, onChange: ({ newSelection }: onChangeI) => void }

interface propsOptionI {
    id: string,
    label: string,
    // optional
    selected?: boolean,
}
interface props2I {
    heading: string,
    onChange: ({ event, newSelection }: onChangeI) => any;
    options: propsOptionI[],
    // optional
    styles?: any, // TODO: look up styles typing
    view?: (option: optionI, onClick: ({ event, newSelection }: onChangeI) => void) => React.ReactNode, // TODO: look up how to not make this any
}

const AdderGroup = ({ heading, options, onChange, styles = {}, view }: props2I) => {
    const [selection, setSelection] = useState(options.find(opt => opt.selected)?.id);
    const onChangeToUse = ({ event, newSelection }: onChangeI) => {
        console.log('onChange', {event, newSelection});
        setSelection(newSelection);
        onChange({ event, newSelection })
    }
    return <div className={styles.fieldset}>
        <div className={styles.legend}>{heading}</div>
        <div className={styles.optionsContainer}>
            {options.map(opt => <div key={opt.id}>
                {view && <div aria-hidden={true} className={styles.label}>
                    {view(opt, onChangeToUse)}
                </div>}
            </div>)}
        </div>
    </div>
}

export const ModifierInstance = observer(({ mod, onChange }: propsI) => {
    const isAdder = Object.values(adderDisplayValues).includes(mod.display); //mod.display in adderDisplayValues;
    const theSort = Array.isArray(mod.sortBy) ? mod.sortBy[0] : mod.sortBy;
    const newModifier = {
        ...mod,
        id: `${mod.id}`,
        ...(mod.groupBy || theSort) && {
            composedOptions: assembleOptionsMap(mod.options, mod.groupBy, theSort)
        }
    };
    return <BasicAccordion
        key={mod.id}
        stylesOverride={BYOStyles}
        headerText={mod.label}
        headerLevel={3}
        id={mod.id}
    >
        {isAdder
            ? <AdderGroup
                options={mod.options}
                onChange={onChange}
                styles={displays[mod.display]?.styles}
                view={displays[mod.display]?.view}
            />
            : newModifier.composedOptions
                ? <CategorizedRadioInputGroup
                    heading={`${mod.label} ${mod.groupBy}`}
                    onChange={onChange}
                    categorizedOptions={[...newModifier.composedOptions.entries()].map(([category, options]) => ({ id: `${mod.id}_${category}`, category, options }))}
                    styles={displays[mod.display]?.styles}
                    mirage={displays[mod.display]?.view}
                />
                : <RadioInputGroup
                    heading={mod.label}
                    options={mod.options}
                    onChange={onChange}
                    styles={displays[mod.display]?.styles}
                    mirage={displays[mod.display]?.view}
                />
        }
    </BasicAccordion>
})

import { observer } from 'mobx-react-lite'

import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { modifierI } from '-/page-components/build-your-own/build-your-own.types'
import { CategorizedRadioInputGroup } from '-/Components/form-controls/categorizedRadioInputGroup/categorizedRadioInputGroup'
import { RadioInputGroup } from '-/Components/form-controls/radioInputGroup/radioInputGroup'
import { onChangeI } from '-/Components/form-controls/radioInput/radioInput'

import { displays } from './displays'
import { assembleOptionsMap } from './modifier.util'
import { adderDisplayValues } from './modifier.types'
import { CategorizedAdderGroup } from './Adder/categorizedAdderGroup'
import { AdderGroup } from './Adder/adderGroup'

import BYOStyles from '#/build-your-own.module.scss'

interface propsI { mod: modifierI, onChange: ({ newSelection }: onChangeI) => void }

export const ModifierInstance = observer(({ mod, onChange }: propsI) => {
    const isAdder = Object.values(adderDisplayValues).some(aDV => aDV === mod.display);
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
            ? newModifier.composedOptions
                ? <CategorizedAdderGroup
                    heading={`${mod.label} ${mod.groupBy}`}
                    onClick={onChange}
                    categorizedOptions={[...newModifier.composedOptions.entries()].map(([category, options]) => ({ id: `${mod.id}_${category}`, category, options }))}
                    styles={displays[mod.display]?.styles}
                    view={displays[mod.display]?.view}
                />
                : <AdderGroup
                    heading={mod.label}
                    options={mod.options}
                    onClick={onChange}
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

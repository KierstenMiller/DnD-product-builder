import { observer } from 'mobx-react-lite'

import { BasicAccordionGroup } from '-/Components/accordion/basic-accordion-group'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { modifiersT } from '-/page-components/build-your-own/build-your-own.types'
import { CategorizedRadioInputGroup } from '../form-controls/categorized-radio-input-group'
import { RadioInputGroup } from '../form-controls/radio-input-group'

import BYOStyles from '#/build-your-own.module.scss'
import { radioDisplays } from './displays'
import { assembleOptionsMap } from './modifier.util'

interface BuildYourOwnPageI {
    model: BuildYourOwnModel,
    modifiers: modifiersT,
}

export const Modifiers = observer(({model, modifiers}: BuildYourOwnPageI) => {
    const newModifiers = modifiers.map((mod) => {
        const theSort = Array.isArray(mod.sortBy) ? mod.sortBy[0] : mod.sortBy; // TODO: implement more than 1 sort
        return {
            ...mod,
            id:`${mod.id}`,
            ...(mod.groupBy || theSort) && {
                composedOptions: assembleOptionsMap(mod.options, mod.groupBy, theSort)
            }
        }
    });
    const getOptionValue = (modId: string, selectionId: string) => {
        const match = newModifiers.find(mod => mod.id === modId)?.options.find(o => o.id === selectionId)?.optionKey;
        if (!match) throw new Error(`No optionkey value was found in modifier ${modId}`)
        return match;
    }
    return <BasicAccordionGroup>
        {newModifiers.map(mod => <BasicAccordion
            key={mod.id}
            stylesOverride={BYOStyles}
            headerText={mod.label}
            headerLevel={3}
            id={mod.id}
        >
            {mod.composedOptions
                ? <CategorizedRadioInputGroup
                    heading={`${mod.label} ${mod.groupBy}`}
                    onChange={({newSelection}) => model.updateConfigSelection({id: mod.id, selection: newSelection, value: getOptionValue(mod.id, newSelection)})}
                    categorizedOptions={[...mod.composedOptions.entries()].map(([category, options]) => ({id:`${mod.id}_${category}`, category, options}))}
                    styles={radioDisplays[mod.display]?.styles}
                    mirage={radioDisplays[mod.display]?.mirage} 
                />
                : <RadioInputGroup
                    heading={mod.label}
                    options={mod.options}
                    onChange={({newSelection}) => model.updateConfigSelection({id: mod.id, selection: newSelection, value: getOptionValue(mod.id, newSelection)})}
                    styles={radioDisplays[mod.display]?.styles}
                    mirage={radioDisplays[mod.display]?.mirage} 
                />
            }
        </BasicAccordion>)}
    </BasicAccordionGroup>
})

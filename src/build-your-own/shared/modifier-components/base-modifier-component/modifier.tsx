import { observer } from 'mobx-react-lite'

import { AdderGroup } from '-/build-your-own/shared/modifier-components/adder-modifier-component/adder-group'
import { CategorizedAdderGroup } from '-/build-your-own/shared/modifier-components/adder-modifier-component/categorized-adder-group'
import { displays } from '-/build-your-own/shared/modifier-components/shared/components/display-components/displays'
import { adderDisplayValues } from '-/build-your-own/shared/modifier-components/shared/components/display-components/displays.types'
import { assembleOptionsMap } from '-/build-your-own/shared/modifier-components/shared/logic/modifier.util'
import { type modifierI } from '-/build-your-own/shared/typing/build-your-own.types'
import { BasicAccordion } from '-/component-library/accordion/basic-accordion'
import { CategorizedRadioInputGroup } from '-/component-library/form-controls/categorizedRadioInputGroup/categorized-radio-input-group'
import { type onChangeI } from '-/component-library/form-controls/radioInput/radio-input'
import { RadioInputGroup } from '-/component-library/form-controls/radioInputGroup/radio-input-group'

interface propsI { mod: modifierI, onChange: ({ newSelection }: onChangeI) => void }

export const ModifierInstance = observer(({ mod, onChange }: propsI) => {
  const isAdder = Object.values(adderDisplayValues).some(aDV => aDV === mod.display)
  const theSort = Array.isArray(mod.sortBy) ? mod.sortBy[0] : mod.sortBy
  const newModifier = {
    ...mod,
    id: `${mod.id}`,
    ...(mod.groupBy ?? theSort) && {
      composedOptions: assembleOptionsMap(mod.options, mod.groupBy, theSort)
    }
  }
  return <BasicAccordion
    key={mod.id}
    triggerText={mod.label}
    headerLevel={3}
    testId={`${mod.id}-modifier`}
    id={mod.id}
    className="mb-huge"
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
          includeCount={true}
          categorizedOptions={[...newModifier.composedOptions.entries()].map(([category, options]) => ({ id: `${mod.id}_${category}`, category, options }))}
          styles={displays[mod.display]?.styles}
          mirage={displays[mod.display]?.view}
        />
        : <RadioInputGroup
          heading={mod.label}
          options={mod.options}
          onChange={onChange}
          includeCount={true}
          styles={displays[mod.display]?.styles}
          mirage={displays[mod.display]?.view}
        />
    }
  </BasicAccordion>
})

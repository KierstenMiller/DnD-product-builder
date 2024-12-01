import { useState } from 'react'

import { RadioInput, type mirageCallbackPropsI, type onChangeI } from '-/component-library/form-controls/radioInput/radio-input'
import { makeId } from '-/util-library/helpers'
import { type sassStylesI } from '-/util-library/typing-util'

export interface propsOptionI {
  id: string
  label: string
  image: string
  // optional
  testId?: string // made optional to prevent DOM bloat
  selected?: boolean
}
interface propsI {
  heading: string
  onChange: ({ event, newSelection }: onChangeI) => any
  options: propsOptionI[]
  // optional
  testId?: string // made optional to prevent DOM bloat
  styles?: sassStylesI
  mirage?: ((props: mirageCallbackPropsI) => JSX.Element)
}

export const RadioInputGroup = ({ heading, options, onChange, testId, styles = {}, mirage }: propsI) => {
  const [selection, setSelection] = useState(options.find(opt => opt.selected)?.id)
  const onChangeToUse = ({ event, newSelection }: onChangeI) => {
    setSelection(newSelection)
    onChange({ event, newSelection })
  }
  return <fieldset data-testid={testId} className={styles.fieldset}>
    <legend className={styles.legend}>{heading}</legend>
    <div data-testid={`${testId}-options`} className={styles.optionsContainer}>
      {options.map(opt => <RadioInput
        testId={`${makeId(heading)}_${opt.id}`}
        key={opt.id}
        {...opt}
        name={heading}
        onChange={onChangeToUse}
        selected={opt.id === selection}
        stylesOverride={styles}
        {...mirage && { mirage: () => mirage(opt) }}
      />)}
    </div>
  </fieldset>
}

import { useState } from 'react'

import { RadioInput, type mirageCallbackT, type onChangeI } from '-/component-library/form-controls/radioInput/radio-input'
import { makeId } from '-/util-library/helpers'
import { type sassStylesI } from '-/util-library/typing-util'

interface propsOptionI {
  id: string
  label: string
  image: string
  // optional
  selected?: boolean
}
interface propsI {
  heading: string
  onChange: ({ event, newSelection }: onChangeI) => any
  categorizedOptions: Array<{
    id: string | number
    category: string | number
    options: propsOptionI[]
  }>
  // optional
  testId?: string // made optional to prevent DOM bloat
  includeCount?: boolean
  hideInput?: boolean
  styles?: sassStylesI
  mirage?: mirageCallbackT
}

export const CategorizedRadioInputGroup = ({ heading, categorizedOptions, onChange, styles = {}, mirage, testId, includeCount, hideInput }: propsI) => {
  const [selection, setSelection] = useState(categorizedOptions.flatMap(cat => cat.options).find(opt => opt.selected)?.id)
  const onChangeToUse = ({ event, newSelection }: onChangeI) => {
    setSelection(newSelection)
    onChange({ event, newSelection })
  }
  return <fieldset data-testid={testId} className={styles.fieldset}>
    <legend className={styles.legend}>
      {heading}
      {includeCount && <>
        {': '}
        <span className={styles.count}>{categorizedOptions.flatMap(cat => cat.options).length} Options</span>
      </>}
    </legend>
    {categorizedOptions.map(cat => <div data-testid={`${cat.id.toString()}-group`} key={cat.id}>
      <div
        className={styles.categoryLabel}
        data-testid={`${cat.id.toString()}-label`}
        id={cat.id.toString()} // NOTE: this is used as part of the aria-labelledby attribute on the RadioInput's input element
      >
        {cat.category}
      </div>
      <div
        data-testid={`${cat.id.toString()}-options`}
        className={styles.optionsContainer}
      >
        {cat.options.map((opt) => <RadioInput
          testId={`${makeId(heading)}_${cat.id.toString()}_${opt.id}`}
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

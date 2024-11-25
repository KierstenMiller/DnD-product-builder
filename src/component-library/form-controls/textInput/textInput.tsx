import { useState } from 'react'

import { type sassStylesI } from '-/util-library/typing-util'

import defaultStyles from '-/component-library/form-controls/shared/input-styles.module.scss'

export interface onChangeI {
  event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>
  newValue: string
}
interface propsI {
  id: string
  label: string
  onChange: ({ event, newValue }: onChangeI) => any
  // optional
  testId?: string // made optional to prevent DOM bloat
  defaultValue?: string
  helpText?: string
  stylesOverride?: sassStylesI
}

export const TextInput = ({ id, label, onChange, testId, defaultValue, helpText, stylesOverride = {} }: propsI) => {
  const [value, setValue] = useState(defaultValue ?? '')
  const styles = { ...defaultStyles, ...stylesOverride }
  const ariaDescribedById = helpText ? `${id}-help-text` : undefined
  return <div data-testid={testId ?? id} className={styles.container}>
    <label className={styles.label} htmlFor={id}>{label}</label>
    <input
      className={styles.input}
      id={id}
      name={id} // name is not needed, but leaving it here just in case someday this is used in a form that is submitted to a server
      type="text"
      value={value}
      onChange={event => {
        setValue(event.target.value)
        onChange({ event, newValue: event.target.value })
      }}
      {...helpText && { 'aria-describedby': ariaDescribedById }}
    />
    {helpText && <div id={ariaDescribedById}>{helpText}</div>}
  </div>
}

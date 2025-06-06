import classNames from 'classnames'

import { makeId } from '-/util-library/helpers'
import { type sassStylesI } from '-/util-library/typing-util'

import defaultStyles from '-/component-library/form-controls/shared/input-styles.module.scss'

export interface onChangeI {
  newSelection: string
  event?: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>
}
export interface mirageCallbackPropsI {
  id: string
  label: string
  image: string
  onClick?: ({ event, newSelection }: onChangeI) => void
}
export type mirageCallbackT = (props: mirageCallbackPropsI) => JSX.Element
interface propsI {
  id: string
  label: string
  name: string
  onChange: ({ event, newSelection }: onChangeI) => any
  // optional
  testId?: string // made optional to prevent DOM bloat
  ariaLabelledBy?: string
  selected?: boolean
  hideInput?: boolean
  stylesOverride?: sassStylesI
  mirage?: () => JSX.Element
}

export const RadioInput = ({ id, testId, name, label, onChange, ariaLabelledBy, selected, hideInput, stylesOverride = {}, mirage }: propsI) => {
  const styles = { ...defaultStyles, ...stylesOverride }
  const nameId = makeId(name)
  const ariaLabelId = `${nameId}_${id}`
  return <div
    key={id}
    data-testid={testId}
    className={classNames(
      styles.focus,
      styles.inputContainer,
      { [styles.selected]: selected }
    )}
  >
    <input
      id={id}
      className={classNames(styles.input, { 'visually-hidden': Boolean(hideInput) || Boolean(mirage) })}
      type="radio"
      value={label}
      name={nameId}
      onChange={event => { onChange({ event, newSelection: id }) }}
      defaultChecked={selected} // NOTE: In the html spec. a input element doesn't have a 'defaultValue' attribute. However, React uses it to make the input a controlled component. See: https://react.dev/reference/react-dom/components/input
      {...ariaLabelledBy && { 'aria-labelledby': `${ariaLabelId} ${ariaLabelledBy}` }}
    />
    <label
      className={classNames({ 'visually-hidden': mirage })}
      {...(ariaLabelledBy ? { id: ariaLabelId } : { htmlFor: id })}
    >
      {label}
    </label>
    {/* NOTE: In forms mode (which we are forced into in a fieldset) any text in the mirage wouldn't be read - Including aria-hidden just in case */}
    {mirage && <div data-testid="mirage-container" aria-hidden={true} className={styles.label} onClick={event => { onChange({ event, newSelection: id }) }}>
      {mirage()}
    </div>}
  </div>
}

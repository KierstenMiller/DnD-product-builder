import { type mirageCallbackPropsI, type onChangeI } from '-/component-library/form-controls/radioInput/radio-input'
import { type sassStylesI } from '-/util-library/typing-util'

interface propsOptionI {
  id: string
  label: string
  image: string
  // optional
  selected?: boolean
}

interface propsI {
  heading: string | number
  onClick: ({ event, newSelection }: onChangeI) => any
  options: propsOptionI[]
  view: (props: mirageCallbackPropsI) => React.ReactNode
  // optional
  styles?: sassStylesI

}

export const AdderGroup = ({ heading, options, onClick, styles = {}, view }: propsI) => {
  return <div className={styles.fieldset}>
    <div className={styles.legend}>{heading}</div>
    <div className={styles.optionsContainer}>
      {options.map(opt => <div key={opt.id}>
        <div aria-hidden={true} className={styles.label}>
          {view({ id: opt.id, image: opt.image, label: opt.label, onClick })}
        </div>
      </div>)}
    </div>
  </div>
}

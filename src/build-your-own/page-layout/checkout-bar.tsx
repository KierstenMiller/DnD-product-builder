import { observer } from 'mobx-react-lite'

import { type configT, type modifiersT, type StandardModelT } from '-/build-your-own/shared/typing/build-your-own.types'
import { BasicAccordion } from '-/component-library/accordion/basic-accordion'

import styles from './build-your-own-page.module.scss'

const getPrice = (modifiers: modifiersT, config: configT) => {
  return config.reduce(
    (acc, c) => {
      const modifier = modifiers.find((m) => m.id === c.id)
      const price = modifier?.options.find(o => o.value === c.value)?.price ?? 0
      return acc + price
    }, 0)
}

const getSelectionList = (modifiers: modifiersT, config: configT) => {
  return config.map((c) => {
    const modifier = modifiers.find((m) => m.id === c.id)
    const selectedOption = c.value
    return {
      label: modifier?.label,
      data: selectedOption
    }
  })
}

export const CheckoutBar = observer(({ modifiers, model }: { modifiers: modifiersT, model: StandardModelT }) => {
  const price = getPrice(modifiers, model.config)
  const selectionList = getSelectionList(modifiers, model.config)
  return (
    <BasicAccordion
      triggerText={'Results'}
      headerLevel={2}
      id={'results'}
      drawerOpen={false}
    >
      <div className={styles.resultsContent}>
        <div className={styles.price}>
          <div className={styles.label}>Total Price</div>
          <div className={styles.data}>${price}.00</div>
        </div>
        <div className={styles.selectionList}>
          {selectionList.map((s) => <div key={s.label} className={styles.selection}>
            <div className={styles.label}>{s.label}</div>
            <div className={styles.data}>{s.data}</div>
          </div>)}
        </div>
      </div>
    </BasicAccordion>
  )
})

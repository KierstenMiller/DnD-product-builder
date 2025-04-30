import { observer } from 'mobx-react-lite'

import { type configT, type modifiersT, type StandardModelT } from '-/build-your-own/shared/typing/build-your-own.types'

import styles from './checkout-bar.module.scss'

const getPrice = (modifiers: modifiersT, config: configT) => {
  return config.reduce(
    (acc, c) => {
      const modifier = modifiers.find((m) => m.id === c.id)
      const price = modifier?.options.find(o => o.value === c.value)?.price ?? 0
      return acc + price
    }, 0)
}

const getSelectionList = (modifiers: modifiersT, config: configT) => {
  return config.map((c) => ({
    id: c.id,
    label: modifiers.find((m) => m.id === c.id)?.label,
    data: c.selection
  }))
}

export const CheckoutBar = observer(({ modifiers, model }: { modifiers: modifiersT, model: StandardModelT }) => {
  const price = getPrice(modifiers, model.config)
  const selectionList = getSelectionList(modifiers, model.config)
  return (
    <div className={styles.results}>
      <div className={styles.price}>
        <div className={styles.label}>Total Price</div>
        <div className={styles.data}>${price}.00</div>
      </div>
      <div className={styles.selectionList}>
        {selectionList.map((s) => <div key={s.id} data-testid={`${s.id}-selection-group`} className={styles.selection}>
          <div className={styles.label} data-testid="selection-id">{s.label}</div>
          <div className={styles.data} data-testid="selection-value">{s.data}</div>
        </div>)}
      </div>
    </div>
  )
})

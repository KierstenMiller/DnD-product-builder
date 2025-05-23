import { dataAggulativeStacks, dataAggulativeStacksRental, dataCustomCabinet, dataFreeformMatrix } from '-/build-your-own/data/compiled-responses'
import styles from './build-your-own-dev-bar.module.scss'

export const BuildYourOwnDevBar = ({ setData }: { setData: (data: any) => void }) => {
  return (
    <div className={styles.devBar}>
      <div className={styles.menu}>
        {/* Mock pages for testing - commenting out for now
        <button onClick={() => { setData(dataSingletonMock) }}>Singleton Mock</button>
        <button onClick={() => { setData(dataSingletonRobot) }}>Singleton Robots</button> */}
        <button onClick={() => { setData(dataCustomCabinet) }}>Singleton Cabinet</button>
        <button onClick={() => { setData(dataFreeformMatrix) }}>Freeform Matrix Mock</button>
        <button onClick={() => { setData(dataAggulativeStacks) }}>Aggulative Stacks Mock</button>
        <button onClick={() => { setData(dataAggulativeStacksRental) }}>Aggulative Stacks Rental</button>
      </div>
    </div>
  )
}

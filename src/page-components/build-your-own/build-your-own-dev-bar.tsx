import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { getStyles } from '-/util/helpers'
import { useContext } from 'react'
import { ThemeContext } from './build-your-own-page'
import { dataAggulativeStacks, dataAggulativeStacksRental, dataFreeformMatrix, dataSingletonMock, dataSingletonRobot } from './builderRawData'

export const BuildYourOwnDevBar = ({ setData }: { setData: (data: any) => void }) => {
  const theme = useContext(ThemeContext)
  const styles = (id: string) => getStyles({}, theme, id)
  return (
        <div className={styles('dev-bar')}>
            <BasicAccordion
                id="workspace-goals"
                headerText="Project Tools"
                headerLevel={2}
            >
                <span className="mr-medium"><b>UP NEXT:</b> Create slick design for website </span>
                <div>
                    <button onClick={() => { setData(dataSingletonMock) }}>Singleton Mock</button>
                    <button onClick={() => { setData(dataSingletonRobot) }}>Singleton Robots</button>
                    <button onClick={() => { setData(dataFreeformMatrix) }}>Freeform Matrix Mock</button>
                    <button onClick={() => { setData(dataAggulativeStacks) }}>Aggulative Stacks Mock</button>
                    <button onClick={() => { setData(dataAggulativeStacksRental) }}>Aggulative Stacks Rental</button>
                </div>
                <BasicAccordion
                    id="workspace-goals"
                    headerText="Workspace Goals"
                    headerLevel={2}
                >
                    <div className='p-large'>
                        <u>SHARED WORKSPACE GOALS:</u>
                        <p>One modifier selection can update another</p>
                        <p>Only one modifier is open at a time</p>
                        <div className='flex'>
                            <div className='pr-large'>
                                <u>WORKSPACE A - SINGLETON</u>
                                <p>Only one item in workspace</p>
                                <p>all modifiers are aplied to the item</p>
                            </div>
                            <div className='pr-large'>
                                <u>WORKSPACE B - FREEFORM GRID</u>
                                <p>Allows multiple items in workspace</p>
                                <p>Workspace is a hardcoded grid (column count, row count, size is constant)</p>
                                <p>All modifiers are not applied to all items</p>
                                <p>Each item has its own configuration</p>
                                <p>No constrictions on where items can be placed</p>
                            </div>
                            <div className='pr-large'>
                                <u>WORKSPACE C - BUILDER</u>
                                <p>Allows multiple stacked items in workspace</p>
                                <p>Workspace is constricted by rules of builder (number of stacks, stack height, size of units/ grid squares)</p>
                                <p>All modifiers are applied to all items (uniform application)</p>
                                <p>Stacks and items have validation requirements, constricting how items can be added to stacks</p>
                            </div>
                            <div className='pr-large'>
                                <u>WORKSPACE D - SCAFFOLDED BUILDER</u>
                                <p>Allows multiple scaffolds with or without items</p>
                                <p>Scaffolding can be vertical or horizontal</p>
                                <p>All modifiers are not applied to all items</p>
                                <p>Each scaffold has its own config, config is applied uniformly to all pieces in the scaffold</p>
                                <p>Some scaffolds require all open positions/slots are filled</p>
                                <p>Some scaffolds do not require all open positions/slots are filled</p>
                                <p>Some scaffolds have no positions/slots to be filled</p>
                            </div>
                        </div>
                    </div>
                </BasicAccordion>
                <BasicAccordion
                    id="project-groals"
                    headerText="Project Goals"
                    headerLevel={2}
                >
                    <p>Goal: optimize first paint: provide only info that is needed OR cache all info server-side</p>
                    <p>Goal: SEO for procuts</p>
                    <p>Goal: allow a given product with a given productId to have multiple looks</p>
                    <p>Goal: Allow api to decide presentation of the modifier component.</p>
                    <p>Goal: Allow api to decide presentation of the workspace component</p>
                    <p>Goal: Make MobX model agnostic of configuration</p>
                    <p>Goal: Implement unit, integrated, and functional (end to end) testing</p>
                    <p>Goal: Shallow update (do not effect browsers history) url on config change</p>
                    <p>Goal: Include error handling</p>
                    <ul>
                        <li>input radio checks if all ids are unique, if not provide error handling (create unique ids and provide console.warn?)</li>
                        <li>what if a display is not provided for modifier</li>
                    </ul>
                </BasicAccordion>
            </BasicAccordion>
        </div>
  )
}

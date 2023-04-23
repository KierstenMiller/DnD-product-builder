import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { builderKeys } from '-/page-components/build-your-own/build-your-own.util'

// MOCK DATA IMPORTS
import { mockModifierA, mockModifierB, mockModifierC, mockModifierD, mockModifierE } from '-/data/singleton/testingMocks/modifiers.data'
import { robotModifiers } from '-/data/singleton/robots/modifiers.data'
import { matrixMock } from '-/data/freeformMatrix/matrix.data'
import { aggulativeStacksMock1 } from '-/data/aggulativeStacks/testingMocks/stacks.data'
import { matrixT } from '-/page-components/build-your-own/build-your-own.types'
import { shapeModifiers } from '-/data/freeformMatrix/modifiers.data'
import { modifiers } from '-/data/aggulativeStacks/testingMocks/modifiers.data'
import { modifiers as rentalModifiers } from '-/data/aggulativeStacks/rental/modifiers.data'
import { rentalStacksMock } from '-/data/aggulativeStacks/rental/stacks.data'
import { validationValues } from '-/Components/modifier/modifier.types'

// NOTE: ALL OPTION IDS MUST BE UNIQUE ACROSS WORKSPACES, OTHERWISE MOBX GETS CONFUSED

// mock SINGLETON data
const dataSingletonMock = {
    modifiers: [mockModifierA, mockModifierB, mockModifierC, mockModifierD, mockModifierE],
    builder: {
        type: builderKeys.singleton,
        data: undefined,
    }
}

// robot SINGLETON data
const dataSingletonRobot = {
    modifiers: robotModifiers,
    builder: {
        type: builderKeys.singleton,
        data: undefined,
    }
}

// mock FREEFORM MATRIX data
const dataFreeformMatrix = {
    modifiers: shapeModifiers,
    builder: {
        // TODO: figure out how to clean up this typing? Maybe not though, this stuff should come back from API
        type: builderKeys.freeformMatrix as builderKeys.freeformMatrix,
        data: matrixMock as matrixT,
    }
}

// mock AGGULATIVE STACKS data
const dataAggulativeStacks = {
    modifiers: modifiers,
    builder: {
        type: builderKeys.aggulativeStacks as builderKeys.aggulativeStacks,
        data: aggulativeStacksMock1
    },
}

// rental AGGULATIVE STACKS data
export const dataAggulativeStacksRental = {
    modifiers: rentalModifiers, 
    builder: {
        type: builderKeys.aggulativeStacks as builderKeys.aggulativeStacks,
        // rules: {maxStackHeight: 8, maxStacksCount: 4},
        rules: [
            {type: validationValues.maxStackHeight, values: ['8']},
            {type: validationValues.maxStacksCount, values: ['4']}
        ],
        data: rentalStacksMock
    },
}

export const BuildYourOwnDevBar = ({setData}: {setData: (data: any) => void}) => {
    return (
        <div>
            <BasicAccordion
                id="workspace-goals"
                headerText="Dev Bar"
                headerLevel={2}
            >
                <span className="mr-medium"><b>UP NEXT:</b> Implement global rules for rental aggulative stacks and make it generalized </span>
                <div>
                    <button onClick={() => setData(dataSingletonMock)}>Singleton Mock</button>
                    <button onClick={() => setData(dataSingletonRobot)}>Singleton Robots</button>
                    <button onClick={() => setData(dataFreeformMatrix)}>Freeform Matrix Mock</button>
                    <button onClick={() => setData(dataAggulativeStacks)}>Aggulative Stacks Mock</button>
                    <button onClick={() => setData(dataAggulativeStacksRental)}>Aggulative Stacks Rental</button>
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
                                    <p>Workspace is a "hardcoded" grid (column count, row count, size is constant)</p>
                                    <p>All modifiers are not applied to all items</p>
                                    <p>Each item has it's own configuration</p>
                                    <p>No constrictions on where items can be placed</p>
                                </div>
                                <div className='pr-large'>
                                    <u>WORKSPACE C - BUILDER</u>
                                    <p>Allows multiple stacked items in workspace</p>
                                    <p>Workspace is constricted by rules of builder (number of stacks, stack height, size of units/ "grid" squares)</p>
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
                        <p>Goal: allow a given product with a given productId to have multiple "looks"</p>
                        <p>Goal: Allow api to decide presentation of the modifier component.</p>
                        <p>Goal: Allow api to decide presentation of the workspace component</p>
                        <p>Goal: Make MobX model agnostic of configuration</p>
                        <p>Goal: Shallow update (do not effect browser's history) url on config change</p>
                        <p>Goal: Include error handling</p>
                        <ul>
                            <li>input radio checks if all ids are unique, if not provide error handling (create unique ids and provide console.warn?)</li>
                            <li>what if a display is not provided for modifier</li>
                        </ul>
                    </BasicAccordion>
            </BasicAccordion>
        </div>
    )
};

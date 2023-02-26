import Head from 'next/head'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { BuildYourOwnPage } from '-/page-components/build-your-own/build-your-own-page'
import { BasicAccordion } from '-/Components/accordion/basic-accordion'
import { shapeModifiers } from '-/data/freeformMatrix/shapeModifiers.data'
import { generateImage } from '-/Components/DnD/workspace/freeformMatrix/freeformMatrix.util'
// MOCK DATA IMPORTS
import { mockModifierA, mockModifierB, mockModifierC, mockModifierD, mockModifierE } from '-/data/testingMocks/mockModifiers.data'
import { robotModifiers } from '-/data/robots/robotModifiers.data'
import { matrixMock } from '-/data/freeformMatrix/matrix.data'
import { builderMock1 } from '-/data/builderMatrix/builder.data'

// mock data
// const data = {
//     modifiers: [mockModifierA, mockModifierB, mockModifierC, mockModifierD, mockModifierE],
// }

// robot SINGLETON data
// const data = {
//     modifiers: robotModifiers,
// }

// FREEFORM MATRIX data
// const data = {
//     modifiers: shapeModifiers, 
//     matrix: matrixMock
// }

// BUILDER data
const data = {
    modifiers: shapeModifiers, 
    builder: builderMock1,
}

const BuildYourOwn = () => {
    // K-TODO: do this data massaging in getServerSideProps (if that is the method you choose for getting data)
    const model = new BuildYourOwnModel({
        config: data.modifiers.map(mod => ({ id: mod.id, selection: mod.options[0].id })),
        matrix: data?.matrix?.map(r => r.map(i => {
            if(i.piece?.config) i.piece.image = generateImage(i.piece.config, data.modifiers)
            return i;
        })),
    });
    return (
        <>
            <Head>
                <title>Custom Quilt Builder</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <span className="mr-medium"><b>UP NEXT:</b> Create Grid in Workspace Using React DnD </span>
            <div className="flex a-i-center">
                <div className="flex">
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
                </div>
            </div>
            <BuildYourOwnPage model={model} modifiers={data.modifiers} />
        </>
    )
};

export default BuildYourOwn;

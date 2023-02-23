import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { ModalTrigger } from '../modal/modalTrigger'
import { mouseButtonClickT } from '-/util/interactionTyping'
import { Select } from '../form-controls/select'
import { noop } from '-/util/helpers'
import { matrixIndexCoordinatesI } from '-/page-components/build-your-own/build-your-own.util'

export interface AddModalOnClickI {event: mouseButtonClickT, matrixIndex: matrixIndexCoordinatesI}
interface propsI {
    image: JSX.Element,
    onSubmit: ({event, matrixIndex}: AddModalOnClickI) => void,
    // optional
    onCancel?: ({event, matrixIndex}: AddModalOnClickI) => void,
}

const defaultMatrixIndex = {row: '0', column: '0'};
const selectOptions = [{id: '0', text: '0'}, {id: '1', text: '1'}, {id: '2', text: '2'}, {id: '3', text: '3'}];
const convertStringIndex = (matrixIndex: {row: string, column: string}) => ({row: parseInt(matrixIndex.row), column: parseInt(matrixIndex.column)})

export const AddModal = observer(({ image, onSubmit, onCancel=noop}: propsI) => {
    const [matrixIndex, setMatrixIndex] = useState(defaultMatrixIndex); 
    const submit = (event: mouseButtonClickT) => {
        onSubmit({event, matrixIndex: convertStringIndex(matrixIndex)});
        setMatrixIndex(defaultMatrixIndex);
    };
    const cancel = (event: mouseButtonClickT) => {
        onCancel({event, matrixIndex: convertStringIndex(matrixIndex)});
        setMatrixIndex(defaultMatrixIndex);
    };
    return <ModalTrigger
        triggerConfig={{
            text: 'Add to workspace',
        }}
        modalConfig={{
            header: { content: 'Add Piece to Workspace' },
            body: <div>
                <div>{image}</div>
                <Select
                    id="row"
                    label="Row"
                    options={selectOptions.map(o => ({...o, selected: o.id === matrixIndex.row}))}
                    onChange={({ newSelection }) => setMatrixIndex({row: newSelection, column:matrixIndex.column})}
                />
                <Select
                    id="column"
                    label="Column"
                    options={selectOptions.map(o => ({...o, selected: o.id === matrixIndex.column}))}
                    onChange={({ newSelection }) => setMatrixIndex({row: matrixIndex.row, column: newSelection})}
                />  
            </div>,
            footer: {buttons: [
                { text: 'Cancel', onClick: cancel },
                { text: 'Ok', onClick: submit }
            ]}
        }}

    />
})

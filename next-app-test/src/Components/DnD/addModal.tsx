import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { matrixIndexI } from '-/Components/DnD/workspace.util'
import { ModalTrigger } from '../modal/modalTrigger'
import { TextInput } from '../form-controls/text-input'

import { mouseButtonClickT } from '-/util/interactionTyping'

export interface AddModalOnClickI {event: mouseButtonClickT, matrixIndex: matrixIndexI}

interface propsI {
    image: JSX.Element,
    onSubmit: ({event, matrixIndex}: AddModalOnClickI) => void,
    // optional
    onCancel?: ({event, matrixIndex}: AddModalOnClickI) => void,
}

export const AddModal = observer(({ image, onCancel, onSubmit }: propsI) => {
    const [row, setRow] = useState('0');
    const [column, setColumn] = useState('0');
    const matrixIndex = {row: parseInt(row), column: parseInt(column)};
    return <ModalTrigger
        triggerConfig={{
            text: 'Add to workspace',
        }}
        modalConfig={{
            header: { content: 'Add Piece to Workspace' },
            body: <div>
                <div>{image}</div>
                <TextInput id="row" label="Row" onChange={({ newValue }) => setRow(newValue)} />
                <TextInput id="column" label="Column" onChange={({ newValue }) => setColumn(newValue)} />
            </div>,
            footer: {buttons: [
                { text: 'Cancel', ...onCancel && {onClick: (event) => onCancel({event, matrixIndex})} },
                { text: 'Ok', ...onSubmit && {onClick: (event) => onSubmit({event, matrixIndex})} }
            ]}
        }}

    />
})

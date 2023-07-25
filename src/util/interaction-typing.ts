export type mouseClickT = React.MouseEvent<any, MouseEvent>
export type keyboardEventT = React.KeyboardEvent<any> | KeyboardEvent
export type inclusiveClickEventT = mouseClickT | keyboardEventT
export enum closeButtons {
    standard = 'standard',
    cancel = 'cancel',
    ex = 'ex',
}

export const closeButtonContent = {
    [closeButtons.standard]: <>Close</>,
    [closeButtons.cancel]: <>Cancel</>,
    // TODO: ex accessibility - add screen reader text
    [closeButtons.ex]: <span>
        <span className="visually-hidden">Close</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 256 256"><path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"/></svg>
    </span>}
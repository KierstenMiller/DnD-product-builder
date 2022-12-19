import classNames from "classnames";

interface props {
    children: React.ReactNode; // TODO: can I type it to be just an accordion component / array of accordion components
    className?: string;
}

export const BasicAccordionGroup = ({children, className}: props) => {
    // TODO: implement grouped accordions keyboard input management
    return (
        <div className={classNames(`basic-accordion-group`, className && className)}>
            {children}
        </div>
    )
}
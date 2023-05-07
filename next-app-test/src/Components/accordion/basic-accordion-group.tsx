import classNames from "classnames";

interface props {
    children: React.ReactNode;
    className?: string;
}

export const BasicAccordionGroup = ({children, className}: props) => {
    return (
        <div className={classNames(`basic-accordion-group`, className && className)}>
            {children}
        </div>
    )
}
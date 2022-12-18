import classNames from "classnames";
import { useCallback, useState } from "react";

type headerLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';

interface Props {
    children: React.ReactNode; 
    headerText: string;
    headerLevel: headerLevel;
    id: string;
    // optional
    className?: string;
    drawerOpen?: boolean;
    disableCollapse?: boolean;
}

interface HeaderProps {
    headerLevel: headerLevel;
    children: React.ReactNode; // why ReactNode is the best for children https://www.arahansen.com/how-children-types-work-in-react-18-and-typescript-4/
}

const HeaderElement = ({headerLevel, children}: HeaderProps) => {
    switch (headerLevel) {
        case 1:
            return <h1 className="accordion-trigger-container">{children}</h1>
        case 2:
            return <h2 className="accordion-trigger-container">{children}</h2>
        case 3:
            return <h3 className="accordion-trigger-container">{children}</h3>
        case 4:
            return <h4 className="accordion-trigger-container">{children}</h4>
        case 5:
            return <h5 className="accordion-trigger-container">{children}</h5>
        case 6:
            return <h6 className="accordion-trigger-container">{children}</h6>
        default: throw new Error('Please provide valid header level (1-6)')     
    }
}

export const BasicAccordion = (
    {id, headerText, headerLevel, className, drawerOpen=false, disableCollapse=false, children}: Props
) => {
    const [isOpen, setIsOpen] = useState(drawerOpen || disableCollapse);
    const toggleDrawerVisibility = useCallback(() => {
        if(!disableCollapse) {
            setIsOpen(value => !value);
        }
    }, [])
    return (
        <div className={classNames('basic-accordion', isOpen ? 'open' : 'closed', className && className)}>
            <HeaderElement headerLevel={headerLevel}>
                <button
                    aria-expanded={isOpen}
                    className={`accordion-trigger h${headerLevel}`}
                    aria-controls={`${id}-content`}
                    aria-disabled={disableCollapse}
                    id={id}
                    onClick={toggleDrawerVisibility}       
                >
                    {headerText}
                    {!disableCollapse && !isOpen && <span className="glyphicon glyphicon-chevron-down">closedIcon</span>}
                    {!disableCollapse && isOpen && <span className="glyphicon glyphicon-chevron-up">openIcon</span>}
                </button>
            </HeaderElement>
            <div
                id={`${}-content`}
                role="region"
                aria-labelledby={id}
                // including "display-none" css and the "hidden" attribute for older browsers. They do the same thing but it's good to have both
                className={classNames('accordion-panel', !isOpen && 'hidden')}
                hidden={!isOpen}
            >
                {children}
            </div>
        </div>
    )
}
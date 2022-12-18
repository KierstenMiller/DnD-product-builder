import { useCallback } from "react";

type headerLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';

interface Props {
    headerText: string;
    headerLevel: headerLevel;
    id: string;
    className?: string;
    drawerOpen?: boolean;
    disableCollapse?: boolean;
}

interface HeaderProps {
    headerLevel: number;
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

export const BasicAccordion = () => {
    return <>Todo: Hubby wants to watch tv</>
}
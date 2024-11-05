import React, { useState } from 'react'

import { Header, headerLevelT } from '../atoms/header/header'

interface Props {
    id: string,
    heading: { text: string, level: headerLevelT }
    tabs: Array<{ id: string, isSelected: boolean, tabButton: React.ReactNode, tabPanel: React.ReactNode }>
}

export const TabList = ({
    id,
    heading,
    tabs
}: Props) => {
    // const theme = useContext(ThemeContext)
    const [selectedTabId, setSelectedTab] = useState(tabs.find(tab => tab.isSelected)?.id || tabs[0].id);
    // TODO: Add keyboard navigation and other accessibility features
    // https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/
    return <div>
        <div className="tabs">
            {heading && <Header id={`tablist-heading-${id}`} headerLevel={heading.level}>{heading.text}</Header>}
            <div role="tablist" aria-labelledby={`tablist-heading-${id}`}>
                {tabs.map(tab => <button
                    id={`tab-button-${tab.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selectedTabId === tab.id}
                    aria-controls={`tab-panel-${tab.id}`}
                    tabIndex={selectedTabId === tab.id ? 0 : -1}
                    onClick={() => setSelectedTab(tab.id)}
                >
                    {tab.tabButton}
                </button>)}
            </div>
            {tabs.map(tab => <div
                id={`tab-panel-${tab.id}`}
                role="tabpanel"
                tabIndex={0}
                aria-labelledby={`tab-button-${tab.id}`}
                className={selectedTabId === tab.id ? '' : 'hidden'}
            >
                {tab.tabPanel}
            </div>)}
        </div>
    </div>
}

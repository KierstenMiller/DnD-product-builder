import React, { useState } from 'react'

import type { headerLevelT } from '../atoms/header/header'
import { Header } from '../atoms/header/header'

interface Props {
  id: string
  heading: { text: string, level: headerLevelT }
  tabs: Array<{ id: string, isSelected: boolean, tabButton: React.ReactNode, tabPanel: React.ReactNode }>
}

export const TabList = ({
  id,
  heading,
  tabs
}: Props) => {
  // const theme = useContext(ThemeContext)
  const [selectedTabId, setSelectedTab] = useState(tabs.find(tab => tab.isSelected)?.id ?? tabs[0].id)
  const tabRefs = React.useRef<HTMLButtonElement[]>([])
  // TODO: Add keyboard navigation and other accessibility features
  // https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/
  // https://amanexplains.com/how-to-create-an-accessible-tabs-component-in-react/
  // https://dev.to/eevajonnapanula/keyboard-accessible-tabs-with-react-5ch4

  const handleKeyDown = (newSelectionId: string, newSelectionIndex: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
    console.log('handleKeyDown', newSelectionId)
    const tab = tabRefs.current[newSelectionIndex]
    if (tab) {
      // focus() will call the state setter
      // to display the associated tabpanel
      tab.focus()
    }
    setSelectedTab(newSelectionId)
    event.preventDefault()
  }

  const onKeyDown = (selectedIndex: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowRight':
        handleKeyDown(tabs[selectedIndex + 1]?.id, selectedIndex + 1, event)
        break
      case 'ArrowLeft':
        handleKeyDown(tabs[selectedIndex - 1]?.id, selectedIndex - 1, event)
        break
      case 'Home':
        handleKeyDown(tabs[0]?.id, 0, event)
        break
      case 'End':
        handleKeyDown(tabs[tabs.length - 1]?.id, tabs.length - 1, event)
        break
    }
  }

  return <div>
    <div className="tabs">
      Selected: {selectedTabId}
      {heading && <Header id={`tablist-heading-${id}`} headerLevel={heading.level}>{heading.text}</Header>}
      <div role="tablist" aria-labelledby={`tablist-heading-${id}`}>
        {tabs.map((tab, index) => <button
          key={tab.id}
          id={`tab-button-${tab.id}`}
          type="button"
          role="tab"
          ref={(element: HTMLButtonElement) => (tabRefs.current[index] = element)}
          aria-selected={selectedTabId === tab.id}
          aria-controls={`tab-panel-${tab.id}`}
          tabIndex={selectedTabId === tab.id ? 0 : -1}
          onFocus={() => { setSelectedTab(tab.id) }}
          onClick={() => { setSelectedTab(tab.id) }}
          onKeyDown={(e) => { onKeyDown(index, e) }}
        >
          {tab.tabButton} - {index}
        </button>)}
      </div>
      {tabs.map(tab => <div
        key={`tab-panel-${tab.id}`}
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

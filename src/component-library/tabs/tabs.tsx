import React, { useContext, useState } from 'react'

import { ThemeContext } from '-/build-your-own/page-layout/build-your-own-page'
import { getStyles } from '-/util-library/helpers'
import type { headerLevelT } from '../atoms/header/header'
import { Header } from '../atoms/header/header'

import classNames from 'classnames'
import defaultStyles from './tabs.module.scss'

// Implementation reference:
// https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/

interface Props {
  testId?: string
  id: string
  heading: { text: string, level: headerLevelT }
  tabs: Array<{ id: string, isSelected: boolean, tabButton: React.ReactNode, tabPanel: React.ReactNode }>
}

export const TabList = ({
  testId,
  id,
  heading,
  tabs
}: Props) => {
  const theme = useContext(ThemeContext)
  const styles = (id: string) => getStyles(defaultStyles, theme, id)
  const [selectedTabId, setSelectedTab] = useState(tabs.find(tab => tab.isSelected)?.id ?? tabs[0].id)
  const tabRefs = React.useRef<HTMLButtonElement[]>([])

  const handleKeyDown = (newSelectionId: string, newSelectionIndex: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
    tabRefs.current[newSelectionIndex]?.focus()
    setSelectedTab(newSelectionId)
    event.preventDefault()
  }

  const onKeyDown = (selectedIndex: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowRight': {
        const nextTabID = tabs[selectedIndex + 1]?.id
        handleKeyDown(nextTabID || tabs[0].id, nextTabID ? (selectedIndex + 1) : 0, event) // if there is no next tab, go to the first tab
        break
      }
      case 'ArrowLeft': {
        const prevTabID = tabs[selectedIndex - 1]?.id
        const lastTabIndex = tabs.length - 1
        handleKeyDown(prevTabID || tabs[lastTabIndex].id, prevTabID ? (selectedIndex - 1) : lastTabIndex, event) // if there is no prev tab, go to the last tab
        break
      }
      case 'Home':
        handleKeyDown(tabs[0]?.id, 0, event)
        break
      case 'End':
        handleKeyDown(tabs[tabs.length - 1]?.id, tabs.length - 1, event)
        break
    }
  }

  return <div data-testid={testId} className={styles('tabs-container')}>
    {heading && <Header testId="tablist-heading" className={styles('tabs-header')} id={`tablist-heading-${id}`} headerLevel={heading.level}>{heading.text}</Header>}
    <div data-testid="tablist-buttons-container" className={styles('tabs-buttons-container')} role="tablist" aria-labelledby={`tablist-heading-${id}`}>
      {tabs.map((tab, index) => <button
        data-testid={`tab-button-${tab.id}`}
        className={styles('tabs-button')}
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
      data-testid={`tab-panel-${tab.id}`}
      className={classNames(styles('tabs-panel'), { hidden: selectedTabId !== tab.id })}
      key={`tab-panel-${tab.id}`}
      id={`tab-panel-${tab.id}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-button-${tab.id}`}
    >
      {tab.tabPanel}
    </div>)}
  </div>
}

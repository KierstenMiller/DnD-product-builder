import classNames from 'classnames'
import { useState } from 'react'

import { Header, type headerLevelT } from '-/Components/atoms/header/header'
import { type sassStylesI } from '-/util/typing-util'

import defaultStyles from './basic-accordion-styles.module.scss'

interface Props {
  children: React.ReactNode
  headerText: string
  headerLevel: headerLevelT
  id: string
  // optional
  testId?: string // made optional to prevent DOM bloat
  drawerOpen?: boolean
  disableCollapse?: boolean
  stylesOverride?: sassStylesI
}

// TODO: Make cypress component test
export const BasicAccordion = ({
  id, headerText, headerLevel, testId, drawerOpen = false, disableCollapse = false, children, stylesOverride = {}
}: Props) => {
  const styles = { ...defaultStyles, ...stylesOverride }
  const [isOpen, setIsOpen] = useState(drawerOpen || disableCollapse)
  const toggleDrawerVisibility = () => { !disableCollapse && setIsOpen(!isOpen) }
  return <div data-testid={testId} className={styles.container}>
        <Header headerLevel={headerLevel} className={styles.accordionTriggerContainer}>
            <button
                aria-expanded={isOpen}
                className={`${styles.accordionTrigger} h${headerLevel}`}
                aria-controls={`${id}-content`}
                aria-disabled={disableCollapse}
                id={id}
                onClick={toggleDrawerVisibility}
            >
                {headerText}{' '}
                {!disableCollapse && <span className={styles.arrowContainer}>
                    <span className={classNames(defaultStyles.arrow, isOpen ? defaultStyles.up : defaultStyles.down)} />
                </span>}
            </button>
        </Header>
        <div
            id={`${id}-content`}
            role="region"
            aria-labelledby={id}
            // // including "display-none" css and the "hidden" attribute for older browsers. They do the same thing but it's good to have both
            className={classNames(styles.accordionContent, !isOpen && defaultStyles.hidden)}
            hidden={!isOpen}
        >
            {children}
        </div>
    </div>
}

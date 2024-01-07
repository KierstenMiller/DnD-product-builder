import classNames from 'classnames'
import { useContext, useState } from 'react'

import { Header, type headerLevelT } from '-/Components/atoms/header/header'

import { ThemeContext } from '-/page-components/build-your-own/build-your-own-page'
import { getStyles } from '-/util/helpers'
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
}

// TODO: Make cypress component test
export const BasicAccordion = ({
  id, headerText, headerLevel, testId, drawerOpen = false, disableCollapse = false, children
}: Props) => {
  const theme = useContext(ThemeContext)
  const styles = (id: string) => getStyles(defaultStyles, theme, id)
  const [isOpen, setIsOpen] = useState(drawerOpen || disableCollapse)
  const toggleDrawerVisibility = () => { !disableCollapse && setIsOpen(!isOpen) }
  return <div data-testid={testId} className={styles('accordionContainer')}>
        <Header headerLevel={headerLevel} className={styles('accordionTriggerContainer')}>
            <button
                aria-expanded={isOpen}
                className={`${styles('accordionTrigger')} h${headerLevel}`}
                aria-controls={`${id}-content`}
                aria-disabled={disableCollapse}
                id={id}
                onClick={toggleDrawerVisibility}
            >
                {headerText}{' '}
                {!disableCollapse && <span className={styles('arrowContainer')}>
                    <span className={classNames(styles('arrow'), isOpen ? styles('up') : styles('down'))} />
                </span>}
            </button>
        </Header>
        <div
            id={`${id}-content`}
            role="region"
            aria-labelledby={id}
            // including "display-none" css and the "hidden" attribute for older browsers. They do the same thing but it's good to have both
            className={classNames(styles('accordionContent'), !isOpen && defaultStyles.hidden)}
            hidden={!isOpen}
        >
            {children}
        </div>
    </div>
}

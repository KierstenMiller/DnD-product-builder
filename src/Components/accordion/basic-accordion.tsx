import classNames from 'classnames'
import { useContext, useState } from 'react'

import { Header, type headerLevelT } from '-/Components/atoms/header/header'
import { ThemeContext } from '-/page-components/build-your-own/build-your-own-page'
import { ConditionalWrapper, getStyles } from '-/util/helpers'
import defaultStyles from './basic-accordion-styles.module.scss'

interface Props {
  children: React.ReactNode
  triggerText: string
  id: string
  // optional
  testId?: string // made optional to prevent DOM bloat
  drawerOpen?: boolean
  disableCollapse?: boolean
  headerLevel?: headerLevelT
  wrapped?: boolean
}

export const BasicAccordion = ({
  id, triggerText: headerText, headerLevel, testId, drawerOpen = false, disableCollapse = false, children, wrapped = true
}: Props) => {
  const theme = useContext(ThemeContext)
  const styles = (id: string) => getStyles(defaultStyles, theme, id)
  const [isOpen, setIsOpen] = useState(drawerOpen || disableCollapse)
  const toggleDrawerVisibility = () => { !disableCollapse && setIsOpen(!isOpen) }
  return <ConditionalWrapper
    condition={wrapped}
    wrapper={children => <div data-testid={testId} className={styles('accordionContainer')}>{children}</div>}
  >
    <>
        <ConditionalWrapper
            condition={Boolean(headerLevel)}
            // Need to provide a fallback for the headerLevel because typescript can't tell headerLevel will always be defined here
            wrapper={children => <Header headerLevel={headerLevel ?? '1'} className={styles('accordionTriggerContainer')}>{children}</Header>}
        >
            <button
                aria-expanded={isOpen}
                className={classNames(styles('accordionTrigger'), { [`h${headerLevel}`]: headerLevel })}
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
        </ ConditionalWrapper>
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
    </>
  </ConditionalWrapper>
}

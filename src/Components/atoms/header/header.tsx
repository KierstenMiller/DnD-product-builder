export type headerLevelT = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'
interface HeaderProps {
  headerLevel: headerLevelT
  children: React.ReactNode
  // optional
  className?: string
  testId?: string
}

export const Header = ({ headerLevel, children, className, testId: rawTestId = '' }: HeaderProps) => {
  const testId = `header-${headerLevel}` + rawTestId
  const props = { className, 'data-testid': testId }
  switch (headerLevel) {
    case 1:
      return <h1 {...props}>{children}</h1>
    case 2:
      return <h2 {...props}>{children}</h2>
    case 3:
      return <h3 {...props}>{children}</h3>
    case 4:
      return <h4 {...props}>{children}</h4>
    case 5:
      return <h5 {...props}>{children}</h5>
    case 6:
      return <h6 {...props}>{children}</h6>
    default: throw new Error('Please provide valid header level (1-6)')
  }
}

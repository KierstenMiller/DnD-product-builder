export type sassStylesI = Readonly<Record<string, string>>
export type functionalComponentT = (((props: any) => JSX.Element) & { displayName: string })

export function Kbd({ children }: React.PropsWithChildren) {
  return (<kbd className="inline-flex w-min align-center whitespace-nowrap">
    { children }
  </kbd>)
}

export default Kbd
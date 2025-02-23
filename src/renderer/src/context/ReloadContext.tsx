import { useContext, useState, createContext } from 'react'

interface ReloadContextType {
  reload: boolean
  setReloadGlobal: () => void
}
const ReloadContext = createContext<ReloadContextType>({
  reload: false,
  setReloadGlobal: () => {}
})
export function ReloadContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [reload, setReload] = useState<boolean>(false)
  const setReloadGlobal = (): void => {
    setReload(!reload)
  }
  return (
    <ReloadContext.Provider value={{ reload, setReloadGlobal }}>{children}</ReloadContext.Provider>
  )
}
export const useReload = (): ReloadContextType => useContext(ReloadContext)

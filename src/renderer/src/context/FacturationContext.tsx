'use client'

import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
import { Facture } from '@renderer/services/Facture'
interface FactureContextProps {
  facturationModalState: boolean
  facture: Facture | undefined
  view: string
  //    setFacturationModalState: (state: boolean) => void
  //    setFacture: (act?: object) => void
  setView: (view: string) => void
  openModal: (view: string, facture?: Facture | undefined) => void
  closeModal: () => void
}

export const FacturationContext = createContext<FactureContextProps>({} as FactureContextProps)

export const FacturationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [facturationModalState, setFacturationModalState] = useState<boolean>(false)
  const [facture, setFacture] = useState<Facture>()
  const [view, setView] = useState<string>('details')

  const closeModal = (): void => {
    setFacturationModalState(false)
  }
  function openModal(view: string = 'details', facture: Facture | undefined): void {
    facture && setFacture(facture)
    setView(view)
    setFacturationModalState(true)
  }

  return (
    <FacturationContext.Provider
      value={{
        view,
        facture,
        facturationModalState,
        openModal,
        closeModal,
        setView
      }}
    >
      {children}
    </FacturationContext.Provider>
  )
}

export function useFacturationContext(): FactureContextProps {
  const context = useContext(FacturationContext)
  if (typeof context === 'undefined') {
    throw new Error('useSidebarContext should be used within the FacturationContext provider!')
  }
  return context
}

'use client'

import { ProduitUniteCategorie } from '@renderer/services/Produit'
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
interface ProductContextProps {
  productModalState: boolean
  produit: ProduitUniteCategorie | undefined
  view: string
  //    setFacturationModalState: (state: boolean) => void
  //    setFacture: (act?: object) => void
  openModal: (view: string, produit?: ProduitUniteCategorie) => void
  closeModal: () => void
}

export const ProductContext = createContext<ProductContextProps>({} as ProductContextProps)

export const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
  const [productModalState, setProductModalState] = useState(false)
  const [produit, setProduit] = useState<ProduitUniteCategorie>() //explain this line ?
  const [view, setView] = useState<string>('')

  const closeModal = (): void => {
    setProductModalState(false)
  }
  const openModal = (view: string = 'details', produit?: ProduitUniteCategorie): void => {
    produit && setProduit(produit)
    setView(view)
    setProductModalState(true)
  }

  return (
    <ProductContext.Provider
      value={{
        produit,
        productModalState,
        openModal,
        closeModal,
        view
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext(): ProductContextProps {
  const context = useContext(ProductContext)
  if (typeof context === 'undefined') {
    throw new Error('useProductContext should be used within the ProductContext provider!')
  }
  return context
}

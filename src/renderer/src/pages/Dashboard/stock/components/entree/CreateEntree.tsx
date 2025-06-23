import { useState } from 'react'
import { ProduitUniteCategorie } from '@renderer/services/Produit'
import CreateEntreeForm from './components/CreateEntreeForm'
import SelectProduct from './components/SelectProductComponent'

export default function CreateEntree({ closeModal }: { closeModal: () => void }): JSX.Element {
  const [selectedProduit, setSelectedProduit] = useState<ProduitUniteCategorie | undefined>(
    undefined
  )

  if (selectedProduit) {
    return <CreateEntreeForm produit={selectedProduit} closeModal={closeModal} />
  } else {
    return <SelectProduct setSelectProduit={setSelectedProduit} />
  }
}

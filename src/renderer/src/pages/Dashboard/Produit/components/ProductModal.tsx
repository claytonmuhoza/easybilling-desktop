import { Modal, ModalBody } from 'flowbite-react'
import { useState } from 'react'
import CreateInventaireForm from '../../stock/components/inventaire/components/CreateInventaireForm'
import CreateSortieForm from '../../stock/components/sortie/components/CreateSortieForm'
import CreateProduct from './CreateProduct'
import EditProduct from './EditProduct'
import ShowProduct from './ShowProduct'
import { useProductContext } from '@renderer/context/ProductContext'
import CreateEntreeForm from '../../stock/components/entree/components/CreateEntreeForm'

export default function ProductModal(): JSX.Element {
  const { productModalState, closeModal, view, produit } = useProductContext()
  const [action, setAction] = useState('')
  return (
    <Modal
      size={'6xl'}
      onClose={closeModal}
      show={productModalState}
      popup
      className="max-h-screen bg-dark"
    >
      {/* <ModalHeader> */}
      <Modal.Header className="rounded-t-md border-b p-3 dark:border-gray-800 dark:bg-gray-700 md:p-4">
        <span className="capitalise mt-2 pl-6 text-center font-semibold">
          {view === 'create'
            ? 'Créer un produit ou service'
            : view === 'edit'
              ? 'Modifier produit ou service'
              : action === 'enter'
                ? 'Entrer de stock'
                : action === 'sortie'
                  ? 'Sortie de stock'
                  : action === 'inventaire'
                    ? 'Inventaire de stock'
                    : view}
        </span>
      </Modal.Header>
      {/* </ModalHeader> */}
      <ModalBody className="min-h-[80vh] overflow-y-auto rounded-b-md dark:bg-gray-800">
        {view === 'create' && <CreateProduct />}
        {view === 'details' && produit ? (
          action === 'entrer' ? (
            <CreateEntreeForm produit={produit} closeModal={closeModal} />
          ) : action === 'sortie' ? (
            <CreateSortieForm produit={produit} closeModal={closeModal} />
          ) : action === 'inventaire' ? (
            <CreateInventaireForm produit={produit} closeModal={closeModal} />
          ) : (
            <ShowProduct setAction={setAction} />
          )
        ) : (
          <></>
        )}
        {view === 'edit' && produit ? <EditProduct produit={produit} /> : <></>}
      </ModalBody>
      {/* <Modal.Footer>oklm</Modal.Footer> */}
    </Modal>
  )
}

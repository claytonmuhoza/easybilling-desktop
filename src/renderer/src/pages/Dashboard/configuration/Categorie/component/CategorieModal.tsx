import { useCategorieContext } from '@renderer/context/CategorieContext'
import { Modal, ModalBody } from 'flowbite-react'
import CreateCategorie from './CreateCategorie'
import EditCategorie from './EditCategorie'

export default function CategorieModal(): JSX.Element {
  const { categorieModalState, closeModal, view, categorie } = useCategorieContext()

  return (
    <Modal
      size={'3xl'}
      onClose={closeModal}
      show={categorieModalState}
      popup
      className="max-h-screen bg-dark"
    >
      {/* <ModalHeader> */}
      <Modal.Header className="rounded-t-md border-b p-3 dark:border-gray-800 dark:bg-gray-700 md:p-4">
        <span className="capitalise mt-2 pl-6 text-center font-semibold">
          {view + ' Categorie'}
        </span>
      </Modal.Header>
      {/* </ModalHeader> */}
      <ModalBody className="min-h- overflow-y-auto rounded-b-md dark:bg-gray-800">
        {view === 'create' && <CreateCategorie />}
        {/* {view === 'details' && <ShowClient />} */}
        {view === 'edit' && categorie ? <EditCategorie categorie={categorie} /> : <></>}
      </ModalBody>
      {/* <Modal.Footer>oklm</Modal.Footer> */}
    </Modal>
  )
}

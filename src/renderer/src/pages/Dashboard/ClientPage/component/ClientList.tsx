import { useClientContext } from '@renderer/context/ClientContext'
import { Client } from '@renderer/services/Client'
import { Pagination, Spinner, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import { BtnCreate, BtnRefresh, SearchBar } from '@renderer/components/Utils'
import ClientModal from './ClientModal'
import clientService from '@renderer/services/ClientService'

interface ClientListProps {
  minimal: boolean
  getClient?: (c: Client) => void
}

export default function ClientsList({ minimal = false, getClient }: ClientListProps): JSX.Element {
  const [page, setPage] = useState(1)
  const pageSize = 20
  const [totalClients, setTotalClients] = useState(0)
  const totalPages = Math.ceil(totalClients / pageSize)

  const [error] = useState(false)
  const [searchWord, setSearchWord] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<Client[]>([])
  const { alphabetic, clientModalState, openModal } = useClientContext()

  const handdleSearch = (e: React.FormEvent<HTMLInputElement>): void => {
    const word = e.currentTarget.value

    setSearchWord(word)
  }

  const orderbyName = alphabetic ? true : minimal
  
  useEffect(() => {
    setLoading(true)
    clientService.total().then((total) => setTotalClients(total))
    clientService
      .getAllClientsPagine(page)
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }, [page,openModal, searchWord, minimal, orderbyName])
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="justify- flex flex-col items-center gap-2 rounded bg-white p-2 dark:bg-gray-800 sm:flex-row  sm:gap-4 ">
        <div className="justify- flex flex-row items-center gap-2 sm:gap-4 sm-max:w-full">
          <>
            <BtnRefresh />
            <BtnCreate name="Nouveau Client" onClick={() => openModal('create')} />
          </>
        </div>
        <SearchBar handdleSearch={handdleSearch} className="w-full flex-1 " title="Client" />
        {/*<Datepicker onSelectedDateChanged={(e) => changeDate(e)} /> */}
      </div>

      <div className="overflow-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>NIF du Client</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Nom du Client (Raison SocialE)</Table.HeadCell>
            <Table.HeadCell>Assujeti TVA</Table.HeadCell>
            <Table.HeadCell>Contact</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {isLoading ? (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                // key={facture.id + 'factures'}
              >
                <Table.Cell
                  colSpan={6}
                  // onClick={() => changefacture(facture)}
                  className="cursor-pointer  text-center font-medium text-gray-900 dark:text-red-500"
                >
                  <Spinner />
                </Table.Cell>
              </Table.Row>
            ) : (
              data?.map((item) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                  key={item.id}
                >
                  <Table.Cell
                    onClick={() => {
                      getClient ? getClient(item) : openModal('details', item)
                    }}
                    aria-controls="facture"
                    aria-expanded
                    className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                  >
                    {item.NIF}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => {
                      getClient ? getClient(item) : openModal('details', item)
                    }}
                    aria-controls="facture"
                    aria-expanded
                    className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                  >
                    {item.type_personne}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => {
                      getClient ? getClient(item) : openModal('details', item)
                    }}
                    className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                  >
                    {item.nom}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => {
                      getClient ? getClient(item) : openModal('details', item)
                    }}
                    className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                  >
                    {item.assujetti_tva ? 'OUI' : 'NON'}
                  </Table.Cell>

                  <Table.Cell
                    onClick={() => {
                      getClient ? getClient(item) : openModal('details', item)
                    }}
                    className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                  >
                    {item.client_telephone}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row items-center gap-2">
                      <button
                        className="bg-transparent  text-3 dark:bg-transparent"
                        onClick={() => openModal('edit', item)}
                      >
                        <HiPencil className="cursor-pointer text-6 text-blue-600" />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
            {!isLoading && data.length < 1 && (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                // key={facture.id + 'factures'}
              >
                <Table.Cell
                  colSpan={6}
                  // onClick={() => changefacture(facture)}
                  className="cursor-pointer  text-center font-medium text-gray-900 dark:text-red-500"
                >
                  {error ? (
                    <span>Please check your internet connexion...</span>
                  ) : (
                    'Pas encore de client enregister'
                  )}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        ></Pagination>
      </div>
      {clientModalState === true && <ClientModal />}
    </div>
  )
}

import { Spinner, Table, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import ProductModal from './ProductModal'
import { ProduitUniteCategorie } from '@renderer/services/Produit'
import { useProductContext } from '@renderer/context/ProductContext'
import { BtnBack, BtnCreate, BtnRefresh, SearchBar } from '@renderer/components/Utils'

interface ClientListProps {
  minimal?: boolean
}
export default function ProductList({ minimal = false }: ClientListProps): JSX.Element {
  const [error] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [data] = useState<ProduitUniteCategorie[]>([])
  const { productModalState, openModal } = useProductContext()
  useEffect(() => {
    // get_article_action()
    //   .then((data) => {
    //     setData(data)
    setLoading(false)
    //   })
    //   .catch(() => setLoading(false))
  }, [productModalState])
  const handdleSearch = (e: React.FormEvent<HTMLInputElement>): void => {
    const word = e.currentTarget.value
    console.log(word)
    // // get_article_action(word).then((data) => {
    // //   setData(data)
    // //   setLoading(false)
    // // })
  }

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="justify- flex flex-col items-center gap-2 rounded bg-white p-2 dark:bg-gray-800 sm:flex-row  sm:gap-4 ">
        <div className="justify- flex flex-row items-center gap-2 sm:gap-4 sm-max:w-full">
          <>
            {!minimal && <BtnBack />}
            <BtnRefresh />
            <BtnCreate name="Nouveau produit ou service" onClick={() => openModal('create')} />
          </>
        </div>
        <SearchBar
          handdleSearch={handdleSearch}
          className="w-full flex-1 "
          title="produit ou service"
        />
        {/*<Datepicker onSelectedDateChanged={(e) => changeDate(e)} /> */}
      </div>

      {
        <div className="overflow-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Nom produit</Table.HeadCell>
              <Table.HeadCell>Quantité</Table.HeadCell>
              <Table.HeadCell>Categorie</Table.HeadCell>
              <Table.HeadCell>Taux tva</Table.HeadCell>
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
                    className="cursor-pointer whitespace-nowrap text-center font-medium text-gray-900 dark:text-red-500"
                  >
                    <Spinner />
                  </Table.Cell>
                </Table.Row>
              ) : (
                data?.map((item) => (
                  <Table.Row
                    className={`${
                      item.stock_minimal_alerte >= item.stock_actuel && item.est_stockable
                        ? 'bg-red-400 dark:bg-red-400'
                        : 'bg-white dark:bg-gray-800 '
                    } dark:border-gray-700 `}
                    key={item.id}
                  >
                    <Table.Cell
                      aria-controls="facture"
                      aria-expanded
                      onClick={() => {
                        openModal('details', item)
                      }}
                      className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                    >
                      {item.nom}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => {
                        openModal('details', item)
                      }}
                      className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                    >
                      {item.est_stockable
                        ? item.stock_actuel + ' ' + item.unite_mesure?.libelle + '(s)'
                        : 'non stockable'}
                    </Table.Cell>

                    <Table.Cell
                      onClick={() => {
                        openModal('details', item)
                      }}
                      className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                    >
                      {item.categorie.libelle}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => {
                        openModal('details', item)
                      }}
                      className="cursor-pointer  font-medium text-gray-900 dark:text-white"
                    >
                      {/* {item.tva + '%'} */}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-row items-center gap-2">
                        <button
                          onClick={() => {
                            openModal('edit', item)
                          }}
                        >
                          <Tooltip
                            className="text-3"
                            content={'modifier'}
                            placement="top"
                            style="auto"
                          >
                            <HiPencil
                              // onClick={() =>
                              //    openFormEditModal(facture)
                              // }
                              className="cursor-pointer text-6 text-blue-600"
                            />
                          </Tooltip>
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
                    className="cursor-pointer whitespace-nowrap text-center font-medium text-gray-900 dark:text-red-500"
                  >
                    {error ? (
                      <span>Please check your internet connexion...</span>
                    ) : (
                      'Pas de produit'
                    )}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      }
      {productModalState === true && <ProductModal />}
    </div>
  )
}

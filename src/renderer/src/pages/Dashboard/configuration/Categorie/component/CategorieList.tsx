import { useCategorieContext } from '@renderer/context/CategorieContext'
import { Categorie } from '@renderer/services/Categorie'
import { Spinner, Table, Tooltip } from 'flowbite-react'
import { FormEvent, useEffect, useState } from 'react'
import { HiPencil } from 'react-icons/hi'
import { BtnCreate, BtnRefresh, SearchBar } from '@renderer/components/Utils'
import { categorieService } from '@renderer/services/CategorieServices'

export default function CategorieList(): JSX.Element {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [data, setData] = useState<Categorie[]>([])
  const [loadingCategorie, setLoadingCategorie] = useState(true)
  const { categorieModalState, openModal } = useCategorieContext()
  const [error] = useState(false)
  useEffect(() => {
    setLoadingCategorie(true)
    categorieService
      .getAll()
      .then((data): void => {
        setData(data)
        setCategories(data)
        setLoadingCategorie(false)
      })
      .catch((err) => console.log(err))
  }, [categorieModalState])

  const handdleSearch = (e: FormEvent<HTMLInputElement>): void => {
    const word = e.currentTarget.value

    word.length > 3
      ? setData(
          categories.filter(({ libelle }) => {
            return libelle?.toLowerCase().includes(word.toLowerCase())
          })
        )
      : setData(categories)
  }

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="justify- flex flex-col items-center gap-2 rounded bg-white p-2 dark:bg-gray-800 sm:flex-row  sm:gap-4 ">
        <div className="justify- flex flex-row items-center gap-2 sm:gap-4 sm-max:w-full">
          <>
            <BtnRefresh />
            <BtnCreate name="Nouvelle Categorie" onClick={() => openModal('create')} />
          </>
        </div>
        <SearchBar handdleSearch={handdleSearch} className="w-full flex-1 " title="une Categorie" />
        {/*<Datepicker onSelectedDateChanged={(e) => changeDate(e)} /> */}
      </div>

      <div className="h-[70vh] overflow-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Nom de la Categorie</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {loadingCategorie && (
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
            )}
            {data?.map((item) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                key={item.id + 'cats' + Math.floor(Math.random() * 1200).toString()}
              >
                <Table.Cell
                  aria-controls="facture"
                  aria-expanded
                  onClick={() => {
                    openModal('details', item)
                  }}
                  className="cursor-pointer whitespace-nowrap font-medium text-gray-900 dark:text-white"
                >
                  {item.libelle}
                </Table.Cell>

                <Table.Cell>
                  <div className="flex flex-row items-center gap-2">
                    <button className="bg-transparent" onClick={() => openModal('edit', item)}>
                      <Tooltip className="text-3" content={'Modifier'} placement="top" style="auto">
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
            ))}
            {!loadingCategorie && data.length < 1 && (
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
                    'Pas de categorie existant pour le moment, créer une!'
                  )}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

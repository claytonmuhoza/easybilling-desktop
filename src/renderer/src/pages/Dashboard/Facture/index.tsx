import { Pagination } from 'flowbite-react'
import FactureItemList from './component/FactureItemList'
import { BtnCreate, BtnRefresh, SearchBar } from '@renderer/components/Utils'

export default function FacturePage(): JSX.Element {
  const handdleSearch = (e: React.FormEvent<HTMLInputElement>): void => {
    const word = e.currentTarget.value
    console.log(word)
  }
  return (
    <div>
      <div className="justify- flex flex-col items-center gap-2 rounded bg-white p-2 dark:bg-gray-800 sm:flex-row  sm:gap-4 ">
        <div className="justify- flex flex-row items-center gap-2 sm:gap-4 sm-max:w-full">
          <>
            <BtnRefresh />
            <BtnCreate name="Nouvelle Facture" onClick={() => {}} />
          </>
        </div>
        <SearchBar handdleSearch={handdleSearch} className="w-full flex-1 " title="Facture" />
      </div>
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <FactureItemList />
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={1}
          totalPages={2}
          onPageChange={(page) => console.log(page)}
          showIcons
        />
      </div>
    </div>
  )
}

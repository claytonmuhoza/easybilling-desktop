import { Pagination } from 'flowbite-react'
import FactureItemList from './component/FactureItemList'

export default function FacturePage(): JSX.Element {
  return (
    <div>
      <h1>Facture</h1>
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

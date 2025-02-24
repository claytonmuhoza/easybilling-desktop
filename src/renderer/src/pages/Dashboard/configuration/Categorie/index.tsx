import { useCategorieContext } from '@renderer/context/CategorieContext'
import CategorieList from './component/CategorieList'
import CategorieModal from './component/CategorieModal'
// import CategorieModal from './component/CategorieModal'

const CategoriePage = (): JSX.Element => {
  const { categorieModalState } = useCategorieContext()
  console.log(categorieModalState)

  return (
    <>
      <CategorieList />
      {categorieModalState && <CategorieModal />}
    </>
  )
}
export default CategoriePage

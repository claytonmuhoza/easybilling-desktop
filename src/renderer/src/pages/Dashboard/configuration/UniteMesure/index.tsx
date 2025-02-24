import { useUniteMesureContext } from '@renderer/context/UniteMesureContext'
import UniteMesureList from './component/UniteMesureList'
import UniteMesureModal from './component/UniteMesureModal'

const UniteMesurePage = (): JSX.Element => {
  const { uniteMesureModalState } = useUniteMesureContext()

  return (
    <>
      <UniteMesureList />
      {uniteMesureModalState && <UniteMesureModal />}
    </>
  )
}

export default UniteMesurePage

import DashboardLayoutContent from '@renderer/layout/DashboardLayout'
import { Route, Routes } from 'react-router-dom'
import UniteMesurePage from './configuration/UniteMesure'
import CategoriePage from './configuration/Categorie'
const DashboardPage = (): JSX.Element => {
  return (
    <DashboardLayoutContent>
      <Routes>
        <Route path="/" element={<UniteMesurePage />} />
        <Route path="unite-mesure" element={<UniteMesurePage />} />
        <Route path="categorie" element={<CategoriePage />} />
        {/* <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<RecentActivity />} />
            <Route path="project/:id" element={<Project />} />
          </Route> */}
      </Routes>
    </DashboardLayoutContent>
  )
}
export default DashboardPage

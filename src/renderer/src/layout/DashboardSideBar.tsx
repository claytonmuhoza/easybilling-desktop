'use client'
import { useAuth } from '@renderer/context/AuthContext'
import { useSidebarContext } from '@renderer/context/SideBarContext'
import { Sidebar } from 'flowbite-react'
import type { FC } from 'react'
import { CiRuler } from 'react-icons/ci'
import {
  HiChartPie,
  HiClipboardList,
  HiDatabase,
  HiInbox,
  HiOfficeBuilding,
  HiOutlineViewList,
  HiPaperClip,
  HiUser,
  HiViewList
} from 'react-icons/hi'
import { IoSettings } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const DashboardSidebar: FC = function () {
  const { isCollapsed, setCollapsed } = useSidebarContext()
  const { logout } = useAuth()
  //   const router =

  const navigate = useNavigate()
  const to = (link: string): void => {
    navigate(link)
    setCollapsed(isCollapsed)
  }

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      // collapsed={isCollapsed}
      collapseBehavior={isCollapsed ? 'collapse' : undefined}
      id="sidebar"
      className={`fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 pb-14 duration-75 dark:border-gray-700 lg:flex
            ${isCollapsed ? 'collapse w-0 text-4' : ''}`}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item onClick={() => to('/')} icon={HiChartPie}>
            <span className="cursor-pointer">Dashboard</span>
          </Sidebar.Item>
          <Sidebar.Collapse
            // onClick={() => setCollapsed(!isCollapsed)}\
            className="cursor-pointer"
            icon={HiClipboardList}
            label="Facturation"
          >
            <div className="cursor-pointer">
              <Sidebar.Item
                // href="/facturation"
                onClick={() => to('/facturation')}
              >
                <span className="cursor-pointer">Facturation Normale</span>
              </Sidebar.Item>
              <Sidebar.Item
                // href="/facturation"
                onClick={() => to('/facturation/verification')}
              >
                <span className="cursor-pointer">verification</span>
              </Sidebar.Item>
              {/* <Sidebar.Item onClick={() => to('/facturation-annuler')}>
                        <span className="cursor-pointer">Facture annulée</span>
                     </Sidebar.Item> */}
            </div>
          </Sidebar.Collapse>
          <Sidebar.Item onClick={() => to('/clients')} icon={HiUser}>
            <span className="cursor-pointer">Clients</span>
          </Sidebar.Item>
          <Sidebar.Item onClick={() => to('/produits')} icon={HiPaperClip}>
            <span className="cursor-pointer">Produits</span>
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiInbox} label="Stock">
            <Sidebar.Item onClick={() => to('/entree')}>
              <span className="cursor-pointer">Entrées</span>
            </Sidebar.Item>
            <Sidebar.Item onClick={() => to('/sortie')}>
              <span className="cursor-pointer">Sorties</span>
            </Sidebar.Item>
            <Sidebar.Item onClick={() => to('/inventaire')}>
              <span className="cursor-pointer">Inventaire</span>
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiOutlineViewList} label="Rapports">
            <Sidebar.Item onClick={() => to('/rapport-stock')}>
              <span className="cursor-pointer">Rapports de stock</span>
            </Sidebar.Item>
            <Sidebar.Item onClick={() => to('/rapport-vente')}>
              <span className="cursor-pointer">Rapports de vente</span>
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item
            icon={HiUser}
            onClick={() => {
              logout()
            }}
          >
            <span className="cursor-pointer">Se deconnecter</span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse icon={IoSettings} label="Configurations">
            {/* <Sidebar.Item icon={CiBank} onClick={() => to('/banques')}>
              <span className="cursor-pointer">Banques</span>
            </Sidebar.Item> */}
            {/*<Sidebar.Item
                     icon={PiSignatureBold}
                     onClick={() => to('/signataires')}
                  >
                     <span className="cursor-pointer">Signataires</span>
                  </Sidebar.Item> */}
            <Sidebar.Item icon={HiDatabase} onClick={() => to('/categorie')}>
              <span className="cursor-pointer">Categories</span>
            </Sidebar.Item>
            <Sidebar.Item icon={CiRuler} onClick={() => to('/unite-mesure')}>
              <span className="cursor-pointer">Unites Mesure</span>
            </Sidebar.Item>
            <Sidebar.Item icon={HiViewList} onClick={() => to('/log_obr')}>
              <span className="cursor-pointer">OBR Log</span>s
            </Sidebar.Item>
            {/* <Sidebar.Item
                     icon={HiLockClosed}
                     onClick={() => to('/change-password')}
                  >
                     <span className="cursor-pointer">
                        Modifier mot de passe
                     </span>
                     
                  </Sidebar.Item> */}
            <Sidebar.Item icon={HiOfficeBuilding} onClick={() => to('/info-contribuable')}>
              <span className="cursor-pointer">Info Contribuable</span>
            </Sidebar.Item>
          </Sidebar.Collapse>
          {/* <Sidebar.Item  icon={HiUser}>
                  Profile
               </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

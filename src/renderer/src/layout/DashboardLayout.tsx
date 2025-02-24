import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { useSidebarContext } from '@renderer/context/SideBarContext'
import { DashboardNavbar } from './DashboardNavBar'
import { DashboardSidebar } from './DashboardSideBar'

const DashboardLayoutContent: FC<PropsWithChildren> = function ({ children }) {
  const { isCollapsed } = useSidebarContext()

  return (
    <>
      <DashboardNavbar />
      <div className="mt-16 flex items-start">
        <DashboardSidebar />
        <div
          id="main-content"
          className={twMerge(
            'relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900',
            isCollapsed ? 'lg:ml-[4.5rem]' : 'lg:ml-64'
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
export default DashboardLayoutContent

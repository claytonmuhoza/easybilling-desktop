import { useEffect, useState } from 'react'
import { Flowbite } from 'flowbite-react'
import './App.css'
import { flowbiteTheme } from './theme'
import ChooseLink from './pages/Auth/ChooseLink'
import AuthLoading from './pages/Auth/AuthLoading'
import CreateContribuable from './pages/Auth/CreateContribuable'
import { LienAPIService } from './services/LienApiService'
import { useAuth } from './context/AuthContext'
import DashboardLayoutContent from './layout/DashboardLayout'

function App(): JSX.Element {
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const [lienAPICount, setLienAPICount] = useState(0)

  useEffect(() => {
    const fetchLienApiCount = async (): Promise<void> => {
      try {
        const count = await LienAPIService.count()
        setLienAPICount(count)
      } catch (error) {
        console.error('Erreur lors de la récupération du lien API:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLienApiCount()
  }, [isAuthenticated])

  return (
    <Flowbite theme={{ theme: flowbiteTheme }}>
      <div className="min-h-screen dark:bg-gray-800 bg-white dark:text-white text-black">
        {loading ? (
          <AuthLoading />
        ) : lienAPICount === 0 ? (
          <ChooseLink setCount={setLienAPICount} />
        ) : isAuthenticated ? (
          <DashboardLayoutContent>
            <div>Hello clayton muhoza</div>
          </DashboardLayoutContent>
        ) : (
          <CreateContribuable />
        )}
      </div>
    </Flowbite>
  )
}

export default App

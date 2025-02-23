import { useEffect, useState } from 'react'
import { Flowbite } from 'flowbite-react'
import './App.css'
import { flowbiteTheme } from './theme'
import ChooseLink from './pages/Auth/ChooseLink'
import AuthLoading from './pages/Auth/AuthLoading'
import CreateContribuable from './pages/Auth/CreateContribuable'
import { LienAPIService } from './services/LienApiService'
import { useAuth } from './context/AuthContext'

function App(): JSX.Element {
  const { isAuthenticated, logout, session } = useAuth()
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
          <div className="flex flex-col items-center justify-center">
            <p>Authentifié Bienvenue {session?.user.nom}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => logout()}
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <CreateContribuable />
        )}
      </div>
    </Flowbite>
  )
}

export default App

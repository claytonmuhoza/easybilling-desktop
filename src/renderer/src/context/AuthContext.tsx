import { User } from '@renderer/services/User'
import userService, { userResponse } from '@renderer/services/UserServices'
import React, { createContext, useState, useEffect, useContext } from 'react'

interface LocalSession {
  user: User
  loginDate: number // Timestamp en millisecondes
  expiresAt: number // Timestamp en millisecondes (par exemple, loginDate + 2 mois)
}

interface AuthContextType {
  session: LocalSession | null
  isAuthenticated: boolean
  login: ({ username, password }: { username: string; password: string }) => Promise<userResponse>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthenticated: false,
  login: async () => ({ success: false, msg: '', user: null }),
  logout: () => {}
})

const TWO_MONTHS_MS = 2 * 30 * 24 * 60 * 60 * 1000 // Approximativement 2 mois

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<LocalSession | null>(null)

  // Au démarrage, on récupère la session stockée dans le localStorage
  useEffect(() => {
    const stored = localStorage.getItem('authSession')
    if (stored) {
      const parsed: LocalSession = JSON.parse(stored)
      // Si la session n'est pas expirée, on la charge
      if (parsed.expiresAt > Date.now()) {
        setSession(parsed)
      } else {
        localStorage.removeItem('authSession')
      }
    }
  }, [])

  /**
   * Méthode de login.
   * Remplacez la logique de validation par un appel à votre service d'authentification réel.
   */
  const login = async ({
    username,
    password
  }: {
    username: string
    password: string
  }): Promise<userResponse> => {
    const responseLogin = await userService.authenticateUser({ username, password })
    if (responseLogin.success && responseLogin.user !== null) {
      const now = Date.now()
      const newSession: LocalSession = {
        user: responseLogin.user,
        loginDate: now,
        expiresAt: now + TWO_MONTHS_MS
      }
      localStorage.setItem('authSession', JSON.stringify(newSession))
      setSession(newSession)
      return responseLogin
    }
    return responseLogin
  }

  const logout = (): void => {
    localStorage.removeItem('authSession')
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, isAuthenticated: !!session, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => useContext(AuthContext)

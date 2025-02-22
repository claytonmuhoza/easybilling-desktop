import type { User } from '@renderer/services/User'

export const userService = {
  createUser: async (userData: User): Promise<boolean> => {
    try {
      return await window.api.userCreate(userData)
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur", error)
      return false
    }
  },

  getUser: async (username: string): Promise<User | null> => {
    try {
      return await window.api.userGet(username)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur", error)
      return null
    }
  },

  updateUser: async (userData: User): Promise<boolean> => {
    try {
      return await window.api.userUpdate(userData)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", error)
      return false
    }
  },

  deleteUser: async (username: string): Promise<boolean> => {
    try {
      return await window.api.userDelete(username)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error)
      return false
    }
  },

  authenticateUser: async (username: string, password: string): Promise<User | null> => {
    try {
      return await window.api.userAuthenticate(username, password)
    } catch (error) {
      console.error("Erreur lors de l'authentification de l'utilisateur", error)
      return null
    }
  }
}

export default userService

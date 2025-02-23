import { NewUserSchema } from '@renderer/schemas'
import type { User } from '@renderer/services/User'
import { z } from 'zod'
type userSchema = z.infer<typeof NewUserSchema>
export interface userResponse {
  success: boolean
  msg: string
  user: User | null
}
export const userService = {
  createUser: async (userData: User): Promise<boolean> => {
    try {
      return await window.api.userCreate(userData)
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur", error)
      return false
    }
  },
  userSchemaToUser: (userSchema: userSchema): User => {
    return {
      nom: userSchema.name,
      prenom: userSchema.name,
      username: userSchema.email,
      password: userSchema.password,
      entreprise_id: userSchema.societe_id
    }
  },
  countUsers: async (): Promise<number> => {
    try {
      return await window.api.userCount()
    } catch (error) {
      console.error('Erreur lors du comptage des utilisateurs', error)
      return 0
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

  authenticateUser: async ({
    username,
    password
  }: {
    username: string
    password: string
  }): Promise<userResponse> => {
    try {
      const user = await window.api.userAuthenticate(username, password)
      if (!user) {
        return { success: false, msg: "Mot de passe ou nom d'utilisateur incorrect", user: null }
      }
      return { success: true, msg: 'Authentification réussie', user }
    } catch (error) {
      console.error("Erreur lors de l'authentification de l'utilisateur", error)
      return { success: false, msg: 'Authentification échouée', user: null }
    }
  }
}

export default userService

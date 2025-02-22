import type { Entreprise } from '@renderer/services/Entreprise'
import type { apiLoginResponseType } from '@renderer/services/ApiObr'

export const entrepriseService = {
  /**
   * Insère une entreprise dans la base de données via IPC
   * @param entrepriseData Les données de l'entreprise
   * @returns Promise résolvant à true en cas de succès, false sinon
   */
  insertEntreprise: async (entrepriseData: Entreprise): Promise<boolean> => {
    try {
      return await window.api.entrepriseInsert(entrepriseData)
    } catch (error) {
      console.error("Erreur lors de l'insertion de l'entreprise", error)
      return false
    }
  },

  /**
   * Récupère un token d'authentification via l'API OBR
   * @param id_systeme L'identifiant système
   * @param password_systeme Le mot de passe système
   * @returns Promise résolvant à l'objet de réponse contenant le token
   */
  getToken: async (id_systeme: string, password_systeme: string): Promise<apiLoginResponseType> => {
    try {
      return await window.api.entrepriseIsContribuable(id_systeme, password_systeme)
    } catch (error) {
      console.error('Erreur lors de la récupération du token', error)
      return { success: false, msg: 'Erreur lors de la récupération du token' }
    }
  },

  /**
   * Récupère les informations d'une entreprise à partir de son NIF
   * @param nif Le NIF de l'entreprise
   * @returns Promise résolvant à l'objet Entreprise ou null en cas d'erreur
   */
  getEntrepriseByNIF: async (nif: string): Promise<Entreprise | null> => {
    try {
      return await window.api.entrepriseGetByNIF(nif)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'entreprise par NIF", error)
      return null
    }
  },
  isContribuable: async (
    id_systeme: string,
    password_systeme: string
  ): Promise<apiLoginResponseType> => {
    return await window.api.entrepriseIsContribuable(id_systeme, password_systeme)
  }
}

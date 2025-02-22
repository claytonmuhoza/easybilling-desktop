import type { Taxe, ValeurTaxe } from '@renderer/services/Taxe'

export const taxeService = {
  /**
   * Récupère la liste de toutes les taxes.
   * @returns Promise résolvant à un tableau de Taxe
   */
  getAllTaxes: async (): Promise<Taxe[]> => {
    try {
      const taxes = await window.api.taxesAll()
      return taxes
    } catch (error) {
      console.error('Erreur lors de la récupération des taxes', error)
      return []
    }
  },

  /**
   * Récupère les valeurs associées à une taxe donnée.
   * @param id - L'ID de la taxe
   * @returns Promise résolvant à un tableau de ValeurTaxe
   */
  getTaxeValues: async (id: number): Promise<ValeurTaxe[]> => {
    try {
      const values = await window.api.taxesValeurs(id)
      return values
    } catch (error) {
      console.error('Erreur lors de la récupération des valeurs de taxe', error)
      return []
    }
  },

  /**
   * Insère une nouvelle taxe dans la base de données.
   * @param taxeData - Les données de la taxe à insérer
   * @returns Promise résolvant à true en cas de succès, false sinon
   */
  insertTaxe: async (taxeData: Taxe): Promise<boolean> => {
    try {
      return await window.api.taxesInsert(taxeData)
    } catch (error) {
      console.error("Erreur lors de l'insertion de la taxe", error)
      return false
    }
  },

  /**
   * Supprime une taxe à partir de son nom.
   * @param nom - Le nom de la taxe à supprimer
   * @returns Promise résolvant à true en cas de succès, false sinon
   */
  deleteTaxe: async (nom: string): Promise<boolean> => {
    try {
      return await window.api.taxesDelete(nom)
    } catch (error) {
      console.error('Erreur lors de la suppression de la taxe', error)
      return false
    }
  }
}

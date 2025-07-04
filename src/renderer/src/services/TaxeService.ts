import { TaxeAssujettie } from './Taxe'
import { Taxe, ValeurTaxe } from '@renderer/services/Taxe'

export const taxeService = {
  getAllTaxeForEntreprise: async (entreprise_id: number): Promise<Taxe[]> => {
    try {
      const taxesAssujetti: TaxeAssujettie[] = await window.api.entrepriseGetAllTaxes(entreprise_id)
      const taxes = await Promise.all(
        taxesAssujetti.map(async (TaxeAssujettie: TaxeAssujettie) => {
          const values: number[] = (await window.api.taxesValeurs(TaxeAssujettie.taxe.id || 0)).map(
            (v) => v.valeur
          )
          return new Taxe({
            id: TaxeAssujettie.taxe.id,
            nom: TaxeAssujettie.taxe.nom,
            type: TaxeAssujettie.taxe.type,
            valeurType: TaxeAssujettie.taxe.valeurType,
            valeurFixe: TaxeAssujettie.valeur,
            valeurs: values || []
          })
        })
      )
      return taxes
    } catch (error) {
      throw "Une erreur s'est produit: " + error
    }
  },
  /**
   * Récupère la liste de toutes les taxes.
   * @returns Promise résolvant à un tableau de Taxe
   */
  getAllTaxes: async (): Promise<Taxe[]> => {
    try {
      const taxesRaw = await window.api.taxesAll()
      const taxes: Taxe[] = await Promise.all(
        taxesRaw.map(async (taxe: Taxe) => {
          const values: number[] = (await window.api.taxesValeurs(taxe.id || 0)).map(
            (v) => v.valeur
          )
          return new Taxe({
            id: taxe.id,
            nom: taxe.nom,
            type: taxe.type,
            valeurType: taxe.valeurType,
            valeurFixe: taxe.valeurFixe,
            valeurs: values || []
          })
        })
      )
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
